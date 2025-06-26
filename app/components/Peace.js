import React from 'react'
import Image from 'next/image'
import Program from './Program'
export default function Peace() {
  return (
    <div className='peace'>
      <div className='container'>
        <div className='row ref-row'>
            <div className='col-md-5 refs-row'>
                <div className="banner-img-ref">
                              <Image
                                src="/peace-imgs.png"
                                width={460}
                                height={500}
                                alt="Arulneri Healthcare Banner"
                                className="img-fluid rounded peaceimg"
                                priority={true} 
                              />
                            </div>
            </div>
            <div className='col-md-7 reflex-row peace-right-row'>
                <p className='ref-head'>The Path to Peace and Relaxation Often Begins</p>
                <p className='ref-subhead'>Why Foot Reflexology?</p>
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
