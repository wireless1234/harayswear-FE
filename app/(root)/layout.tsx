import type { Metadata } from "next";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Newsletter from "@/components/homepage/Newsletter";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const metadata: Metadata = {
  title: "Javcorp",
  description: "Javcorp Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </main>
  );
}
