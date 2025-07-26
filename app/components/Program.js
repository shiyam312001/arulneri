'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Program() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/admin/programs');
        const data = await response.json();
        setPrograms(data.programs || []);
        console.log(data.programs);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const getPrimaryImage = (program) => {
    const primaryImage = program.images?.find(img => img.is_primary === 1);
    return primaryImage?.image_path || '/program.png';
  };

  const handleProgramClick = (programId) => {
    router.push(`/programs/${programId}`);
  };

  return (
    <div className='program animate-on-load'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='program-section'>
              <p className='program-title'>Our Recent Camp and Program</p>
              <p className='program-sub'>Join us for a Free Reflexology Session</p>
            </div>
            <div className='row our-program'>
              {loading ? (
                <div className="col-12 text-center">
                  <p>Loading programs...</p>
                </div>
              ) : programs.length === 0 ? (
                <div className="col-12 text-center">
                  <p>No programs available</p>
                </div>
              ) : (
                programs.map((program) => (
                  <div 
                    key={program.id} 
                    className='col-6 col-md-3 recent-pg'
                    onClick={() => handleProgramClick(program.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      src={getPrimaryImage(program)}
                      width={460}
                      height={500}
                      alt={program.title || "Program Image"}
                      className="img-fluid rounded peaceimg prog-img"
                      priority={true}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
