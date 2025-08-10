import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <div className='about-me'>
      <div className='container'>

        {/* === Mobile View Only === */}
        <div className="d-block d-md-none">
          <div className='text-center about-title-mob  mb-3'>
            <p className='about-main-title'>Space for Healing, Hope, and Transformation</p>
            <p className='about-title'>About Us</p>
          </div>

          <div className='about-for-img text-center mb-3'>
  <Image
    src="/profile.png"
    width={460}
    height={500}
    alt="Arulneri Healthcare Banner"
    className="img-fluid rounded deepan-img d-none d-md-block"
    priority={true}
  />
  <Image
    src="/deepan-prof-mob.png"
    width={460}
    height={500}
    alt="Arulneri Healthcare Banner (Mobile)"
    className="img-fluid rounded deepan-img d-block d-md-none"
    priority={true}
  />
</div>


          <p className='about-txt about-txt-mb-1'>
            At Arulneri Healcare, dedicated to providing holistic healing through the ancient art of foot reflexology.
            Our mission is to help you to promote natural wellness and balance, helping individuals live healthy lives
            by achieve a balanced and rejuvenated body by targeting pressure points on your feet, which correspond to
            various organs and systems in the body.
          </p>
          <p className='about-txt about-txt-mb-2'>
            Our skilled and certified reflexologists focus on creating a calm and relaxing environment where you can
            experience relief from stress, pain, and tension. We believe in the power of natural healing to improve your
            overall well-being, enhance your energy levels, and promote deep relaxation.
          </p>
        </div>

        {/* === Desktop View Only === */}
        <div className='row flex-md-row d-none d-md-flex'>
          <div className='col-md-6 about-content-me'>
            <p className='about-main-title'>Space for Healing, Hope, and Transformation</p>
            <p className='about-title'>About Us</p>
            <p className='about-txt about-txt-mb-1'>
              At Arulneri Healcare, dedicated to providing holistic healing through the ancient art of foot reflexology.
              Our mission is to help you to promote natural wellness and balance, helping individuals live healthy lives
              by achieve a balanced and rejuvenated body by targeting pressure points on your feet, which correspond to
              various organs and systems in the body.
            </p>
            <p className='about-txt about-txt-mb-2'>
              Our skilled and certified reflexologists focus on creating a calm and relaxing environment where you can
              experience relief from stress, pain, and tension. We believe in the power of natural healing to improve your
              overall well-being, enhance your energy levels, and promote deep relaxation.
            </p>
          </div>

          <div className='col-md-6 about-for-img'>
            <div className="about-me-img">
              <Image
                src="/profile.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded deepan-img"
                priority={true}
              />
            </div>
          </div>
        </div>

        {/* === Bottom Section (Shared) === */}
        <div className='row'>
          <div className='col-md-7 text-center'>
  <Image
    src="/Logo.png"
    width={191}
    height={66}
    alt="Arulneri Healthcare about-logo"
    className="img-fluid about-logo about-logo-mob rounded mx-auto d-block"
    priority={true}
  />
            <p className='about-text-sec'>
              Arulneri Healcare is more than just a wellness center — it is a sacred space where ancient wisdom meets
              modern healing. Rooted in the timeless principles of Siddha and holistic traditions, we believe that true
              health begins from within — in the spirit, the mind, and the body.
            </p>
            <p className='about-text-sec'>
              Our mission is to help you to promote natural wellness and balance, helping individuals live healthy lives
            </p>
          </div>

          <div className='col-md-5'>
            <p className='contact-right-head'>Contact Us</p>
            <p className='contact-right-subhead'>Let’s walk the path to healing together</p>

            <div className='col-md-12 d-flex align-items-start mb-3'>
              <div className='me-3'>
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
                <p className='icon-pic about-info mb-1'>Email:</p>
                <p className='icon-text about-inform mb-0'>arulnerihealcare@gmail.com</p>
              </div>
            </div>

            <div className='col-md-12 d-flex align-items-start mb-3'>
              <div className='me-3'>
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
                <p className='icon-pic about-info mb-1'>Phone:</p>
                <p className='icon-text about-inform mb-0'>+91 88832 20081</p>
              </div>
            </div>

            <div className='col-md-12 d-flex align-items-start mb-3'>
              <div className='me-3'>
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
                <p className='icon-pic about-info mb-1'>Address:</p>
                <p className='icon-text about-inform mb-0'>Vickramasingapuram, Tirunelveli.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
