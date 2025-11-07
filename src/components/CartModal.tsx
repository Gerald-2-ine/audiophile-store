"use client";

import { useCart } from "../contexts/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, clearCart, totalItems, grandTotal } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div 
        className="fixed top-32 right-6 md:right-10 lg:right-40 bg-white rounded-lg p-8 max-w-md w-full z-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold tracking-wider">CART ({totalItems})</h2>
          <button 
            onClick={clearCart}
            className="text-black/50 hover:text-[#D87D4A] underline text-[15px] font-medium transition"
          >
            Remove all
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-black/50 text-center py-12 text-[15px]">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={typeof item.image === 'string' ? item.image : item.image?.mobile || ''}
                      alt={item.name} 
                      width={64}
                      height={64}
                      className="w-full h-full object-cover" 
                    />
                   
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[15px] truncate">{item.name}</p>
                    <p className="text-black/50 text-sm font-bold">$ {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center bg-[#F1F1F1] h-10">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 h-full hover:text-[#D87D4A] text-black/25 font-bold transition"
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-[13px]">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 h-full hover:text-[#D87D4A] text-black/25 font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-black/50 text-[15px] font-medium uppercase">Total</span>
              <span className="font-bold text-lg">$ {grandTotal.toLocaleString()}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] text-white py-4 font-bold uppercase text-[13px] tracking-wider transition"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}