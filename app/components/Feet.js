import React from 'react'
import Image from 'next/image'
export default function Feet() {
  return (
    <div className='feet'>
      <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
                 <div className='wellness-img'> <Image
                                                src="/wellness.png"
                                                width={460}
                                                height={500}
                                                alt="Arulneri Healthcare Banner"
                                                className="img-fluid rounded wellnessimg"
                                                priority={true} 
/></div>
            </div>
            <div className='col-md-6'>
                <div className='foot-text'>
                    <p className='feet-text'>“Every foot holds the map to 
wellness”</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
