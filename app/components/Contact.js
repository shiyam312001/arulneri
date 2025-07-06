"use client";
import React, { useState } from 'react';
import axios from 'axios'; 
import Image from 'next/image';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    district: '',
    mobile: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/contacts', formData);
      if (res.status === 200 || res.status === 201) {
        setSubmitted(true);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert("An error occurred. Please check console and try again.");
    }
  };

  const handleDone = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      district: '',
      mobile: '',
      message: ''
    });
  };

  return (
    <div className='contact-form'>
      <div className='container'>
        <div className='row contact-row'>
           <div className='col-md-6'>
            <div className='contact-form-box'>
              <div className="rounded-2xl shadow-xl p-8 contactform">
                <div className="rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">Contact Form</h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    Begin your wellness journey — share your need, we&apos;ll guide your way
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 conform">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Full Name <b>*</b></label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full bg-contact-field px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">District <b>*</b></label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Enter your current district"
                        className="w-full bg-contact-field px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone <b>*</b></label>
                      <div className="flex">
                        <select className="px-3 bg-contact-field py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-600">
                          <option>+91</option>
                        </select>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter your contact number"
                          className="flex-1 bg-contact-field px-4 py-3 mb-contact border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">How can we help you?</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter your message here"
                        rows="4"
                        className="w-full bg-contact-field px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="contactbtn"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
                        <div className='col-md-6 contact-right'>
                          <p className='contact-right-head-cc'>Need Assistance?</p>
          <p className='contact-right-subhead-cc'>You&apos;ve taken the first step, Let us walk with you.</p>
          <p className='contact-right-head'>Contact Us</p>
          <p className='contact-right-subhead'>Let&apos;s walk the path to healing together</p>
        
          <div className='col-md-12 d-flex align-items-start mb-3 contact-infs'>
            <div className='me-3'>
              <Image
                src="/mail.png"
                width={48}
                height={48}
                alt="Email Icon"
                className="img-fluid"
                priority={true}
              />
            </div>
            <div>
              <p className='icon-pic about-info mb-1'>Email:</p>
              <p className='icon-text about-inform mb-0'>arulnerihealcare@gmail.com</p>
            </div>
          </div>
           <div className='col-md-12 d-flex align-items-start mb-3 contact-infs'>
            <div className='me-3'>
              <Image
                src="/mob.png"
                width={48}
                height={48}
                alt="Email Icon"
                className="img-fluid"
                priority={true}
              />
            </div>
            <div>
              <p className='icon-pic about-info mb-1'>Phone:</p>
              <p className='icon-text about-inform mb-0'>+91 88832 20081</p>
            </div>
          </div>
            <div className='col-md-12 d-flex align-items-start mb-3 contact-infs'>
            <div className='me-3'>
              <Image
                src="/loc.png"
                width={48}
                height={48}
                alt="Email Icon"
                className="img-fluid"
                priority={true}
              />
            </div>
            <div>
              <p className='icon-pic about-info mb-1'>Address:</p>
              <p className='icon-text about-inform mb-0'>Vickramasingapuram, Tirunelveli.</p>
            </div>
          </div>
        </div>
         
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center max-w-md w-full shadow-2xl transform animate-slideUp"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-tick rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Thank you. You&apos;ve made a soulful step toward balance and relief.
              </p>
            </div>

            <button
              onClick={handleDone}
              className="px-8 py-3 contact-suc-btn border-2  border-white hover:bg-white hover:text-gray-900 rounded-lg font-semibold transition-all duration-200"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
