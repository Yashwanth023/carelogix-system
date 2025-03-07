
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero section with enhanced visuals */}
        <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24 animate-fade-in">
                  <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-4">
                    HIPAA Compliant Healthcare System
                  </span>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-5xl lg:mt-6">
                    <span className="block">Modern healthcare</span>
                    <span className="block text-blue-500">management simplified</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg">
                    CareLogix combines intelligent patient management, doctor assignment, and healthcare analytics in one secure, easy-to-use platform that adapts to your workflow.
                  </p>
                  <div className="mt-10 sm:mt-12">
                    <div className="sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow hover-scale">
                        <Link
                          to="/register"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                        >
                          Get started free
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3 hover-scale">
                        <Link
                          to="/login"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                        >
                          Log in
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <div className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none hover-scale">
                    <img 
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:w-auto animate-fade-in"
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="Doctor using tablet for patient management"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="relative bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Trusted by healthcare professionals nationwide
              </h2>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                Our platform streamlines healthcare management while maintaining the highest standards of security and compliance.
              </p>
            </div>
          </div>
          <div className="mt-10 pb-12 sm:pb-16">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r animate-fade-in" style={{animationDelay: "0.1s"}}>
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Success Rate</dt>
                      <dd className="order-1 text-5xl font-extrabold text-blue-600">99.9%</dd>
                    </div>
                    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r animate-fade-in" style={{animationDelay: "0.2s"}}>
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Healthcare Providers</dt>
                      <dd className="order-1 text-5xl font-extrabold text-blue-600">4,000+</dd>
                    </div>
                    <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l animate-fade-in" style={{animationDelay: "0.3s"}}>
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Patient Records</dt>
                      <dd className="order-1 text-5xl font-extrabold text-blue-600">1M+</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section with improved visuals */}
        <div className="relative bg-white py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-blue-500 uppercase">Comprehensive Solutions</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Everything you need to manage healthcare
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              CareLogix provides a comprehensive suite of tools for healthcare providers and administrators.
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Patient Management',
                    description: 'Add, update, and manage patient records with ease. Track medical history and personal information.',
                    icon: (
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    ),
                    delay: "0.1s"
                  },
                  {
                    title: 'Doctor Directory',
                    description: 'Maintain a comprehensive directory of doctors with specializations and contact information.',
                    icon: (
                      <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                    ),
                    delay: "0.2s"
                  },
                  {
                    title: 'Patient-Doctor Assignments',
                    description: 'Easily assign patients to doctors and manage these relationships over time.',
                    icon: (
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    ),
                    delay: "0.3s"
                  },
                ].map((feature, index) => (
                  <div key={index} className="pt-6 animate-fade-in" style={{animationDelay: feature.delay}}>
                    <div className="flow-root bg-white rounded-lg shadow-sm px-6 pb-8 hover:shadow-md transition-all duration-300 hover-scale h-full">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              {feature.icon}
                            </svg>
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="bg-blue-50 py-16 sm:py-24">
          <div className="relative sm:py-16">
            <div aria-hidden="true" className="hidden sm:block">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-r-3xl"></div>
              <svg className="absolute top-8 left-1/2 -ml-3" width="404" height="392" fill="none" viewBox="0 0 404 392">
                <defs>
                  <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-blue-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
              </svg>
            </div>
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative rounded-2xl px-6 py-10 bg-blue-500 overflow-hidden shadow-xl sm:px-12 sm:py-20 animate-fade-in">
                <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                    <path className="text-blue-400 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                    <path className="text-blue-600 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="sm:text-center">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                      Join thousands of healthcare providers today
                    </h2>
                    <p className="mt-6 mx-auto max-w-2xl text-lg text-blue-100">
                      Experience the most comprehensive healthcare management platform designed specifically for modern medical practices.
                    </p>
                  </div>
                  <div className="mt-12 sm:mx-auto sm:max-w-lg sm:flex sm:justify-center">
                    <div className="mt-4 sm:mt-0 hover-scale">
                      <Link
                        to="/register"
                        className="block w-full rounded-md border border-transparent px-5 py-3 bg-white text-base font-medium text-blue-600 shadow hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 sm:px-10 transition-all duration-200"
                      >
                        Start your free trial
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
