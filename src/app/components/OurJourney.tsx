import React, { useState } from 'react';

interface JourneyItem {
  day: number;
  status: 'completed' | 'inprogress' | 'upcoming';
  metadata: {
    title: string;
    subtitle: string;
    description: string;
    achievements: string[];
    impact: string;
  };
}

const JOURNEY_DATA: JourneyItem[] = [
  {
    day: 1,
    status: "completed",
    metadata: {
      title: "2010",
      subtitle: "Company Founded",
      description: "Our journey began with a small team and big dreams. We established our core values and mission to innovate in the technology sector.",
      achievements: [
        "Established headquarters in San Francisco",
        "Initial team of 5 passionate founders",
        "Secured $500K in seed funding",
        "Launched our first prototype product"
      ],
      impact: "Laid the foundation for what would become a transformative company in the industry, setting our vision for the future."
    }
  },
  {
    day: 2,
    status: "completed",
    metadata: {
      title: "2013",
      subtitle: "Market Expansion",
      description: "Expanded our market presence and product offerings, establishing ourselves as a serious contender in the industry.",
      achievements: [
        "Opened offices in New York and London",
        "Grew team to 50+ employees",
        "Acquired 100 enterprise clients",
        "Launched second-generation platform"
      ],
      impact: "Significantly increased our market share and established a strong foothold in international markets."
    }
  },
  {
    day: 3,
    status: "completed",
    metadata: {
      title: "2016",
      subtitle: "Industry Leadership",
      description: "Achieved industry recognition and leadership position through innovation and exceptional service delivery.",
      achievements: [
        "Reached $50M annual revenue",
        "Expanded to 5 new countries",
        "Launched AI-powered solutions",
        "Received 'Innovator of the Year' award"
      ],
      impact: "Solidified our position as an industry leader and set new standards for technological innovation."
    }
  },
  {
    day: 4,
    status: "completed",
    metadata: {
      title: "2019",
      subtitle: "Global Transformation",
      description: "Underwent a major global transformation, scaling operations and diversifying our product portfolio.",
      achievements: [
        "Reached 500+ employees globally",
        "Acquired two complementary companies",
        "Launched enterprise cloud platform",
        "Achieved 99.9% customer satisfaction rate"
      ],
      impact: "Transformed into a global powerhouse with diversified offerings and a strong international presence."
    }
  },
  {
    day: 5,
    status: "completed",
    metadata: {
      title: "2022",
      subtitle: "Sustainable Innovation",
      description: "Focused on sustainable innovation and responsible growth while expanding our market leadership.",
      achievements: [
        "Achieved carbon-neutral operations",
        "Launched sustainability initiatives",
        "Reached $200M annual revenue",
        "Expanded to 15+ countries worldwide"
      ],
      impact: "Demonstrated our commitment to sustainable business practices while continuing to drive innovation and growth."
    }
  },
  {
    day: 6,
    status: "upcoming",
    metadata: {
      title: "2025",
      subtitle: "Future Vision",
      description: "Preparing to launch next-generation solutions that will redefine our industry and shape the future of technology.",
      achievements: [
        "Developing quantum computing applications",
        "Expanding AI and machine learning capabilities",
        "Planning entry into emerging markets",
        "Building next-generation infrastructure"
      ],
      impact: "Poised to revolutionize the industry with groundbreaking technologies that will transform how businesses operate."
    }
  }
];

