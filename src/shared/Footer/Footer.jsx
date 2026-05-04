import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      {/* Desktop footer */}
      <div className="hidden md:block">
        <div className="max-w-[980px] mx-auto px-4 py-6 text-center">
          {/* Copyright */}
          <p className="text-xs text-gray-500 mb-3">
            Copyright&copy; 2026 Interval International. All rights reserved.
          </p>
          {/* Footer links */}
          <div className="flex justify-center flex-wrap gap-x-1 text-xs text-gray-600">
            <a href="#" className="hover:underline">About Interval</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Privacy and Cookie Policies</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Cookie Settings</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Do Not Sell/Share</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Legal Information</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Accessibility</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Customer Support</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">FAQs</a>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="md:hidden text-center py-4 px-4">
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-gray-600 mb-2">
          <a href="#" className="hover:underline">About Us</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Privacy &amp; Cookie Policies</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Cookie Settings</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Do Not Sell/Share</a>
          <span className="text-gray-400">|</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-gray-600 mb-3">
          <a href="#" className="hover:underline">Legal</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Accessibility</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:underline">Support</a>
        </div>
        <p className="text-xs text-gray-500">
          Copyright&copy; 2026 Interval International. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
