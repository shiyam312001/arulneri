import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer text-white">
      <div className="container text-center py-5">

        {/* Centered Logo */}
        <div className="footer-title fw-bold mb-3 d-flex justify-content-center">
          <Image
            src="/footer-logo.png"
            width={513}
            height={170}
            alt="Arulneri Healthcare footer-logo"
            priority
          />
        </div>

        {/* Footer Navigation */}
        <ul className="footer-menu d-flex justify-content-center gap-4 py-3 list-unstyled">
          <li className="footer-nav"><Link className="footer-nav" href="/">Home</Link> </li>
          <li className="footer-nav"> <Link href="/our-program">Our Programs</Link></li>
          <li className="footer-nav"><Link href="/about">About Us </Link></li>
          <li className="footer-nav"><Link href="/testimonials">Testimonials</Link></li>
        </ul>

<div className="container py-4">
  <div className="row">
    {/* Left Aligned */}
    <div className="col-md-4 d-flex justify-content-start align-items-start mb-3 text-start">
      <div className="me-3">
        <Image
          src="/loc.png"
          width={48}
          height={48}
          alt="Location Icon"
          className="img-fluid"
          priority={true}
        />
      </div>
      <div>
        <p className="mb-0 fw-bold about-info text-white">Address:</p>
        <p className="mb-0 about-inform text-white">Vickramasingapuram, Tirunelveli.</p>
      </div>
    </div>

    {/* Center Aligned */}
    <div className="col-md-4 d-flex mb-3 text-start">
      <div className="me-3">
        <Image
          src="/mail.png"
          width={48}
          height={48}
          alt="Email Icon"
          className="img-fluid"
          priority={true}
        />
      </div>
      <div>
        <p className="mb-0 fw-bold about-info text-white">Email:</p>
        <p className="mb-0 about-inform text-white">arulnerihealcare@gmail.com</p>
      </div>
    </div>

    {/* Right Aligned */}
    <div className="col-md-4 d-flex mb-3 text-start">
      <div className="me-3">
        <Image
          src="/mob.png"
          width={48}
          height={48}
          alt="Phone Icon"
          className="img-fluid"
          priority={true}
        />
      </div>
      <div>
        <p className="mb-0 fw-bold about-info text-white">Phone:</p>
        <p className="mb-0 about-inform text-white">+91 88832 20081</p>
      </div>
    </div>
  </div>
</div>

        <hr className="bg-white opacity-25" />

        {/* Footer Copyright and Social */}
        <div className="footer-copyrigh-content">
          <p className="footer-copy-left footer-left mb-3">
            Copyright © 2025 Arulneri Healthcare
          </p>

          {/* Social Media Icons */}
          <div className="footer-copy-right social-icons d-flex justify-content-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/fb.png"
                width={32}
                height={32}
                alt="Facebook"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/wp.png"
                width={32}
                height={32}
                alt="Twitter"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/insta.png"
                width={32}
                height={32}
                alt="Instagram"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/youtube.png"
                width={32}
                height={32}
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
