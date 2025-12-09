"use client"
import { Mail, MapPin, Phone } from 'lucide-react'; 
import Image from 'next/image';
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();
  
if (["/dashboard", "/login", "/signup"].includes(pathname)) {
  return null;
}
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 px-4 sm:px-6 lg:px-8 mt-12 font-inter ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Column 1: Hexa Mart Info */}
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Hexa Mart</h3>
          <p className="text-sm leading-relaxed mb-4">
            Your one-stop shop for all your needs. Discover quality products and unbeatable prices at Hexa Mart.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:info@hexamart.com" className="hover:text-gray-900 flex items-center gap-2">
              <Mail size={16} /> info@hexamart.com
            </a>
            <a href="tel:+1234567890" className="hover:text-gray-900 flex items-center gap-2">
              <Phone size={16} /> +1 (234) 567-890
            </a>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> 123 Mart Lane, City, Country
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">FAQ</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Order Tracking</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Support Center</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors duration-200">Payment Methods</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h4>
          <p className="text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2.5 flex-grow rounded-l-md bg-gray-200 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2.5 rounded-r-md hover:bg-blue-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            {/* Placeholder for social media icons */}
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              {/* Replace with actual SVG/Font Awesome icons for Facebook, Instagram, Twitter, etc. */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM8.5 7c.828 0 1.5.672 1.5 1.5S9.328 10 8.5 10 7 9.328 7 8.5 7.672 7 8.5 7zM12 18.5c-2.481 0-4.5-1.567-4.5-3.5h9c0 1.933-2.019 3.5-4.5 3.5z"/></svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM8.5 7c.828 0 1.5.672 1.5 1.5S9.328 10 8.5 10 7 9.328 7 8.5 7.672 7 8.5 7zM12 18.5c-2.481 0-4.5-1.567-4.5-3.5h9c0 1.933-2.019 3.5-4.5 3.5z"/></svg>
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>

      </div>

      {/* Bottom Copyright and Payment Methods */}
      <div className="border-t border-gray-300 mt-10 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Hexa Mart. All rights reserved.</p>
     <div className="flex justify-center items-center gap-4 mt-4">
  {/* Placeholder for payment method icons */}
  <Image 
    src="https://placehold.co/50x30/D1D5DB/4B5563?text=Visa" 
    alt="Visa" 
    width={50} 
    height={30} 
    className="rounded"
  />
  <Image 
    src="https://placehold.co/50x30/D1D5DB/4B5563?text=Master" 
    alt="Mastercard" 
    width={50} 
    height={30} 
    className="rounded"
  />
  <Image 
    src="https://placehold.co/50x30/D1D5DB/4B5563?text=PayPal" 
    alt="PayPal" 
    width={50} 
    height={30} 
    className="rounded"
  />
  {/* Add more payment icons as needed */}
</div>
      </div>
    </footer>
  );
};

export default Footer;
