import type { Metadata } from "next";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const metadata: Metadata = {
  title: "Javcorp",
  description: "Javcorp",
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