const TimelinePath: React.FC<{
  isTop?: boolean;
  startingPath?: boolean;
  stroke: string;
  width?: string;
}> = ({ isTop = false, startingPath = false, stroke, width = '100%' }) => {
  if (startingPath) {
    return (
      <svg width="176" height="79" viewBox="0 0 176 79" fill="none" style={{ display: 'block', width: '176px', height: '79px' }}>
        <path
          d="M170 0.5V7.13078C170 23.8428 156.344 37.333 139.633 37.1285L36.8669 35.8715C20.1562 35.667 6.5 49.1572 6.5 65.8692V79"
          stroke={stroke}
          strokeWidth="12"
        />
      </svg>
    );
  }

  if (isTop) {
    return (
      <svg width={width} height="87" viewBox="0 0 327 87" fill="none" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path
          d="M321 0.5V8.5C321 25.0685 307.569 38.5 291 38.5H36C19.4315 38.5 6  51.9315 6, 68.5V86.5"
          stroke={stroke}
          strokeWidth="12"
        />
      </svg>
    );
  }

  return (
    <svg width={width} height="86" viewBox="0 0 325 86" fill="none" preserveAspectRatio="none" style={{ display: 'block' }}>
      <path
        d="M6 0.5V11.0925C6 27.0726 18.9273 40.0413 34.9073 40.0924L290.093 40.9076C306.073 40.9587 319 53.9274 319 69.9075V86"
        stroke={stroke}
        strokeWidth="12"
      />
    </svg>
  );
};

