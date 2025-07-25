import React from 'react';
import Image from 'next/image';

const treatments = [
  { title: 'Chronic Pain', description: 'Neck, shoulders, knees, & back, reducing tension and pain.', image: '/nature1.png' },
  { title: 'Stress and Anxiety', description: 'Calm the mind, reduce anxiety, & enhance emotional well-being.', image: '/nature2.png' },
  { title: 'Sleep Disorders', description: 'Reduce insomnia, improve sleep & help restful night’s sleep.', image: '/nature3.png' },
  { title: 'Headache & Migraines', description: 'Reduce frequency of headpain & migraines over time.', image: '/nature4.png' },
{ title: 'Stomach Issues', description: ' Stomach, intestines, and liver, promoting better health.', image: '/nature5.png' },
{ title: 'Respiratory Issues', description: 'Enhance lung function and relaxation, improving breathing.', image: '/nature6.png' },
{ title: 'Kidney & Urinary', description: 'Reduce kidney stone, improve kidney function, and support it.', image: '/nature7.png' },
{ title: 'Menstrual Issues', description: 'Reproductive & endocrine point help regulate menstrual cycles.', image: '/nature8.png' },
  { title: 'Hormonal Imbalance', description: 'Reflexology helps to supporting hormonal regulation.', image: '/nature9.png' },
  { title: 'Blood Circulation', description: 'Improve blood flow, reduce swelling, & support overall health..', image: '/nature10.png' },
  { title: 'Immune System', description: 'Improve energy levels, & support the body’s natural ability to heal.', image: '/nature11.png' },
  { title: 'General Wellness', description: 'Promote overall health, boost energy & improve body functions.', image: '/nature12.png' },

];

export default function Treatment() {
  return (
    <div className='treatments animate-on-load py-8'>
      <div className='container'>
        <div className='row justify-content-center mb-6'>
          <div className='col-md-12 text-center'>
            <h2 className='text-2xl font-bold treatment-head'>Treatment Will Solve</h2>
            <p className='text-lg treatment-subhead'>Heal Naturally, Live Healthy</p>
          </div>
        </div>
        <div className='row'>
          {treatments.map((treatment, index) => (
            <div key={index} className='col-6 col-md-3 nature-section p-2 hover-opacity-75'>
<div className="p-0 p-md-4 text-center">
                  <div className='mb-3 image-contain'>
                  <Image
                    src={treatment.image}
                    width={87}
                    height={116}
                    alt='Arulneri Healthcare Banner'
                    className='img-fluid rounded-circle nature mx-auto'
                    priority={true}
                  />
                </div>
                <p className='treatment-title font-semibold text-lg'>{treatment.title}</p>
                <p className='treatment-para text-gray-600'>{treatment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
