import type { Metadata } from "next";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const metadata: Metadata = {
  title: "Uncle V",
  description: "UncleV Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <ToastContainer position="top-right" autoClose={3000}/>
        {children}
    </main>
  );
}
