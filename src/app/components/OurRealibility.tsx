import React from 'react';
import Image from 'next/image';
import Globe from "../../assets/remaining/world.png"

const ReliabilitySection: React.FC = () => {
  const stats = [
    {
      value: '100,000+',
      label: 'Organizations supported around the world',
    },
    {
      value: '100%',
      label: 'NDAA Compliant device',
    },
    {
      value: '20+',
      label: 'Industries supported with versatile solutions',
    },
    {
      value: '1,000+',
      label: 'Knowledge-based articles on Support Community',
    },
  ];

  return (
    <section className="w-11/12 md:w-10/12 bg-white py-6 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-6">
    <span className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 bg-clip-text text-transparent">
    A continued legacy of quality and reliability
</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We're setting a new standard for security, safety and operational efficiency. From specialized
            CCTV cameras to smart sensors, Pelco helps you protect the most hazardous environments
            and complex systems.
          </p>
        </div>

        {/* Stats Grid with Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-start mb-3">
                  <div 
                    className="w-1 h-16 mr-4 flex-shrink-0"
                    style={{
                      background: 'linear-gradient(180deg, #2e5ac2 18%, #172d62 75.5%, #000000 100%)'
                    }}
                  ></div>
                  <div>
                    <h3 
                      className="font-bold text-gray-900 mb-2"
                      style={{ fontSize: '32px' }}
                    >
                      {stat.value}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Globe Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
              {/* Image container with globe overlay */}
              <div className="w-full h-full rounded-full overflow-hidden">
                {/* Using next/image for AVIF support */}
                <Image
                  src={Globe}
                  alt="World map globe"
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Connect with us link */}
        <div className="mt-4 lg:mt-2">
          <a
            href="#"
            className="inline-flex items-center font-semibold text-lg transition-colors group"
            style={{
              background: 'linear-gradient(180deg, #2e5ac2 18%, #172d62 75.5%, #000000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Connect with us
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                style={{
                  stroke: 'linear-gradient(180deg, #2e5ac2 18%, #172d62 75.5%, #000000 100%)'
                }}
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReliabilitySection;