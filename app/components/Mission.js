'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Mission() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='mission'>
      {/* Text section - Desktop & Tablet only */}
      {!isMobile && (
        <div className='container d-flex justify-content-center align-items-center energy-section-background'>
          <div className="text-center">
            <p className='mission-text'>Our Mission</p>
            <p className='mission-sub-text'>What We Stand For</p>
            <p className='mission-sub-txt'>To promote natural wellness and balance,</p>
            <p className='mission-sub-txte'>helping individuals live healthy lives.</p>
          </div>
        </div>
      )}

      {/* Image section - Mobile only */}
      {isMobile && (
        <div className='container d-flex justify-content-center align-items-center'>
          <div className="text-center">
            <Image
              src="/about-mission-mob.png"
              width={460}
              height={500}
              alt="Arulneri Healthcare Banner"
              className="img-fluid rounded"
              priority={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
