'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Camp() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('/api/admin/programs');
        const data = await res.json();
        setPrograms(data.programs || []);
      } catch (error) {
        console.error('Failed to load programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const getPrimaryImage = (program) => {
    const primary = program.images?.find(img => img.is_primary === 1);
    return primary?.image_path || '/program.png';
  };

  const handleProgramClick = (programId) => {
    router.push(`/programs/${programId}`);
  };

  const totalPages = Math.ceil(programs.length / itemsPerPage);
  const paginatedPrograms = programs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="program py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mb-4">
            <div className="program-section">
              <p className="program-title">Other Program and Camp</p>
              <p className="program-sub">Well Being Camps</p>
            </div>
          </div>

          {/* Program Cards */}
          <div className="row our-program mb-4">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading programs...</p>
              </div>
            ) : paginatedPrograms.length === 0 ? (
              <div className="col-12 text-center">
                <p>No programs available.</p>
              </div>
            ) : (
              paginatedPrograms.map(program => (
                <div 
                  className="col-md-4 col-6 mb-4" 
                  key={program.id} 
                  onClick={() => handleProgramClick(program.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex flex-column">
                    <Image
                      src={getPrimaryImage(program)}
                      width={460}
                      height={500}
                      alt={program.title || 'Program Image'}
                      className="img-fluid rounded mb-2 rec-prg-img"
                      priority={false}
                    />
                    <div className="program-location text-start">
                      <p className="mb-0 fw-semibold">{program.title}</p>
                      <p className="text-muted">{program.location}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    <a className="page-link" href="#" onClick={e => e.preventDefault()}>
                      {page}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
