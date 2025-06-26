import React from 'react'
import Image from 'next/image'

export default function Cure() {
  return (
    <div className='cure-section'>
    <div className='container'>
        <div className='row justify-content-center mb-6'>
          <div className='col-md-12 text-center'>
             <p className='cure-head'>Cure without Medicine</p>
            <p className='cure-subhead'>“உணவே மருந்து”</p>
          </div>
        </div>
       <div className='row justify-content-center mb-6'>
          <div className='col-md-12 text-center'>
                 <Image
                                             src="/cure.png"
                                             width={460}
                                             height={500}
                                             alt="Arulneri Healthcare"
                                             className="img-fluid rounded cureimg"
                                             priority={true} 
                                           />
          </div>
        </div>
        </div>  
    </div>
  )
}
