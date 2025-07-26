import React from 'react';
import Image from 'next/image';

export default function Treat() {
  return (
    <div className='energy-section enegergy2-section'>

      {/* Desktop Text Section */}
      <div className='container d-none d-md-flex justify-content-center align-items-center treat-section-background'>
        <div className="text-center">
          <p className='energy-text-testi'>We treat you not as a</p>
          <p className='energy-text-test'>
            patient, but as a Loved One.
          </p>
        </div>
      </div>

      {/* Mobile Image Section */}
      <div className='container d-block d-md-none text-center'>
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
  );
}
