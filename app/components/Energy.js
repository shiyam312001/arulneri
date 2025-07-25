import React from 'react';
import Image from 'next/image';

export default function Energy() {
  return (
    <div className='energy-section'>
      <div className="d-flex justify-content-center align-items-center d-block d-md-none" style={{ minHeight: '300px',marginTop:'-65px' }}>
        <div className="text-center">
          <Image
            src="/energy-bg-mob.png"
            width={252}
            height={212}
            alt="Arulneri Healthcare Banner"
            className="img-fluid rounded"
            priority={true}
          />
        </div>
      </div>
      <div className='container d-none d-md-flex justify-content-center align-items-center energy-section-background'>
        <div className="text-center">
          <p className='energy-text'>Energy Heals.</p>
          <p className='energy-texts'>Not Pills.</p>
        </div>
      </div>

    </div>
  );
}
