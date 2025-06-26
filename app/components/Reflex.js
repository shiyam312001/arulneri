import React from 'react'
import Image from 'next/image'
export default function Reflex() {
  return (
    <div className='reflex'>
      <div className='container reflex-container'>
        <div className='row ref-row'>
            <div className='col-md-5 refs-row'>
                <div className="banner-img-ref">
                              <Image
                                src="/refimg.png"
                                width={460}
                                height={500}
                                alt="Arulneri Healthcare Banner"
                                className="img-fluid rounded refimg"
                                priority={true} 
                              />
                            </div>
            </div>
            <div className='col-md-7 reflex-row'>
                <p className='ref-head'>Unlock Natural Healing of Foot Reflexology</p>
                <p className='ref-subhead'>Why Foot Reflexology?</p>
                <p className='ref-para'>Foot Reflexology treats the root cause, not just the symptoms, helping you achieve lasting health and wellness safely and naturally.</p>
                <p className='ref-para'>Other Medicines are designed to quickly target symptoms, but they often come with unwanted side effects like fatigue, digestive issues, 
long-term dependency, and cause side effect in kindey and other important organ in body, but Foot Reflexology works naturally by stimulating your body&apos;s own healing systems without introducing chemicals or artificial substances.</p>
<p className='ref-para'>It enhances circulation, reduces stress, balances energy flow, and strengthens your immune system — all without the risk of side effects.</p>
            </div>
        </div>
      </div>
    </div>
  )
}
