import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, footer }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-opacity duration-300 ease-in-out ${
          isAnimating ? 'opacity-70' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[55vw] lg:w-[55vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-1 py-0.25 border-b">
            <h2 className="text-3xl  text-black-base">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-2 h-2" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-1">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-1 border-t bg-gray-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;
