
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e91e63"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 mr-2"
              >
                <path d="M12 21a9 9 0 0 0 0-18 9 9 0 0 0 0 18Z" />
                <path d="m12 3 2 4h-4l2-4Z" />
                <path d="m12 21-2-4h4l-2 4Z" />
                <path d="M3 12h4l-4 2Z" />
                <path d="M21 12h-4l4 2Z" />
              </svg>
              <h3 className="font-bold text-lg">SkinSewa</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Your personal AI-powered skin condition analyzer. Upload photos, get instant analysis, and connect with healthcare providers.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://twitter.com/skinsewa"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-skinsewa-pink transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com/skinsewa"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-skinsewa-pink transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://github.com/skinsewa"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-skinsewa-pink transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://youtube.com/skinsewa"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-skinsewa-pink transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h3 className="font-bold text-base md:text-lg">Pages</h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-skinsewa-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="hover:text-skinsewa-pink transition-colors">
                  Skin Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-skinsewa-pink transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-skinsewa-pink transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h3 className="font-bold text-base md:text-lg">Help</h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-skinsewa-pink transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-skinsewa-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-skinsewa-pink transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h3 className="font-bold text-base md:text-lg">Contact</h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-1 md:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5 mt-0.5 text-skinsewa-pink flex-shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="text-xs">
                  <span>Phone:</span>
                  <br />
                  <a href="tel:+911123456789" className="hover:text-skinsewa-pink transition-colors">
                    +91 11-2345-6789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-1 md:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5 mt-0.5 text-skinsewa-pink flex-shrink-0"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <div className="text-xs">
                  <span>Email:</span>
                  <br />
                  <a href="mailto:info@skinsewa.com" className="hover:text-skinsewa-pink transition-colors">
                    info@skinsewa.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-1 md:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 md:h-5 md:w-5 mt-0.5 text-skinsewa-pink flex-shrink-0"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="text-xs">
                  <span>Address:</span>
                  <br />
                  512, Connaught Place
                  <br />
                  New Delhi, 110001
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 md:mt-12 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <p>© {currentYear} SkinSewa. All rights reserved.</p>
            <p className="mt-2 text-xs max-w-3xl mx-auto">
              SkinSewa is an AI-powered platform designed to help users identify potential skin conditions. 
              This tool is for informational purposes only and does not provide medical advice or replace 
              consultation with qualified healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
