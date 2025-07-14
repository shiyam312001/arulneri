'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const { admin, logout } = useAuth();
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalContacts: 0,
    activePrograms: 0,
    recentContacts: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
useEffect(() => {
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');

  if (header) header.style.display = 'none';
  if (footer) footer.style.display = 'none';

  return () => {
    // Restore visibility when component unmounts
    if (header) header.style.display = '';
    if (footer) footer.style.display = '';
  };
}, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch programs
      const programsResponse = await fetch('/api/admin/programs', {
        credentials: 'include'
      });
      if (programsResponse.ok) {
        const programsData = await programsResponse.json();
        const programsList = Array.isArray(programsData.programs) ? programsData.programs : [];
        setPrograms(programsList);
        
        // Calculate program stats
        const activePrograms = programsList.filter(p => p.status === 'Active').length;
        
        setStats(prev => ({
          ...prev,
          totalPrograms: programsList.length,
          activePrograms: activePrograms
        }));
      }

      // Fetch contacts
      const contactsResponse = await fetch('/api/contacts', {
        credentials: 'include'
      });
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json();
        const contactsList = Array.isArray(contactsData.contacts) ? contactsData.contacts : [];
        setContacts(contactsList);
        
        // Calculate contact stats
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const recentContacts = contactsList.filter(c => 
          new Date(c.created_at) >= sevenDaysAgo
        ).length;
        
        setStats(prev => ({
          ...prev,
          totalContacts: contactsList.length,
          recentContacts: recentContacts
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, color, subtitle }) => (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className={`rounded-circle d-flex align-items-center justify-content-center me-3`} 
                 style={{width: 60, height: 60, backgroundColor: `var(--bs-${color})`, color: 'white'}}>
              <i className={`bi ${icon} fs-4`}></i>
            </div>
            <div className="flex-grow-1">
              <div className={`text-${color} fw-bold fs-2 mb-0`}>{value}</div>
              <div className="text-muted small">{title}</div>
              {subtitle && <div className="text-success small">{subtitle}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0 fw-bold">Recent Activity</h5>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {contacts.slice(0, 5).map((contact, index) => (
            <div key={contact.id} className="list-group-item border-0 py-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: 40, height: 40}}>
                  <i className="bi bi-person fs-6"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{contact.full_name}</div>
                  <div className="text-muted small">New contact submission from {contact.district}</div>
                </div>
                <div className="text-muted small">
                  {new Date(contact.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0 fw-bold">Quick Actions</h5>
      </div>
      <div className="card-body">
        <div className="d-grid gap-2">
          <button 
            className="btn btn-outline-primary d-flex align-items-center justify-content-start"
            onClick={() => router.push('/admin/dashboard/programs')}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add New Program
          </button>
          <button 
            className="btn btn-outline-success d-flex align-items-center justify-content-start"
            onClick={() => router.push('/admin/dashboard/contacts')}
          >
            <i className="bi bi-eye me-2"></i>
            View All Contacts
          </button>
          <button 
            className="btn btn-outline-info d-flex align-items-center justify-content-start"
            onClick={() => fetchDashboardData()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );

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
                      className={`nav-link text-dark d-flex align-items-center py-2 border-0 bg-transparent w-100 text-start ${activeTab === 'dashboard' ? 'bg-primary text-white rounded' : ''}`}
                      onClick={() => setActiveTab('dashboard')}
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
                    onClick={() => setActiveTab('dashboard')}
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
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
                  <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="text-muted">Loading dashboard data...</div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Page Header */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h1 className="h3 mb-0 fw-bold">Dashboard Overview</h1>
                      <p className="text-muted mb-0">Welcome back, {admin?.username}!</p>
                    </div>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={fetchDashboardData}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Refresh
                    </button>
                  </div>

                  {/* Statistics Cards */}
                  <div className="row mb-4">
                    <StatCard 
                      icon="bi-list-task" 
                      title="Total Programs" 
                      value={stats.totalPrograms} 
                      color="primary"
                      subtitle={`${stats.activePrograms} active`}
                    />
                    <StatCard 
                      icon="bi-person-lines-fill" 
                      title="Total Contacts" 
                      value={stats.totalContacts} 
                      color="success"
                      subtitle={`${stats.recentContacts} this week`}
                    />
                    <StatCard 
                      icon="bi-check-circle" 
                      title="Active Programs" 
                      value={stats.activePrograms} 
                      color="info"
                    />
                    <StatCard 
                      icon="bi-clock-history" 
                      title="Recent Contacts" 
                      value={stats.recentContacts} 
                      color="warning"
                      subtitle="Last 7 days"
                    />
                  </div>

                  {/* Content Grid */}
                  <div className="row">
                    {/* Recent Programs */}
                    <div className="col-lg-4 mb-4">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 fw-bold">Recent Programs</h5>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => router.push('/admin/dashboard/programs')}
                          >
                            View All
                          </button>
                        </div>
                        <div className="card-body p-0">
                          {programs.length === 0 ? (
                            <div className="text-center py-4">
                              <i className="bi bi-list-task text-muted" style={{fontSize: '2rem'}}></i>
                              <div className="text-muted mt-2">No programs yet</div>
                            </div>
                          ) : (
                            <div className="list-group list-group-flush">
                              {programs.slice(0, 5).map(program => (
                                <div key={program.id} className="list-group-item border-0 py-3">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                      <div className="fw-semibold">{program.title}</div>
                                      <div className="text-muted small">
                                        <i className="bi bi-geo-alt me-1"></i>
                                        {program.location}
                                      </div>
                                    </div>
                                    <span className={`badge ${program.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                      {program.status || 'Active'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="col-lg-5 mb-4">
                      <RecentActivity />
                    </div>

                    {/* Quick Actions */}
                    <div className="col-lg-3 mb-4">
                      <QuickActions />
                    </div>
                  </div>

                  {/* Recent Contacts Table */}
                  {contacts.length > 0 && (
                    <div className="card border-0 shadow-sm">
                      <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold">Latest Contact Submissions</h5>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => router.push('/admin/dashboard/contacts')}
                        >
                          View All Contacts
                        </button>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                              <tr>
                                <th className="border-0">Name</th>
                                <th className="border-0">District</th>
                                <th className="border-0">Mobile</th>
                                <th className="border-0">Date</th>
                                <th className="border-0">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contacts.slice(0, 5).map(contact => (
                                <tr key={contact.id}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                                           style={{width: 32, height: 32}}>
                                        {contact.full_name.charAt(0).toUpperCase()}
                                      </div>
                                      {contact.full_name}
                                    </div>
                                  </td>
                                  <td>{contact.district}</td>
                                  <td>{contact.mobile}</td>
                                  <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                                  <td>
                                    <button 
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => router.push('/admin/dashboard/contacts')}
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;