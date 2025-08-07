'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Camp from '@/app/components/Camp';

export default function ProgramDetails() {
  const params = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await fetch(`/api/admin/programs/${params.id}`);
        const data = await response.json();
        setProgram(data.program);
      } catch (error) {
        console.error('Error fetching program details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProgramDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <p>Loading program details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <p>Program not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className="mb-3 program-id-title">{program.title}<span className='program-id-blue'></span></h1>
          <p className="mb-4 program-id-location">{program.location}</p>
        </div>
        
        <div className="col-12">
          <div className="row">
            {program.images?.map((image, index) => (
              <div key={image.id} className="col-md-3 mb-4">
                <div className="position-relative">
                  <Image
                    src={image.image_path}
                    width={400}
                    height={300}
                    alt={`${program.title} - Image ${index + 1}`}
                    className="img-fluid rounded rec-prg-img"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Camp />
      </div>
    </div>
  );
} 