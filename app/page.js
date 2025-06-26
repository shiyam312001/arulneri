import React from 'react'
import Image from 'next/image'
import './style.css';
import Logo from '../public/Logo.png'
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Energy from './components/Energy';
import Reflex from './components/Reflex';
import Treatment from './components/Treatment';
import Cure from './components/Cure';
import Peace from './components/Peace';
import Feet from './components/Feet';
import Words from './components/Words';
import Contact from './components/Contact';
import HomeContact from './components/HomeContact';
export default function page() {
  return (
    <div>
  
   <Banner />
   <Energy />
  <Reflex />
    <Treatment />
    <Cure />
    <Peace />
    <Feet />
    <Words />
    <HomeContact />
    </div>
  )
}
