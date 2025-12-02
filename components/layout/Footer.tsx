import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t mt-8 text-center text-sm text-gray-600 py-6 px-4">
      {/* Newsletter Subscription */}
      <div className="mb-6">
        <Link 
          href="/newsletter"
          className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 text-sm font-medium"
        >
          Subscribe to Newsletter
        </Link>
      </div>

      <div className="space-x-3">
        <Link href="#">Privacy policy</Link>
        <span>·</span>
        <Link href="#">Refund policy</Link>
        <span>·</span>
        <Link href="#">Terms of service</Link>
        <span>·</span>
        <Link href="#">Shipping policy</Link>
        <span>·</span>
        <Link href="#">Contact information</Link>
      </div>

      <div className="mt-4 text-xs">© 2025, Hayrayswear</div>
    </footer>
  );
};

export default Footer;

