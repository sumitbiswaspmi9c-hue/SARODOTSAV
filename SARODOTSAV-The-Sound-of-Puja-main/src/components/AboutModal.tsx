import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300 pointer-events-auto">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#120809] border border-sharodotsav-border p-8 md:p-10 shadow-2xl text-left z-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-sharodotsav-cream/60 hover:text-sharodotsav-gold transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-bengali text-xs tracking-[0.25em] text-sharodotsav-gold block mb-1">
            শুভ শারদোৎসব
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl text-sharodotsav-cream tracking-wide">
            SHARODOTSAV 
          </h3>
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-sharodotsav-cream/50 mt-1">
            The Sound of Puja
          </p>
        </div>

        <div className="space-y-4 text-xs md:text-sm font-sans font-light text-sharodotsav-cream/80 leading-relaxed">
          <p>
            Sharodotsav is an ambient sonic celebration of Durga Puja — capturing the timeless transition from misty autumn mornings into the rhythmic fervor of midnight pandals.
          </p>
          <p>
             Crafted with elegant simplicity, expressive typography, and immersive storytelling, this experience captures Bengal's grandest celebration,where music, culture, and timeless memories come together to welcome Maa Durga.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-sharodotsav-border/40 flex items-center justify-between text-[11px] font-sans text-sharodotsav-cream/40">
          <span className="tracking-widest uppercase">Autumn Edition</span>
          <span className="text-sharodotsav-gold/80 tracking-widest font-serif">Maa Aashchen</span>
        </div>
      </div>
    </div>
  );
};
