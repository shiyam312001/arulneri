'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Image from 'next/image';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    images: [],
    existingImages: [],
    primaryImageIndex: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/admin/programs', {
        credentials: 'include' // Include credentials in the request
      });
      if (!response.ok) {
        if (response.status === 401) {
          // router.push('/admin');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure programs is always an array
      setPrograms(Array.isArray(data.programs) ? data.programs : []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      // Set empty array on error to prevent undefined issues
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('primaryImageIndex', formData.primaryImageIndex);
    
    // Add existing images data
    formDataToSend.append('existingImages', JSON.stringify(formData.existingImages));
    
    // Add new images
    formData.images.forEach(image => {
      formDataToSend.append('images', image);
    });

    try {
      const url = editingProgram 
        ? `/api/admin/programs/${editingProgram.id}`
        : '/api/admin/programs';
      
      const response = await fetch(url, {
        method: editingProgram ? 'PUT' : 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({ 
          title: '', 
          description: '', 
          location: '', 
          images: [],
          existingImages: [],
          primaryImageIndex: 0 
        });
        setEditingProgram(null);
        fetchPrograms();
      } else {
        if (response.status === 401) {
          // Redirect to login if unauthorized
          // router.push('/admin/login');
          return;
        }
        console.error('Failed to save program:', response.statusText);
        alert('Failed to save program. Please try again.');
      }
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (indexToRemove, isExisting = false) => {
    if (isExisting) {
      setFormData(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, index) => index !== indexToRemove),
        primaryImageIndex: prev.primaryImageIndex === indexToRemove ? 0 : 
          prev.primaryImageIndex > indexToRemove ? prev.primaryImageIndex - 1 : prev.primaryImageIndex
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, index) => index !== indexToRemove),
        primaryImageIndex: prev.primaryImageIndex === indexToRemove ? 0 : 
          prev.primaryImageIndex > indexToRemove ? prev.primaryImageIndex - 1 : prev.primaryImageIndex
      }));
    }
  };

  const setPrimaryImage = (index, isExisting = false) => {
    setFormData(prev => ({
      ...prev,
      primaryImageIndex: isExisting ? index : index + prev.existingImages.length
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        const response = await fetch(`/api/admin/programs/${id}`, {
          method: 'DELETE',
          credentials: 'include' // Include credentials in the request
        });
        if (response.ok) {
          fetchPrograms();
        } else {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            // router.push('/admin/login');
            return;
          }
          console.error('Failed to delete program:', response.statusText);
          alert('Failed to delete program. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting program:', error);
      }
    }
  };

  const openModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      const existingImages = program.images || [];
      const primaryIndex = existingImages.findIndex(img => img.is_primary) || 0;
      
      setFormData({
        title: program.title,
        description: program.description,
        location: program.location,
        images: [],
        existingImages: existingImages,
        primaryImageIndex: primaryIndex
      });
    } else {
      setEditingProgram(null);
      setFormData({ 
        title: '', 
        description: '', 
        location: '', 
        images: [],
        existingImages: [],
        primaryImageIndex: 0 
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProgram(null);
    setFormData({ 
      title: '', 
      description: '', 
      location: '', 
      images: [],
      existingImages: [],
      primaryImageIndex: 0 
    });
  };

  return (
    <ProtectedRoute>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Programs Management</h1>
          <button
            className="btn btn-primary"
            onClick={() => openModal()}
          >
            <Plus size={20} className="me-2" />
            Add New Program
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3">
              <ImageIcon size={48} className="text-muted" />
            </div>
            <h5 className="text-muted">No Programs Found</h5>
            <p className="text-muted">Click &quot;Add New Program&quot; to get started.</p>
          </div>
        ) : (
          <div className="row">
            {programs.map(program => (
              <div key={program.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  {program.images && program.images.length > 0 && (
                    <div className="position-relative">
                      <Image
                        src={program.images.find(img => img.is_primary)?.image_path || program.images[0].image_path}
                        className="card-img-top"
                        alt={program.title}
                        width={400}
                        height={200}
                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                      />
                      {program.images.length > 1 && (
                        <div className="position-absolute bottom-0 end-0 m-2">
                          <span className="badge bg-dark">
                            {program.images.length} images
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{program.title}</h5>
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt me-2"></i>
                      {program.location}
                    </p>
                    <p className="card-text">{program.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <div className="btn-group w-100">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => openModal(program)}
                      >
                        <Edit size={18} className="me-2" />
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(program.id)}
                      >
                        <Trash2 size={18} className="me-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal - Fixed Implementation */}
        {showModal && (
          <>
            {/* Modal Backdrop */}
            <div 
              className="modal-backdrop"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1040,
                display: 'block'
              }}
              onClick={closeModal}
            ></div>
            
            {/* Modal Dialog */}
            <div 
              className="modal"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1050,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}
            >
              <div 
                className="modal-dialog modal-lg"
                style={{
                  maxWidth: '800px',
                  width: '100%',
                  margin: 0
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {editingProgram ? 'Edit Program' : 'Add New Program'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Images</label>
                        <input
                          type="file"
                          className="form-control"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {(formData.existingImages.length > 0 || formData.images.length > 0) && (
                          <div className="mt-3">
                            <p className="small text-muted mb-2">Selected Images:</p>
                            <div className="d-flex flex-wrap gap-2">
                              {/* Existing Images */}
                              {formData.existingImages.map((image, index) => (
                                <div key={`existing-${image.id}`} className="position-relative">
                                  <Image
                                    src={image.image_path}
                                    alt={`Existing ${index + 1}`}
                                    width={100}
                                    height={100}
                                    style={{ 
                                      width: '100px', 
                                      height: '100px', 
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      border: formData.primaryImageIndex === index ? '3px solid #0d6efd' : 'none'
                                    }}
                                    onClick={() => setPrimaryImage(index, true)}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute"
                                    style={{
                                      top: '-8px',
                                      right: '-8px',
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      padding: '0',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                    onClick={() => removeImage(index, true)}
                                  >
                                    <X size={12} />
                                  </button>
                                  {formData.primaryImageIndex === index && (
                                    <div className="position-absolute bottom-0 start-0 end-0 bg-primary text-white text-center py-1 small">
                                      Primary
                                    </div>
                                  )}
                                </div>
                              ))}
                              
                              {/* New Images */}
                              {formData.images.map((image, index) => (
                                <div key={`new-${index}`} className="position-relative">
                                  <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`New ${index + 1}`}
                                    width={100}
                                    height={100}
                                    style={{ 
                                      width: '100px', 
                                      height: '100px', 
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      border: formData.primaryImageIndex === (index + formData.existingImages.length) ? '3px solid #0d6efd' : 'none'
                                    }}
                                    onClick={() => setPrimaryImage(index)}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute"
                                    style={{
                                      top: '-8px',
                                      right: '-8px',
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      padding: '0',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                    onClick={() => removeImage(index)}
                                  >
                                    <X size={12} />
                                  </button>
                                  {formData.primaryImageIndex === (index + formData.existingImages.length) && (
                                    <div className="position-absolute bottom-0 start-0 end-0 bg-primary text-white text-center py-1 small">
                                      Primary
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <p className="small text-muted mt-2">
                              Click on an image to set it as primary
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-end">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingProgram ? 'Update Program' : 'Add Program'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
     </ProtectedRoute>
  );
}