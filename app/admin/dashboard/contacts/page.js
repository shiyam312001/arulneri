'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Eye, Phone, Mail, MapPin, Calendar, User, MessageSquare } from 'lucide-react';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');
  const router = useRouter();

  // Fetch admin info
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch('/api/admin/me', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setAdmin(data.admin);
        }
      } catch (error) {
        console.error('Error fetching admin info:', error);
      }
    };
    fetchAdminInfo();
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch('/api/contacts', {
        credentials: 'include'
      });
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          fetchContacts();
        } else {
          if (response.status === 401) {
            router.push('/admin');
            return;
          }
          console.error('Failed to delete contact:', response.statusText);
          alert('Failed to delete contact. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const viewContact = async (id) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedContact(data.contact);
        setShowModal(true);
      } else {
        if (response.status === 401) {
          router.push('/admin');
          return;
        }
        console.error('Failed to fetch contact:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
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
                    className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                    onClick={() => router.push('/admin/dashboard/programs')}
                  >
                    <i className="bi bi-list-task me-2"></i>
                    Programs
                  </button>
                  <button 
                    className={`nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start ${activeTab === 'contacts' ? 'bg-primary text-white rounded' : ''}`}
                    onClick={() => setActiveTab('contacts')}
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
                  className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                  onClick={() => router.push('/admin/dashboard/programs')}
                  data-bs-dismiss="offcanvas"
                >
                  <i className="bi bi-list-task me-2"></i>
                  Programs
                </button>
                <button 
                  className="nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start"
                  onClick={() => setActiveTab('contacts')}
                  data-bs-dismiss="offcanvas"
                >
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Contacts
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-10 col-md-9 ms-auto px-4">
            <div className="py-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="h3 mb-1 text-dark">Contact Submissions</h1>
                  <p className="text-muted mb-0">Manage and view contact form submissions</p>
                </div>
                <div className="badge bg-primary fs-6 px-3 py-2">
                  Total: {contacts.length}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading contact submissions...</p>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="bi bi-inbox display-1 text-muted"></i>
                  </div>
                  <h5 className="text-muted mb-2">No Contact Submissions Found</h5>
                  <p className="text-muted">Contact submissions will appear here when users submit the contact form.</p>
                </div>
              ) : (
                <div className="card shadow-sm border-0">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th className="border-0 px-4 py-3">
                              <div className="d-flex align-items-center">
                                <User size={16} className="me-2 text-muted" />
                                Contact Info
                              </div>
                            </th>
                            <th className="border-0 py-3">
                              <div className="d-flex align-items-center">
                                <MapPin size={16} className="me-2 text-muted" />
                                District
                              </div>
                            </th>
                            <th className="border-0 py-3">
                              <div className="d-flex align-items-center">
                                <Calendar size={16} className="me-2 text-muted" />
                                Date
                              </div>
                            </th>
                            <th className="border-0 py-3 text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map(contact => (
                            <tr key={contact.id} className="border-bottom">
                              <td className="px-4 py-3">
                                <div>
                                  <div className="fw-semibold text-dark mb-1">{contact.full_name}</div>
                                  <div className="d-flex align-items-center text-muted small">
                                    <Phone size={14} className="me-1" />
                                    {contact.mobile}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className="badge bg-light text-dark px-2 py-1">{contact.district}</span>
                              </td>
                              <td className="py-3">
                                <div className="text-muted small">{formatDate(contact.created_at)}</div>
                              </td>
                              <td className="py-3 text-end">
                                <div className="btn-group" role="group">
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => viewContact(contact.id)}
                                    title="View Details"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(contact.id)}
                                    title="Delete Contact"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Contact Modal */}
      {showModal && selectedContact && (
        <>
          <div 
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>
          
          <div 
            className="modal fade show d-block"
            tabIndex="-1"
            style={{zIndex: 1050}}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title d-flex align-items-center">
                    <User size={20} className="me-2" />
                    Contact Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <User size={16} className="text-primary" />
                        </div>
                        <div>
                          <label className="fw-bold text-muted small text-uppercase mb-1">Full Name</label>
                          <p className="mb-0 fs-6">{selectedContact.full_name}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                          <Phone size={16} className="text-success" />
                        </div>
                        <div>
                          <label className="fw-bold text-muted small text-uppercase mb-1">Mobile</label>
                          <p className="mb-0 fs-6">{selectedContact.mobile}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                          <MapPin size={16} className="text-info" />
                        </div>
                        <div>
                          <label className="fw-bold text-muted small text-uppercase mb-1">District</label>
                          <p className="mb-0 fs-6">{selectedContact.district}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                          <Calendar size={16} className="text-warning" />
                        </div>
                        <div>
                          <label className="fw-bold text-muted small text-uppercase mb-1">Submitted On</label>
                          <p className="mb-0 fs-6">{formatDate(selectedContact.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="d-flex align-items-start">
                        <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-3">
                          <MessageSquare size={16} className="text-secondary" />
                        </div>
                        <div className="flex-grow-1">
                          <label className="fw-bold text-muted small text-uppercase mb-2">Message</label>
                          <div className="bg-light rounded p-3">
                            <p className="mb-0">{selectedContact.message || 'No message provided'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShowModal(false);
                      handleDelete(selectedContact.id);
                    }}
                  >
                    <Trash2 size={16} className="me-1" />
                    Delete Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}