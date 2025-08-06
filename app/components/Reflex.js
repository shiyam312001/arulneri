import React from 'react'
import Image from 'next/image'

export default function Reflex() {
  return (
    <div className='reflex'>
      <div className='container reflex-container'>
        <div className='row ref-row'>

          {/* Headings */}
          <div className='col-12 d-md-none order-1'>
            <p className='ref-head'>Unlock Natural Healing of Foot Reflexology</p>
            <p className='ref-subhead'>Why Foot Reflexology?</p>
          </div>

          {/* Image */}
          <div className='col-12 col-md-5 refs-row order-2 order-md-1'>
            <div className="banner-img-ref reflex-banner reflex-mb-banner">
              <Image
                src="/refimg.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded refimg d-none d-md-block"
                priority={true}
              />
                <Image
                src="/ref-img-bgd.png"
                width={460}
                height={500}
                alt="Arulneri Healthcare Banner"
                className="img-fluid rounded ref-mob-img d-block d-md-none"
                priority={true}
              />
            </div>
          </div>

          {/* Headings & Paragraphs on Desktop, Paragraphs only on Mobile */}
          <div className='col-12 col-md-7 reflex-row  order-3 order-md-2'>
            {/* Headings (Desktop Only) */}
            <div className='d-none d-md-block'>
              <p className='ref-head'>Unlock Natural Healing of Foot Reflexology</p>
              <p className='ref-subhead'>Why Foot Reflexology?</p>
            </div>

            {/* Paragraphs */}
            <p className='ref-para'>
              Foot Reflexology treats the root cause, not just the symptoms, helping you achieve lasting health and wellness safely and naturally.
            </p>
            <p className='ref-para ref-para2'>
             Foot Reflexology gently supports your body&apos;s own healing intelligence. By stimulating specific reflex points on the feet, it promotes better circulation, relieves tension, and encourages the smooth functioning of vital organs. Reflexology helps activate your natural ability to restore balance and harmony leaving you feeling relaxed, energized, and healthier from within.
            </p>
            <p className='ref-para ref-para3'>
              It enhances circulation, reduces stress, balances energy flow, and strengthens your immune system — all without the risk of side effects.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

