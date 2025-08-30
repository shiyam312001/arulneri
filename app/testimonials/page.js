import React from 'react'
import Testimonial from '../components/Testimonial'
import Treat from '../components/Treat'

export default function page() {
  return (
    <div className='testimonial-page mt-1'>
      <Testimonial />
      <Treat />
    </div>
  )
}
