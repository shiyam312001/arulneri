import React from 'react';
import Image from 'next/image';

export default function Cure() {
  return (
    <div className="cure-section animate-on-load">
      <div className="container">

        {/* Desktop: Show text only */}
        <div className="row justify-content-center mb-6 d-none d-md-flex">
          <div className="col-md-12 text-center">
            <p className="cure-head">Restore Your Health</p>
            <p className="cure-subhead">“உணவே மருந்து”</p>
          </div>
        </div>

        {/* Mobile: Show image instead of Tamil text */}
        <div className="d-flex flex-column align-items-center d-block d-md-none">
          <p className="cure-head text-center">Restore Your Health</p>
          <Image
            src="/tamil-word.png"
            width={201}
            height={44}
            alt="Arulneri Healthcare Banner"
            className="img-fluid tamilword-img"
            priority={true}
          />
        </div>

      </div>
    </div>
  );
}
