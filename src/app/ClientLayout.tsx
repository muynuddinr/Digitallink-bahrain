'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Whatsapp from './components/Whatsapp';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="">
        {children}
      </main>
      {!isAdminRoute && <Whatsapp />}
      {!isAdminRoute && <Footer />}
    </>
  );
}