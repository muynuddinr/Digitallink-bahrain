// app/page.tsx
'use client';

import HeroSection from './components/Hero';

import SecuritySolution from './components/SecuritySolution';
import OurBrand from './components/OurBrand';
import Faq from './components/Faq'
import OurRealibility from './components/OurRealibility';
import SecurityProducts from './components/SecurityProducts';




export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <SecurityProducts/>
      <SecuritySolution/>
      <OurBrand/>
      <OurRealibility/>
      <Faq/>

    </div>
  );
}