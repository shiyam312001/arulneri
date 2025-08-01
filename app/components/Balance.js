import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Balance() {
  return (
    <div className="balance">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-7 balance-order-row text-start order-2 order-md-1">
            <p className="welcome-text">The Art of Arulneri Healcare</p>
            <p className="about-welcome-text">
              Heal, Balance, and Rejuvenate your  <br className="d-md-none" /> 
Body Naturally.
            </p>
            <p className="about-welcome-sub-text about-welcome-sub-textd">
  We awaken your body’s natural healing power through the gentle
  <span className="d-none d-md-inline"><br /></span>
  art of foot reflexology.
</p>
<p className="about-welcome-sub-text">
  Step into a journey of relaxation, balance, and complete
  <span className="d-none d-md-inline"><br /></span>
  well-being.
</p>

          </div>

          <div className="col-md-5 balance-order-row2 text-center order-1 order-md-2">
            <div className="banner-img balance-about-mob">
              <Image
                src="/about-banner.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded d-none d-md-block"
                priority={true} 
              />
                <Image
                              src="/about-banner-mobile.png"
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
