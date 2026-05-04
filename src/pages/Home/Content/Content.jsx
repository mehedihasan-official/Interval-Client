import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// ── Desktop Content (hidden on mobile) ──
const DesktopContent = () => (
  <div className="hidden md:block">
    {/* Important Member Information */}
    <div className="max-w-[980px] mx-auto px-4 py-8">
      <h2 className="text-[#1a6fa8] text-2xl font-semibold mb-2">Important Member Information</h2>
      <p className="text-sm text-gray-700 leading-relaxed max-w-[900px]">
        The safety and well-being of our members is our top priority. Please refer to our{' '}
        <a href="#" className="text-[#1a6fa8] underline font-bold">Travel Advisories</a>{' '}
        page for information regarding resort closures. The page is updated frequently, so please review it before proceeding with your travel plans.
      </p>
    </div>

    {/* 4-tile banner section */}
    <div className="max-w-[980px] mx-auto px-4 pb-10">
      <div className="grid grid-cols-4 gap-3">
        {/* Vacation Ownership */}
        <a href="#" className="relative group overflow-hidden border border-gray-100 shadow-sm">
          <img
            src="https://www.intervalworld.com/iimedia/images/prelogin/VacOwnership_303x192.jpg"
            alt="Vacation Ownership"
            className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 flex items-start p-3">
            <span className="text-white font-bold text-lg drop-shadow-md">Vacation<br/>Ownership</span>
          </div>
        </a>

        {/* Exchange */}
        <a href="#" className="relative group overflow-hidden border border-gray-100 shadow-sm">
          <img
            src="https://www.intervalworld.com/iimedia/images/prelogin/Exchange_303x192.jpg"
            alt="Exchange"
            className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 flex items-start p-3">
            <span className="text-white font-bold text-lg drop-shadow-md">Exchange</span>
          </div>
        </a>

        {/* Getaways */}
        <a href="#" className="relative group overflow-hidden border border-gray-100 shadow-sm">
          <img
            src="https://www.intervalworld.com/iimedia/images/prelogin/Getaways_303x192.jpg"
            alt="Getaways"
            className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 flex items-start p-3">
            <span className="text-white font-bold text-lg drop-shadow-md">Getaways</span>
          </div>
        </a>

        {/* 50 Years */}
        <a href="#" className="relative group overflow-hidden bg-[#0d2b55] border border-gray-100 shadow-sm">
          <img
            src="https://www.intervalworld.com/iimedia/images/prelogin/50yr_303x192.jpg"
            alt="50 Years"
            className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>
    </div>

    {/* Resort Directory + IntervalHD row */}
    <div className="max-w-[980px] mx-auto px-4 pb-8">
      <div className="flex gap-3">
        {/* Resort Directory */}
        <div className="flex-1 bg-[#f8f9fa] border border-gray-200 p-6 flex gap-8 rounded-sm">
          <div className="w-[180px] flex-shrink-0">
            <h3 className="text-[#1a6fa8] font-bold text-xl leading-tight">
              Interval's<br />Resort<br />Directory
            </h3>
            <a href="#" className="text-xs text-black font-bold mt-2 block hover:underline">Download Interval App</a>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-x-4 gap-y-2 text-[11px] text-gray-700">
            <a href="#" className="hover:text-[#1a6fa8]">Aruba</a>
            <a href="#" className="hover:text-[#1a6fa8]">Cancun, Mexico</a>
            <a href="#" className="hover:text-[#1a6fa8]">St. Maarten</a>
            <a href="#" className="hover:text-[#1a6fa8]">Puerto Vallarta, Mexico</a>
            <a href="#" className="hover:text-[#1a6fa8]">Orlando, Florida</a>
            <a href="#" className="hover:text-[#1a6fa8]">Williamsburg, Virginia</a>
            <a href="#" className="hover:text-[#1a6fa8]">Poconos, Pennsylvania</a>
            <a href="#" className="hover:text-[#1a6fa8]">Las Vegas, Nevada</a>
            <a href="#" className="hover:text-[#1a6fa8]">Palm Springs, California</a>
            <a href="#" className="hover:text-[#1a6fa8]">Phoenix, Arizona</a>
            <a href="#" className="hover:text-[#1a6fa8]">Hawaiian Islands</a>
            <a href="#" className="hover:text-[#1a6fa8]">Costa del Sol, Spain</a>
            <a href="#" className="hover:text-[#1a6fa8]">Paris, France</a>
            <a href="#" className="hover:text-[#1a6fa8]">Australia</a>
            <a href="#" className="hover:text-[#1a6fa8]">Asia</a>
            <a href="#" className="text-[#1a6fa8] font-bold hover:underline">View All</a>
          </div>
        </div>

        {/* Interval HD */}
        <div className="w-[200px] border border-gray-200 flex flex-col items-center justify-between p-4 text-center rounded-sm">
          <div className="flex flex-col items-center">
            <img src="https://www.intervalworld.com/iimedia/images/prelogin/intervalHD_logo.png" alt="Interval HD" className="h-8 mb-2" />
            <p className="text-[11px] text-gray-700 font-medium">Now with helpful videos.</p>
          </div>
          <a
            href="#"
            className="w-full bg-[#18294B] text-white text-[10px] font-bold py-2 rounded-sm flex items-center justify-center gap-1 hover:bg-[#2c3e50] transition uppercase tracking-wider"
          >
            Learn more. <span className="text-orange-400 text-lg leading-none">&#9654;</span>
          </a>
        </div>
      </div>
    </div>

    {/* Social icons */}
    <div className="max-w-[980px] mx-auto px-4 py-6 flex justify-center gap-6 border-t border-gray-200">
      <a href="#" className="bg-[#18294B] p-2 rounded-full text-white hover:scale-110 transition"><FaFacebook className="text-xl" /></a>
      <a href="#" className="bg-[#f09433] p-2 rounded-full text-white hover:scale-110 transition bg-gradient-to-tr from-[#f09433] via-[#e1306c] to-[#bc1888]"><FaInstagram className="text-xl" /></a>
      <a href="#" className="bg-[#ff0000] p-2 rounded-full text-white hover:scale-110 transition"><FaYoutube className="text-xl" /></a>
      <a href="#" className="bg-[#bd081c] p-2 rounded-full text-white hover:scale-110 transition"><FaPinterest className="text-xl" /></a>
    </div>

    {/* Bottom Ad Banner (matching screenshot) */}
    <div className="max-w-[980px] mx-auto px-4 py-8">
      <div className="flex border border-gray-200 rounded-sm overflow-hidden shadow-sm h-[120px]">
        {/* Chat section */}
        <div className="flex-1 flex items-center px-6 bg-white border-r border-gray-100">
          <img src="https://img.icons8.com/color/48/000000/headset.png" alt="" className="h-10 mr-4" />
          <div className="flex-grow">
            <h4 className="text-[#1a6fa8] font-bold text-lg">Chat w/ Online Experts 24/7</h4>
          </div>
          <button className="bg-[#333] text-white px-8 py-2 rounded-full font-bold text-sm hover:bg-black transition">Open</button>
        </div>
        {/* App section */}
        <div className="w-[300px] bg-[#0d2b55] flex items-center px-6 relative">
          <div className="flex-grow text-white">
            <h4 className="font-bold text-sm leading-tight">Take your benefits with you.</h4>
            <p className="text-[10px] opacity-80 mt-1">Discover our App</p>
          </div>
          <img src="https://www.intervalworld.com/iimedia/images/prelogin/iphone-hand.png" alt="" className="h-[140px] absolute -right-2 bottom-0 object-contain" />
        </div>
      </div>
    </div>

    {/* Footer Link text */}
    <div className="max-w-[980px] mx-auto px-4 py-6 border-t border-gray-100 text-[10px] text-gray-500 flex flex-wrap justify-between gap-4">
      <p>Copyright © 2026 Interval International. All rights reserved.</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <a href="#" className="hover:underline">About Interval</a>
        <a href="#" className="hover:underline">Privacy and Cookie Policies</a>
        <a href="#" className="hover:underline">Cookie Settings</a>
        <a href="#" className="hover:underline">Do Not Sell/Share</a>
        <a href="#" className="hover:underline">Legal Information</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Customer Support</a>
        <a href="#" className="hover:underline">FAQs</a>
      </div>
    </div>
  </div>
);

