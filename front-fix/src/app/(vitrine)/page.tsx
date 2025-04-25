import React from 'react';
import Hero from '@/components/vitrine/Hero';
import Testimonials from '@/components/vitrine/Testimonials';
import CTA from '@/components/vitrine/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <CTA />
    </main>
  );
}
