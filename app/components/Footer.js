import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer text-white bg-blue">
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
          <li className="footer-nav">Home</li>
          <li className="footer-nav">Our Programs</li>
          <li className="footer-nav">About Us</li>
          <li className="footer-nav">Testimonials</li>
        </ul>

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
