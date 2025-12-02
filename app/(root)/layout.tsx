import type { Metadata } from "next";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const metadata: Metadata = {
  title: "Hayrayswear Ecommerce",
  description: "Hayrayswear Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000}/>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
