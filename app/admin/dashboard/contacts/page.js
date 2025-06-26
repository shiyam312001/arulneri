'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Eye } from 'lucide-react';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

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

  return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Contact Submissions</h1>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">No Contact Submissions Found</h5>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>District</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.id}>
                    <td>{contact.full_name}</td>
                    <td>{contact.district}</td>
                    <td>{contact.mobile}</td>
                    <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => viewContact(contact.id)}
                        >
                          <Eye size={16} className="me-1" />
                          View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(contact.id)}
                        >
                          <Trash2 size={16} className="me-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Contact Modal */}
        {showModal && selectedContact && (
          <>
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
              onClick={() => setShowModal(false)}
            ></div>
            
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
                className="modal-dialog"
                style={{
                  maxWidth: '500px',
                  width: '100%',
                  margin: 0
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Contact Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="fw-bold">Full Name:</label>
                      <p>{selectedContact.full_name}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold">District:</label>
                      <p>{selectedContact.district}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold">Mobile:</label>
                      <p>{selectedContact.mobile}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold">Message:</label>
                      <p>{selectedContact.message}</p>
                    </div>
                    <div className="mb-3">
                      <label className="fw-bold">Submitted On:</label>
                      <p>{new Date(selectedContact.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
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