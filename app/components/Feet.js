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
                    <p className='feet-text'>“Every foot holds the <br className="d-md-none" /> map to 
<br className="d-md-none" />wellness”</p>
                </div>
            </div>
             <div className='row justify-content-center mt-4'>
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
    </div>
  )
}
