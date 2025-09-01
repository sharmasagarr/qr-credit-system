import { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

const AdminServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'business-card',
      title: 'Business Card',
      description: 'Professional business card design and printing services',
      features: [
        'Premium quality materials',
        'Custom designs',
        'Fast turnaround',
        'Multiple finishing options'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      )
    },
    {
      id: 'prescription',
      title: 'Prescription',
      description: 'Digital prescription management and printing',
      features: [
        'Secure digital storage',
        'Easy refill management',
        'Professional formatting',
        'HIPAA compliant'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ];

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Manage QR Codes</h2>
            <p className="text-sm sm:text-md text-gray-500 mt-1">View and manage all your QR codes</p>
          </div>
          
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`relative rounded-xl border-2 p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${selectedService === service.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}
            >
              {selectedService === service.id && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-indigo-500 text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center mb-4 text-indigo-500">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-center mb-4">
                  {service.description}
                </p>
                
                <ul className="mt-2 space-y-2 flex-grow">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 text-center">
                  <button
                    className={`px-6 py-2 rounded-lg font-medium ${selectedService === service.id ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {selectedService === service.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="mt-10 text-center">
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg">
              Continue with {services.find(s => s.id === selectedService)?.title}
            </button>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminServices;