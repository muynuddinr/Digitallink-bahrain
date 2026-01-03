'use client';

import { useEffect, useState } from 'react';

interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  status: 'new' | 'contacted' | 'resolved';
}

export default function ContactEnquiryPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/contact-enquiries');
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/contact-enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchEnquiries();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      await fetch(`/api/admin/contact-enquiries/${id}`, {
        method: 'DELETE',
      });
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
    }
  };

  const filteredEnquiries = filter === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Enquiries</h1>
          <p className="text-gray-600 mt-1">Manage customer enquiries and messages</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Total: {enquiries.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'contacted', 'resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== 'all' && ` (${enquiries.filter(e => e.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredEnquiries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600">No enquiries found</p>
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                onClick={() => setSelectedEnquiry(enquiry)}
                className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition hover:shadow-lg ${
                  selectedEnquiry?.id === enquiry.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{enquiry.name}</h3>
                    <p className="text-sm text-gray-600">{enquiry.email}</p>
                    <p className="text-sm text-gray-600">{enquiry.phone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(enquiry.status)}`}>
                    {enquiry.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm line-clamp-2 mb-3">{enquiry.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(enquiry.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Detail View */}
        <div className="lg:sticky lg:top-24 h-fit">
          {selectedEnquiry ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Enquiry Details</h2>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900 font-semibold">{selectedEnquiry.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{selectedEnquiry.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{selectedEnquiry.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Message</label>
                  <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedEnquiry.message}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Received At</label>
                  <p className="text-gray-900">
                    {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">Status</label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-center"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={() => deleteEnquiry(selectedEnquiry.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p className="text-gray-600">Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
