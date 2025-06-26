import React from 'react'
import Balance from '../components/Balance'
import Mission from '../components/Mission'
import About from '../components/About'

export default function page() {
  return (
    <div className='about'>
      <Balance />
      <Mission />
      <About />
    </div>
  )
}
