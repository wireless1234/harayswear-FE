import type { Metadata } from "next";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const metadata: Metadata = {
  title: "Vaperoo",
  description: "Vaperoo",
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
