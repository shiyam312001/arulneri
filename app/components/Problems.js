import React from 'react'
import Image from 'next/image'

export default function Problems() {
  return (
    <div>
      <div className='problems animate-on-load'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 text-center'>
            <h2 className='text-2xl font-bold treatment-head problem-head'>How Foot Reflexology Solves Your Health Problems</h2>
            <p className='text-lg treatment-subhead'>Every Point In Your Foot Connects To An Organ</p>
</div>
<div className='col-md-6 py-3 problem-img'>
       <Image
                                    src="/foot-chart.jpg"
                                    width={530}
                                    height={570}
                                    alt="Arulneri Healthcare Banner"
                                    className="img-fluid rounded prbimg"
                                    priority={true} 
                                  />
</div>
<div className='col-md-6 py-3 problem-img'>
       <Image
                                    src="/foot-sim.png"
                                    width={530}
                                    height={570}
                                    alt="Arulneri Healthcare Banner"
                                    className="img-fluid rounded prbimg"
                                    priority={true} 
                                  />
</div>
            </div>
        </div>
      </div>
    </div>
  )
}
