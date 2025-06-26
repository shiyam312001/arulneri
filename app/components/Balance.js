import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Balance() {
  return (
    <div className="balance">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-7 text-start">
            <p className="welcome-text">The Art of Arulneri Healcare</p>
            <p className="about-welcome-text">
              Heal, Balance, and Rejuvenate your 
Body Naturally.
            </p>
            <p className="about-welcome-sub-text">
              We awaken your body’s natural healing power through the gentle <br></br> art of foot reflexology.
            </p>
            <p className="about-welcome-sub-text">
              Step into a journey of relaxation, balance, and complete <br></br> well-being.
            </p>
          </div>

          <div className="col-md-5 text-center">
            <div className="banner-img">
              <Image
                src="/about-banner.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded"
                priority={true} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