const JourneyTimeline: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<JourneyItem | null>(JOURNEY_DATA[0]);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop view on initial render and window resize
  React.useEffect(() => {
    const checkIsDesktop = () => {
      // Only desktop view for screens >= 1366px (larger than iPad Pro)
      setIsDesktop(window.innerWidth >= 1366);
    };
    
    // Initial check
    checkIsDesktop();
    
    // Add event listener
    window.addEventListener('resize', checkIsDesktop);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const getPathColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#1e3a8a';
      case 'inprogress':
        return '#1e3a8a';
      case 'upcoming':
        return '#E0E0E0';
      default:
        return '#E0E0E0';
    }
  };

  const getDayBorderColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#1e3a8a';
      case 'inprogress':
        return '#1e40af';
      case 'upcoming':
        return '#BDBDBD';
      default:
        return '#BDBDBD';
    }
  };

  const getDayBgColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#1e3a8a';
      case 'inprogress':
        return '#1e40af';
      case 'upcoming':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getCardBgColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #1e40af 100%)';
      case 'inprogress':
        return 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #1e40af 100%)';
      case 'upcoming':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  // Toggle function for mobile view
  const toggleItem = (item: JourneyItem) => {
    if (selectedItem && selectedItem.day === item.day) {
      setSelectedItem(null); // Close if already open
    } else {
      setSelectedItem(item); // Open the clicked item
    }
  };

  // Mobile view - simplified vertical timeline (used for all non-desktop devices)
  if (!isDesktop) {
    return (
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        backgroundColor: '#FFFFFF',
        padding: '20px 15px 30px', 
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#1e3a8a', 
          fontSize: '24px', 
          fontWeight: '700',
          marginBottom: '20px', 
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Our Journey Timeline
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {JOURNEY_DATA.map((item, index) => (
            <div 
              key={`mobile-item-${index}`}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: selectedItem?.day === item.day ? '2px solid #1e3a8a' : '1px solid #e2e8f0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: selectedItem?.day === item.day ? 'scale(1.02)' : 'scale(1)',
                // Removed extra margin at the bottom of last item
                marginBottom: index === JOURNEY_DATA.length - 1 ? '0' : '0'
              }}
            >
              <button 
                onClick={() => toggleItem(item)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  background: getCardBgColor(item.status),
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${getDayBorderColor(item.status)}`,
                  marginRight: '15px',
                  flexShrink: 0
                }}>
                  <div style={{
                    borderRadius: '50%',
                    padding: '4px 6px',
                    backgroundColor: getDayBgColor(item.status)
                  }}>
                    <span style={{ 
                      color: 'white', 
                      fontWeight: '800', 
                      fontSize: '14px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      lineHeight: '1'
                    }}>
                      {item.day.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    color: 'white', 
                    fontWeight: '700', 
                    fontSize: '16px', 
                    margin: 0,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: '1.3'
                  }}>
                    {item.metadata.title}
                  </p>
                  <p style={{ 
                    color: 'white', 
                    fontSize: '13px', 
                    fontWeight: '600', 
                    margin: '2px 0 0 0',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: '1.3',
                    opacity: 0.95
                  }}>
                    {item.metadata.subtitle}
                  </p>
                </div>
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.3"/>
                  {/* Change arrow direction based on open state */}
                  <path 
                    d={selectedItem?.day === item.day ? "M14 8l-4 4 4 4" : "M10 8l4 4-4 4"} 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {selectedItem?.day === item.day && (
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '15px'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{ 
                      color: '#1e3a8a', 
                      fontSize: '14px', 
                      fontWeight: '700',
                      margin: '0 0 6px 0', 
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      Overview
                    </h3>
                    <p style={{ 
                      color: '#334155', 
                      fontSize: '14px', 
                      lineHeight: '1.5',
                      margin: 0,
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      {item.metadata.description}
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}> 
                    <h3 style={{ 
                      color: '#1e3a8a', 
                      fontSize: '14px', 
                      fontWeight: '700',
                      margin: '0 0 6px 0', 
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      Key Achievements
                    </h3>
                    <ul style={{ 
                      color: '#334155', 
                      fontSize: '14px', 
                      lineHeight: '1.5',
                      margin: 0,
                      paddingLeft: '18px',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      {item.metadata.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}> 
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}> 
                    <h3 style={{ 
                      color: '#1e3a8a', 
                      fontSize: '14px', 
                      fontWeight: '700',
                      margin: '0 0 6px 0', 
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      Impact
                    </h3>
                    <p style={{ 
                      color: '#334155', 
                      fontSize: '14px', 
                      lineHeight: '1.5',
                      margin: 0,
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      {item.metadata.impact}
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '5px' 
                  }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: item.status === 'completed' ? '#dcfce7' : 
                                      item.status === 'inprogress' ? '#dbeafe' : '#f1f5f9',
                      color: item.status === 'completed' ? '#166534' : 
                             item.status === 'inprogress' ? '#1d4ed8' : '#64748b'
                    }}>
                      {item.status === 'completed' ? 'Completed' : 
                       item.status === 'inprogress' ? 'In Progress' : 'Upcoming'}
                    </span>
                    
                    <button style={{
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      boxShadow: '0 2px 4px rgba(30, 64, 175, 0.3)'
                    }}>
                      Learn More
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view (original code unchanged)
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#1e3a8a', 
        fontSize: '28px', 
        fontWeight: '700',
        marginBottom: '30px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Our Journey Timeline
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flex: 1,
        gap: '30px'
      }}>
        {/* Timeline Section (7 parts) */}
        <div style={{ 
          flex: 7,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
            {JOURNEY_DATA.map((item, index) => (
              <div key={`timeline-${index}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Path connecting from previous item */}
                {index > 0 && (
                  <div style={{ 
                    width: '100%', 
                    marginTop: '-12px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {index % 2 === 0 ? (
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '75px' }}>
                        <TimelinePath isTop={false} stroke={getPathColor(JOURNEY_DATA[index - 1].status)} width="310px" />
                      </div>
                    ) : (
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '75px' }}>
                        <TimelinePath isTop={true} stroke={getPathColor(JOURNEY_DATA[index - 1].status)} width="310px" />
                      </div>
                    )}
                  </div>
                )}

                {/* Card and Day Badge Row */}
                <div style={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '15px',
                  marginTop: index === 0 ? '0' : '-24px',
                  position: 'relative',
                  zIndex: 10
                }}>
                  {/* Day Badge */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `5px solid ${getDayBorderColor(item.status)}`,
                    flexShrink: 0,
                    zIndex: 20
                  }}>
                    <div style={{
                      borderRadius: '50%',
                      padding: '6px 8px',
                      backgroundColor: getDayBgColor(item.status)
                    }}>
                      <span style={{ 
                        color: 'white', 
                        fontWeight: '800', 
                        fontSize: '18px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        lineHeight: '1'
                      }}>
                        {item.day.toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card */}
                  <button 
                    onClick={() => setSelectedItem(item)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingLeft: '20px',
                      paddingRight: '16px',
                      paddingTop: '18px',
                      paddingBottom: '18px',
                      borderRadius: '16px',
                      background: getCardBgColor(item.status),
                      border: 'none',
                      cursor: 'pointer',
                      maxWidth: '420px',
                      zIndex: 20,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      transform: selectedItem?.day === item.day ? 'scale(1.03)' : 'scale(1)',
                      boxShadow: selectedItem?.day === item.day ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <p style={{ 
                        color: 'white', 
                        fontWeight: '700', 
                        fontSize: '17px', 
                        margin: 0,
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        lineHeight: '1.3'
                      }}>
                        {item.metadata.title}
                      </p>
                      {item.metadata.subtitle && (
                        <p style={{ 
                          color: 'white', 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          margin: '4px 0 0 0',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          lineHeight: '1.3',
                          opacity: 0.95
                        }}>
                          {item.metadata.subtitle}
                        </p>
                      )}
                    </div>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginLeft: '12px' }}>
                      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.3"/>
                      <path d="M10 8l4 4-4 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Final ending path */}
                {index === JOURNEY_DATA.length - 1 && (
                  <div style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                    marginTop: '-12px',
                    paddingLeft: index % 2 === 0 ? '75px' : '0',
                    paddingRight: index % 2 === 0 ? '0' : '75px'
                  }}>
                    <TimelinePath startingPath={true} stroke={getPathColor(item.status)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Detail Card Section (5 parts) */}
        <div style={{ 
          flex: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {selectedItem && (
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `5px solid ${getDayBorderColor(selectedItem.status)}`,
                  marginRight: '20px'
                }}>
                  <div style={{
                    borderRadius: '50%',
                    padding: '8px 12px',
                    backgroundColor: getDayBgColor(selectedItem.status)
                  }}>
                    <span style={{ 
                      color: 'white', 
                      fontWeight: '800', 
                      fontSize: '22px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      lineHeight: '1'
                    }}>
                      {selectedItem.day.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h2 style={{ 
                    color: '#1e3a8a', 
                    fontSize: '26px', 
                    fontWeight: '700',
                    margin: '0 0 5px 0',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {selectedItem.metadata.title}
                  </h2>
                  <p style={{ 
                    color: '#475569', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    margin: 0,
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {selectedItem.metadata.subtitle}
                  </p>
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  color: '#1e3a8a', 
                  fontSize: '16px', 
                  fontWeight: '700',
                  margin: '0 0 10px 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Overview
                </h3>
                <p style={{ 
                  color: '#334155', 
                  fontSize: '16px', 
                  lineHeight: '1.6',
                  margin: 0,
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {selectedItem.metadata.description}
                </p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  color: '#1e3a8a', 
                  fontSize: '16px', 
                  fontWeight: '700',
                  margin: '0 0 10px 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Key Achievements
                </h3>
                <ul style={{ 
                  color: '#334155', 
                  fontSize: '16px', 
                  lineHeight: '1.6',
                  margin: 0,
                  paddingLeft: '20px',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {selectedItem.metadata.achievements.map((achievement, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  color: '#1e3a8a', 
                  fontSize: '16px', 
                  fontWeight: '700',
                  margin: '0 0 10px 0',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  Impact
                </h3>
                <p style={{ 
                  color: '#334155', 
                  fontSize: '16px', 
                  lineHeight: '1.6',
                  margin: 0,
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {selectedItem.metadata.impact}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto'
              }}>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: selectedItem.status === 'completed' ? '#dcfce7' : 
                                  selectedItem.status === 'inprogress' ? '#dbeafe' : '#f1f5f9',
                  color: selectedItem.status === 'completed' ? '#166534' : 
                         selectedItem.status === 'inprogress' ? '#1d4ed8' : '#64748b'
                }}>
                  {selectedItem.status === 'completed' ? 'Completed' : 
                   selectedItem.status === 'inprogress' ? 'In Progress' : 'Upcoming'}
                </span>
                
                <button style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  boxShadow: '0 4px 6px rgba(30, 64, 175, 0.3)'
                }}>
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;