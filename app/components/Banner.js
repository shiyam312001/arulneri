import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="banner animate-on-load">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-7 text-start order-2 order-md-1 welcome-ord-content">
            <p className="welcome-text">Welcome to Arulneri Healcare</p>
          <p className="welcome-texts">
  Heal Your Health, Mind, Body, and Soul with
  <br className="d-md-none" /> Foot Reflexology.
</p>
            <p className="welcome-sub-text">
              Through the ancient art of Foot Reflexology, we help your body overcome disease, 
              restore health, and rejuvenate your vitality from within.
            </p>
            <Link
              href="/contact"
              className="nav-menus-btn px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 text-decoration-none"
            >
              Book a Session
            </Link>
          </div>

          <div className="col-md-5 order-1 order-md-2 text-center">
            <div className="banner-img welcome-banner-control">
              <Image
                src="/banner-img.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded carousel-img d-none d-md-block"
                priority={true}
              />
              <Image
                src="/mobile-banner.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded d-block d-md-none"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