// ── Mobile Content (hidden on desktop) ──
const MobileContent = () => (
  <div className="md:hidden">
    <div className="mt-2">
      <Link to="/login">
        <div className="border-t py-3 px-4 flex justify-between items-center hover:bg-gray-100">
          <span className="text-gray-800 text-sm">Login</span>
          <IoIosArrowForward className="text-[#1a6fa8] text-lg" />
        </div>
      </Link>
      <Link to="/resort-directory">
        <div className="border-t py-3 px-4 flex justify-between items-center hover:bg-gray-100">
          <span className="text-gray-800 text-sm">Resort Directory</span>
          <IoIosArrowForward className="text-[#1a6fa8] text-lg" />
        </div>
      </Link>
      <a href="#">
        <div className="border-t py-3 px-4 flex justify-between items-center hover:bg-gray-100">
          <span className="text-gray-800 text-sm">Interval HD</span>
          <IoIosArrowForward className="text-[#1a6fa8] text-lg" />
        </div>
      </a>
      <Link to="/create-profile">
        <div className="border-t py-3 px-4 flex justify-between items-center hover:bg-gray-100">
          <span className="text-gray-800 text-sm">Create a Profile</span>
          <IoIosArrowForward className="text-[#1a6fa8] text-lg" />
        </div>
      </Link>
      <a href="#">
        <div className="border-t border-b py-3 px-4 flex justify-between items-center hover:bg-gray-100">
          <span className="text-gray-800 text-sm">Join Today</span>
          <IoIosArrowForward className="text-[#1a6fa8] text-lg" />
        </div>
      </a>
    </div>

    {/* Social */}
    <div className="flex justify-center gap-5 py-6">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-4xl text-[#1877f2]" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-4xl text-[#e1306c]" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="text-4xl text-[#ff0000]" />
      </a>
      <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
        <FaPinterest className="text-4xl text-[#e60023]" />
      </a>
    </div>

    {/* View Full Site */}
    <div className="border-t text-center py-3">
      <a href="#" className="text-sm font-semibold text-gray-800 tracking-wide">VIEW FULL SITE</a>
    </div>
  </div>
);

const Content = () => (
  <>
    <DesktopContent />
    <MobileContent />
  </>
);

export default Content;
