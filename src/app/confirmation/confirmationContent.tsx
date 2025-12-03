"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import Image from "next/image";
import { useState } from "react";

// Define the order item type
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Define the order type
type Order = {
  _id: string;
  _creationTime: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  orderNumber: string;
  status: string;
  createdAt: number;
};

export default function ConfirmationPage() {
  
   const searchParams = useSearchParams(); 
  const router = useRouter();
  const [showAllItems, setShowAllItems] = useState(false);

  const isClient = typeof window !== "undefined";
  const orderNumber = searchParams.get("order");

  // ALWAYS call hooks in the same order
  const order = useQuery(
    api.orders.getOrderByNumber,
    isClient && orderNumber ? { orderNumber } : "skip"
  ) as Order | null | undefined;

  // SAFE client-side early return
  if (!isClient) {
    return <div className="min-h-screen bg-[#F1F1F1]"></div>; 
  }

  if (!orderNumber) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white px-8 py-3 font-bold uppercase tracking-wider transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (order === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
  );
  }


  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white px-8 py-3 font-bold uppercase tracking-wider transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1F1F1] flex items-center justify-center p-6">
      <div className="max-w-[540px] w-full bg-white rounded-lg p-8 md:p-12">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-[24px] md:text-[32px] font-bold uppercase tracking-[1px] leading-[1.1] mb-4">
          Thank you<br />for your order
        </h1>

        <p className="text-black/50 text-[15px] leading-[25px] mb-8">
          You will receive an email confirmation shortly.
        </p>

        {/* Order Summary Box */}
        <div className="rounded-lg overflow-hidden mb-8">
          {/* Items Section */}
          <div className="bg-[#F1F1F1] p-6">
            {/* First Item */}
            <div className="flex items-center gap-4 pb-3">
              <div className="w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0">
                <Image
                  src={order.items[0].image}
                  alt={order.items[0].name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px] truncate">{order.items[0].name}</p>
                <p className="text-black/50 text-sm font-bold">
                  $ {order.items[0].price.toLocaleString()}
                </p>
              </div>
              <p className="text-black/50 font-bold text-[15px]">x{order.items[0].quantity}</p>
            </div>

            {/* Show More/Less Toggle */}
            {order.items.length > 1 && (
              <>
                {showAllItems && (
                  <div className="space-y-3 pt-3 border-t border-black/10">
                    {order.items.slice(1).map((item: OrderItem) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[15px] truncate">{item.name}</p>
                          <p className="text-black/50 text-sm font-bold">
                            $ {item.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-black/50 font-bold text-[15px]">x{item.quantity}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="w-full text-center text-black/50 text-xs font-bold pt-3 border-t border-black/10 mt-3 hover:text-[#D87D4A] transition"
                >
                  {showAllItems
                    ? "View less"
                    : `and ${order.items.length - 1} other item(s)`}
                </button>
              </>
            )}
          </div>

          {/* Grand Total Section */}
          <div className="bg-black text-white p-6">
            <p className="text-white/50 text-[15px] uppercase mb-2">Grand Total</p>
            <p className="text-lg font-bold">$ {order.grandTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white py-4 rounded font-bold uppercase text-[13px] tracking-wider transition"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}