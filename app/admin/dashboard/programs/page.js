'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Image as ImageIcon, X, MapPin } from 'lucide-react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Image from 'next/image';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [activeTab, setActiveTab] = useState('programs');
  const [admin, setAdmin] = useState({ username: 'Admin' });
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
        credentials: 'include'
      });
      if (!response.ok) {
        if (response.status === 401) {
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrograms(Array.isArray(data.programs) ? data.programs : []);
    } catch (error) {
      console.error('Error fetching programs:', error);
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
    
    formDataToSend.append('existingImages', JSON.stringify(formData.existingImages));
    
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
        
        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'toast-container position-fixed top-0 end-0 p-3';
        toast.innerHTML = `
          <div class="toast show" role="alert">
            <div class="toast-header">
              <i class="bi bi-check-circle-fill text-success me-2"></i>
              <strong class="me-auto">Success</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
              Program ${editingProgram ? 'updated' : 'created'} successfully!
            </div>
          </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      } else {
        if (response.status === 401) {
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
          credentials: 'include'
        });
        if (response.ok) {
          fetchPrograms();
          
          // Show success toast
          const toast = document.createElement('div');
          toast.className = 'toast-container position-fixed top-0 end-0 p-3';
          toast.innerHTML = `
            <div class="toast show" role="alert">
              <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
              </div>
              <div class="toast-body">
                Program deleted successfully!
              </div>
            </div>
          `;
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 3000);
        } else {
          if (response.status === 401) {
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

  const logout = () => {
    // Add logout logic here
    router.push('/admin/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-vh-100" style={{backgroundColor: '#f8f9fa'}}>
        {/* Top Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
          <div className="container-fluid">
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#sidebarOffcanvas"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <span className="navbar-brand fw-bold mb-0">Admin Dashboard</span>
            
            <div className="d-flex align-items-center ms-auto">
              <div className="dropdown">
                <button 
                  className="btn btn-dark dropdown-toggle border-0 d-flex align-items-center" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                       style={{width: 32, height: 32}}>
                    {admin?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-md-inline">{admin?.username}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><span className="dropdown-header">Welcome, {admin?.username}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={logout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-2 col-md-3 d-none d-md-block bg-white shadow-sm min-vh-100 p-0">
              <div className="position-sticky top-0">
                <div className="p-3">
                  <nav className="nav flex-column">
                    <button 
                      className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                      onClick={() => router.push('/admin/dashboard')}
                    >
                      <i className="bi bi-speedometer2 me-2"></i>
                      Dashboard
                    </button>
                    <button 
                      className={`nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start ${activeTab === 'programs' ? 'bg-primary text-white rounded' : ''}`}
                      onClick={() => setActiveTab('programs')}
                    >
                      <i className="bi bi-list-task me-2"></i>
                      Programs
                    </button>
                    <button 
                      className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                      onClick={() => router.push('/admin/dashboard/contacts')}
                    >
                      <i className="bi bi-person-lines-fill me-2"></i>
                      Contacts
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Offcanvas */}
            <div className="offcanvas offcanvas-start d-md-none" tabIndex="-1" id="sidebarOffcanvas">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">Menu</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
              </div>
              <div className="offcanvas-body">
                <nav className="nav flex-column">
                  <button 
                    className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                    onClick={() => router.push('/admin/dashboard')}
                    data-bs-dismiss="offcanvas"
                  >
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                  </button>
                  <button 
                    className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start bg-primary text-white rounded"
                    onClick={() => setActiveTab('programs')}
                    data-bs-dismiss="offcanvas"
                  >
                    <i className="bi bi-list-task me-2"></i>
                    Programs
                  </button>
                  <button 
                    className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                    onClick={() => router.push('/admin/dashboard/contacts')}
                    data-bs-dismiss="offcanvas"
                  >
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Contacts
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-10 col-md-9 p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="h2 mb-1 text-dark fw-bold">Programs Management</h1>
                  <p className="text-muted mb-0">Manage and organize your programs</p>
                </div>
                <button
                  className="btn btn-primary d-flex align-items-center px-4 py-2 fw-semibold"
                  onClick={() => openModal()}
                >
                  <Plus size={18} className="me-2" />
                  Add New Program
                </button>
              </div>

              {/* Stats Cards */}
              <div className="row mb-4">
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                            <i className="bi bi-list-task text-primary fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="text-muted mb-1 fw-normal">Total Programs</h6>
                          <h4 className="mb-0 fw-bold">{programs.length}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="bg-success bg-opacity-10 rounded-3 p-3">
                            <i className="bi bi-check-circle text-success fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="text-muted mb-1 fw-normal">Active Programs</h6>
                          <h4 className="mb-0 fw-bold">{programs.length}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="bg-info bg-opacity-10 rounded-3 p-3">
                            <i className="bi bi-images text-info fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="text-muted mb-1 fw-normal">Total Images</h6>
                          <h4 className="mb-0 fw-bold">
                            {programs.reduce((sum, program) => sum + (program.images?.length || 0), 0)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                            <i className="bi bi-geo-alt text-warning fs-4"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="text-muted mb-1 fw-normal">Locations</h6>
                          <h4 className="mb-0 fw-bold">
                            {new Set(programs.map(p => p.location)).size}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="d-flex justify-content-center align-items-center py-5">
                  <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading programs...</p>
                  </div>
                </div>
              ) : programs.length === 0 ? (
                /* Empty State */
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="bi bi-list-task text-muted" style={{fontSize: '4rem'}}></i>
                  </div>
                  <h3 className="h4 mb-2">No Programs Found</h3>
                  <p className="text-muted mb-4">Get started by creating your first program</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal()}
                  >
                    <Plus size={18} className="me-2" />
                    Add New Program
                  </button>
                </div>
              ) : (
                /* Programs Grid */
                <div className="row">
                  {programs.map(program => (
                    <div key={program.id} className="col-lg-4 col-md-6 mb-4">
                      <div className="card border-0 shadow-sm h-100 hover-lift">
                        {/* Program Image */}
                        {program.images && program.images.length > 0 && (
                          <div className="position-relative">
                            <Image
                              src={program.images.find(img => img.is_primary)?.image_path || program.images[0].image_path}
                              alt={program.title}
                              width={400}
                              height={200}
                              className="card-img-top"
                              style={{height: '200px', objectFit: 'cover'}}
                            />
                            {program.images.length > 1 && (
                              <div className="position-absolute bottom-0 end-0 m-2">
                                <span className="badge bg-dark bg-opacity-75">
                                  <i className="bi bi-images me-1"></i>
                                  {program.images.length}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Program Content */}
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title fw-bold mb-2">{program.title}</h5>
                          <div className="d-flex align-items-center text-muted mb-2">
                            <i className="bi bi-geo-alt me-2"></i>
                            <small>{program.location}</small>
                          </div>
                          <p className="card-text text-muted small flex-grow-1">
                            {program.description.length > 120 
                              ? program.description.substring(0, 120) + '...' 
                              : program.description
                            }
                          </p>
                          
                          {/* Action Buttons */}
                          <div className="d-flex gap-2 mt-auto">
                            <button
                              className="btn btn-outline-primary btn-sm flex-fill"
                              onClick={() => openModal(program)}
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm flex-fill"
                              onClick={() => handleDelete(program.id)}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingProgram ? 'Edit Program' : 'Add New Program'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                
                {/* Modal Body */}
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Program Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter program title"
                        required
                      />
                    </div>
                    
                    {/* Location Input */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Location <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter location"
                        required
                      />
                    </div>
                    
                    {/* Description Input */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        rows="4"
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter program description"
                        required
                      ></textarea>
                    </div>
                    
                    {/* Images Input */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Images</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <div className="form-text">You can select multiple images</div>
                      
                      {/* Image Preview */}
                      {(formData.existingImages.length > 0 || formData.images.length > 0) && (
                        <div className="mt-3">
                          <h6 className="fw-semibold mb-2">Selected Images:</h6>
                          <div className="row g-2">
                            {/* Existing Images */}
                            {formData.existingImages.map((image, index) => (
                              <div key={`existing-${image.id}`} className="col-6 col-md-4 col-lg-3">
                                <div className="position-relative">
                                  <Image
                                    src={image.image_path}
                                    alt={`Existing ${index + 1}`}
                                    width={150}
                                    height={120}
                                    className={`w-100 rounded cursor-pointer ${
                                      formData.primaryImageIndex === index 
                                        ? 'border border-primary border-3' 
                                        : ''
                                    }`}
                                    style={{height: '120px', objectFit: 'cover'}}
                                    onClick={() => setPrimaryImage(index, true)}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-1"
                                    onClick={() => removeImage(index, true)}
                                    style={{fontSize: '0.7rem'}}
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                  {formData.primaryImageIndex === index && (
                                    <div className="position-absolute bottom-0 start-0 end-0 bg-primary text-white text-center py-1 rounded-bottom">
                                      <small>Primary</small>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            
                            {/* New Images */}
                            {formData.images.map((image, index) => (
                              <div key={`new-${index}`} className="col-6 col-md-4 col-lg-3">
                                <div className="position-relative">
                                  <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`New ${index + 1}`}
                                    width={150}
                                    height={120}
                                    className={`w-100 rounded cursor-pointer ${
                                      formData.primaryImageIndex === (index + formData.existingImages.length)
                                        ? 'border border-primary border-3' 
                                        : ''
                                    }`}
                                    style={{height: '120px', objectFit: 'cover'}}
                                    onClick={() => setPrimaryImage(index)}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-1"
                                    onClick={() => removeImage(index)}
                                    style={{fontSize: '0.7rem'}}
                                  >
                                    <i className="bi bi-x"></i>
                                  </button>
                                  {formData.primaryImageIndex === (index + formData.existingImages.length) && (
                                    <div className="position-absolute bottom-0 start-0 end-0 bg-primary text-white text-center py-1 rounded-bottom">
                                      <small>Primary</small>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="form-text mt-2">
                            <i className="bi bi-info-circle me-1"></i>
                            Click on an image to set it as primary
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Form Actions */}
                    <div className="d-flex gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                      >
                        <i className="bi bi-check-lg me-2"></i>
                        {editingProgram ? 'Update Program' : 'Add Program'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </ProtectedRoute>
  );
}