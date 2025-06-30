import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t mt-8 text-center text-sm text-gray-600 py-6 px-4">
      <div className="space-x-3">
        <Link href="/privacy-policy">Privacy policy</Link>
        <span>·</span>
        <Link href="/refund-policy">Refund policy</Link>
        <span>·</span>
        <Link href="/terms-of-service">Terms of service</Link>
        <span>·</span>
        <Link href="/shipping-policy">Shipping policy</Link>
        <span>·</span>
        <Link href="/contact">Contact information</Link>
      </div>

      <div className="mt-4 text-xs">© 2025, My Store</div>
    </footer>
  );
};

export default Footer;

