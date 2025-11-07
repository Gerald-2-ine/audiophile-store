import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  email: string;
  orderNumber: string;
  customerName: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  grandTotal: number;
}

export async function POST(req: NextRequest) {
  try {
    const { email, orderNumber, customerName, items, grandTotal }: EmailRequest = await req.json();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D87D4A; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
            .order-item { display: flex; align-items: center; padding: 15px; background: white; margin: 10px 0; border-radius: 8px; }
            .order-item img { width: 64px; height: 64px; border-radius: 4px; margin-right: 15px; }
            .total { font-size: 24px; font-weight: bold; color: #D87D4A; margin-top: 20px; text-align: center; }
            .button { display: inline-block; padding: 15px 30px; background: #D87D4A; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Order Confirmed!</h1>
            </div>
            <div class="content">
              <h2>Thank you, ${customerName}!</h2>
              <p>Your order <strong>${orderNumber}</strong> has been confirmed and will be shipped soon.</p>
              
              <h3>Order Summary:</h3>
              ${items.map((item) => `
                <div class="order-item">
                  <div style="flex: 1;">
                    <strong>${item.name}</strong><br>
                    <span style="color: #666;">Quantity: ${item.quantity} × ${item.price.toLocaleString()}</span>
                  </div>
                </div>
              `).join('')}
              
              <div class="total">
                Grand Total: ${grandTotal.toLocaleString()}
              </div>
              
              <p style="margin-top: 30px;">We'll send you a shipping confirmation email as soon as your items ship.</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirmation?order=${orderNumber}" class="button">
                  View Your Order
                </a>
              </div>
              
              <div class="footer">
                <p>Questions? Contact us at <a href="mailto:support@audiophile.com">support@audiophile.com</a></p>
                <p>&copy; 2024 Audiophile. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}