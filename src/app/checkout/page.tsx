"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";



export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, vat, grandTotal, clearCart } = useCart();
  const createOrder = useMutation(api.orders.createOrder);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "e-money",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Wrong format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Wrong format";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP is required";
    } else if (!/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = "Wrong format";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (formData.paymentMethod === "e-money") {
      if (!formData.eMoneyNumber.trim()) {
        newErrors.eMoneyNumber = "Required";
      } else if (!/^\d{9}$/.test(formData.eMoneyNumber)) {
        newErrors.eMoneyNumber = "Wrong format";
      }
      if (!formData.eMoneyPin.trim()) {
        newErrors.eMoneyPin = "Required";
      } else if (!/^\d{4}$/.test(formData.eMoneyPin)) {
        newErrors.eMoneyPin = "Wrong format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Checkout submitted");
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // —— Normalize items so `image` is ALWAYS a string —— //
      type FormattedOrderItem = {
        id: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
      };

      const formattedItems: FormattedOrderItem[] = items.map((item) => {
        // if item.image is a string use it,
        // otherwise pick mobile/tablet/desktop or fallback placeholder.
        const img =
          typeof item.image === "string"
            ? item.image
            : (item.image && item.image.mobile) ||
              (item.image && item.image.tablet) ||
              (item.image && item.image.desktop) ||
              "/assets/shared/placeholder.png";

        return {
          id: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: img,
        };
      });

      // —— Build orderData with the exact shape expected by Convex —— //
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingZip: formData.zip,
        shippingCountry: formData.country,
        paymentMethod: formData.paymentMethod,
        items: formattedItems,
        subtotal,
        shipping,
        vat,
        grandTotal,
      };

      // Now this should type-check (items[].image is string)
      const result = await createOrder(orderData);

      // send confirmation email (serverless endpoint)
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          orderNumber: result.orderNumber,
          customerName: formData.name,
          items: formattedItems,
          grandTotal,
        }),
      });

      clearCart();
      router.push(`/confirmation?order=${result.orderNumber}`);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleSubmitOrder() {
    // I want It to show  order successful message at the  top of the screen like a banner alert message
    // Then take me to the ordered items details with the tracking ID
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <main className="min-h-screen bg-[#F1F1F1]">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 py-8 md:py-16">
        <button
          onClick={() => router.back()}
          className="text-black/50 hover:text-[#D87D4A] mb-6 text-[15px] font-medium transition"
        >
          Go Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-lg p-6 md:p-12"
          >
            <h1 className="text-[28px] md:text-[32px] font-bold uppercase tracking-[1px] mb-8 md:mb-10">
              Checkout
            </h1>

            {/* Billing Details */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[#D87D4A] text-[13px] font-bold mb-4 tracking-wider uppercase">
                Billing Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex justify-between text-xs font-bold mb-2">
                    <span>Name</span>
                    {errors.name && (
                      <span className="text-[#CD2C2C]">{errors.name}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                      errors.name ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }`}
                    placeholder="Alexei Ward"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-xs font-bold mb-2">
                    <span>Email Address</span>
                    {errors.email && (
                      <span className="text-[#CD2C2C]">{errors.email}</span>
                    )}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                      errors.email ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }`}
                    placeholder="alexei@mail.com"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-xs font-bold mb-2">
                    <span>Phone Number</span>
                    {errors.phone && (
                      <span className="text-[#CD2C2C]">{errors.phone}</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                      errors.phone ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }`}
                    placeholder="+1 202-555-0136"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-[#D87D4A] text-[13px] font-bold mb-4 tracking-wider uppercase">
                Shipping Info
              </h2>
              <div className="grid gap-6">
                <div>
                  <label className="flex justify-between text-xs font-bold mb-2">
                    <span>Address</span>
                    {errors.address && (
                      <span className="text-[#CD2C2C]">{errors.address}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                      errors.address ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }`}
                    placeholder="1137 Williams Avenue"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex justify-between text-xs font-bold mb-2">
                      <span>ZIP Code</span>
                      {errors.zip && (
                        <span className="text-[#CD2C2C]">{errors.zip}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                        errors.zip ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                      }`}
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label className="flex justify-between text-xs font-bold mb-2">
                      <span>City</span>
                      {errors.city && (
                        <span className="text-[#CD2C2C]">{errors.city}</span>
                      )}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                        errors.city ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                      }`}
                      placeholder="New York"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-xs font-bold mb-2">
                    <span>Country</span>
                    {errors.country && (
                      <span className="text-[#CD2C2C]">{errors.country}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                      errors.country ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }`}
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-[#D87D4A] text-[13px] font-bold mb-4 tracking-wider uppercase">
                Payment Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="text-xs font-bold mb-4 block">
                    Payment Method
                  </label>
                </div>
                <div className="space-y-4">
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === "e-money" ? "border-[#D87D4A]" : "border-[#CFCFCF]"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="e-money"
                      checked={formData.paymentMethod === "e-money"}
                      onChange={handleChange}
                      className="mr-4 accent-[#D87D4A]"
                    />
                    <span className="text-[14px] font-bold">e-Money</span>
                  </label>
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === "cash" ? "border-[#D87D4A]" : "border-[#CFCFCF]"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                      className="mr-4 accent-[#D87D4A]"
                    />
                    <span className="text-[14px] font-bold">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "e-money" && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="flex justify-between text-xs font-bold mb-2">
                      <span>e-Money Number</span>
                      {errors.eMoneyNumber && (
                        <span className="text-[#CD2C2C]">
                          {errors.eMoneyNumber}
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      name="eMoneyNumber"
                      value={formData.eMoneyNumber}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                        errors.eMoneyNumber
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF]"
                      }`}
                      placeholder="238521993"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-xs font-bold mb-2">
                      <span>e-Money PIN</span>
                      {errors.eMoneyPin && (
                        <span className="text-[#CD2C2C]">
                          {errors.eMoneyPin}
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      name="eMoneyPin"
                      value={formData.eMoneyPin}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 border rounded-lg text-[14px] font-bold focus:outline-none focus:border-[#D87D4A] ${
                        errors.eMoneyPin
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF]"
                      }`}
                      placeholder="6891"
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === "cash" && (
                <div className="flex gap-8 mt-8">
                  <Image
                    src="/assets/home/desktop/cash.svg"
                    alt="Cash"
                    width={48}
                    height={48}
                  />
                  <p className="text-black/50 text-[15px] leading-[25px]">
                    The (Cash on Delivery) option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 md:p-8 h-fit">
            <h2 className="text-lg font-bold mb-8 uppercase tracking-wider">
              Summary
            </h2>

            <div className="space-y-6 mb-8">
              { items.map((item) => {
                // ✅ Ensure image is always a valid string
                const imageSrc =
                  typeof item.image === "string"
                    ? item.image || "/assets/shared/placeholder.png"
                    : item.image?.mobile ||
                      item.image?.tablet ||
                      item.image?.desktop ||
                      "/assets/shared/placeholder.png";

                return (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* ✅ Image Wrapper */}
                    <div className="w-16 h-16 bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>

                    {/* ✅ Item info */}
                    <div className="flex-1">
                      <p className="font-bold text-[15px]">{item.name}</p>
                      <p className="text-black/50 text-sm font-bold">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* ✅ Quantity */}
                    <p className="text-black/50 font-bold text-[15px]">
                      x{item.quantity}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-black/50 text-[15px] uppercase">
                  Total
                </span>
                <span className="font-bold text-lg">
                  $ {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 text-[15px] uppercase">
                  Shipping
                </span>
                <span className="font-bold text-lg">$ {shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 text-[15px] uppercase">
                  VAT (Included)
                </span>
                <span className="font-bold text-lg">
                  $ {Math.round(vat).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-black/50 text-[15px] uppercase">
                  Grand Total
                </span>
                <span className="font-bold text-[#D87D4A] text-lg">
                  $ {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmitOrder}
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white py-4 rounded font-bold uppercase text-[13px] tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Processing..." : "Continue & Pay"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
