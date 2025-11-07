import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    shippingAddress: v.string(),
    shippingCity: v.string(),
    shippingZip: v.string(),
    shippingCountry: v.string(),
    paymentMethod: v.string(),
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    orderNumber: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["customerEmail"])
    .index("by_order_number", ["orderNumber"]),
});