import React from 'react'
import Image from 'next/image'
import Program from './Program'

export default function Peace() {
  return (
    <div className='peace'>
      <div className='container'>
        <div className='row ref-row'>

          {/* Headings (Mobile Only) */}
          <div className='col-12 d-md-none order-1'>
            <p className='ref-head ref-head-mob'>The Path to Peace and Relaxation Often Begins</p>
            <p className='ref-subhead'>Why Foot Reflexology?</p>
          </div>

          {/* Image */}
          <div className='col-12 col-md-5 refs-row order-2 order-md-1'>
            <div className='peace-bg-img'>
              {/* Desktop Image */}
              <Image
                src="/peace-des-img.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid path-img-main rounded d-none d-md-block"
                priority={true}
              />
              {/* Mobile Image */}
              <Image
                src="/peace-img-bg.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded d-block d-md-none peace-img-mob"
                priority={true}
              />
            </div>
          </div>

          {/* Headings (Desktop Only) + Paragraphs */}
          <div className='col-12 col-md-7 reflex-row peace-right-row order-3 order-md-2'>

            {/* Headings (Desktop Only) */}
            <div className='d-none d-md-block'>
              <p className='ref-head'>The Path to Peace and Relaxation Often Begins</p>
              <p className='ref-subhead'>Why Foot Reflexology?</p>
            </div>

            {/* Paragraphs */}
            <p className='ref-para'>Foot reflexology as a formal practice is a modern adaptation, the principles of energy healing and pressure point therapy have ancient roots, particularly within the Siddha and Ayurvedic traditions.</p>
            <p className='ref-para'>Siddhars, the enlightened masters of Tamil Nadu, recognized the importance of the feet in the body’s energy system and often used foot massages and pressure techniques as part of their holistic healing methods.</p>
            <p className='ref-para'>Specific points to balance the body’s energies and promote health parallels the core concepts of reflexology, which aims to improve overall wellness by targeting reflex points on the feet.</p>
          </div>

        </div>

        <Program />
      </div>
    </div>
  )
}
