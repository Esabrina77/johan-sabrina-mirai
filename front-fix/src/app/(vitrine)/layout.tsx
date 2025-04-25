import React from 'react';
import MainHeader from '@/components/vitrine/MainHeader';
import Footer from '@/components/vitrine/Footer';
import '@/styles/globals.css';

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
