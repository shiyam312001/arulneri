import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Balance() {
  return (
    <div className="balance">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-7 text-start order-2 order-md-1">
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

          <div className="col-md-5 text-center order-1 order-md-2">
            <div className="banner-img">
              <Image
                src="/about-banner.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded d-none d-md-block"
                priority={true} 
              />
                <Image
                              src="/about-banner-mob.png"
                              width={460}
                              height={500}
                              alt="Arulneri Healthcare Banner"
                              className="img-fluid rounded d-block d-md-none banner-mob-abt"
                              priority={true}
                            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
