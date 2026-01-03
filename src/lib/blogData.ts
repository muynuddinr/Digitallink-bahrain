// lib/blogData.ts or data/blogData.ts

import webImage from '@/assets/Building.jpg';

export interface BlogData {
  id: number;
  title: string;
  slug: string;
  category: string;
  cardImage: any;
  intro: string;
  description: string;
  fullContent: string;
  author: string;
  readingTime: number;
  publishDate: Date;
}

export const blogsData: BlogData[] = [
  {
    id: 1,
    title: "Home Security Solutions",
    slug: "home-security-solutions",
    category: "Residential",
    cardImage: webImage,
    intro: "Comprehensive security systems designed to protect your home and family with 24/7 monitoring and advanced surveillance technology.",
    description: "Discover how modern home security solutions are revolutionizing residential safety with cutting-edge technology and intelligent monitoring systems. Our comprehensive approach ensures your family's protection around the clock.",
    fullContent: `
      <h3>Protecting What Matters Most</h3>
      <p>Your home is your sanctuary, and protecting it should be a top priority. Modern home security solutions have evolved far beyond simple alarm systems. Today's residential security integrates smart technology, artificial intelligence, and cloud-based monitoring to provide comprehensive protection for your family and property.</p>

      <h3>Advanced Surveillance Technology</h3>
      <p>Our home security systems feature high-definition cameras with night vision capabilities, ensuring clear footage regardless of lighting conditions. Motion detection technology alerts you to any unusual activity, while smart sensors monitor doors, windows, and other entry points throughout your home.</p>

      <h3>24/7 Professional Monitoring</h3>
      <p>With round-the-clock monitoring services, you can rest easy knowing that trained professionals are always watching over your home. Our monitoring centers respond immediately to any alerts, contacting emergency services when necessary and keeping you informed every step of the way.</p>

      <h3>Smart Home Integration</h3>
      <p>Modern home security seamlessly integrates with your smart home ecosystem. Control your security system, view camera feeds, and receive alerts directly on your smartphone. Automation features allow you to set schedules, create custom rules, and even integrate with voice assistants for hands-free control.</p>

      <h3>Deterrent Effect</h3>
      <p>Visible security cameras and alarm system signage serve as powerful deterrents to potential intruders. Studies show that homes with visible security systems are significantly less likely to be targeted by burglars.</p>

      <h3>Peace of Mind</h3>
      <p>Perhaps the greatest benefit of a comprehensive home security solution is the peace of mind it provides. Whether you're at work, on vacation, or sleeping soundly at night, you can trust that your home and family are protected by state-of-the-art security technology.</p>

      <h3>Customized Solutions</h3>
      <p>Every home is unique, and your security solution should be too. Our team works with you to assess your specific needs and design a customized security system that provides optimal coverage for your property. From single-family homes to large estates, we have the expertise to protect what matters most to you.</p>
    `,
    author: "Security Expert Team",
    readingTime: 8,
    publishDate: new Date('2024-10-15')
  },
  {
    id: 2,
    title: "Business Security Solutions",
    slug: "business-security-solutions",
    category: "Commercial",
    cardImage: webImage,
    intro: "Advanced surveillance systems tailored for businesses of all sizes with AI-powered analytics and real-time monitoring capabilities.",
    description: "Explore enterprise-grade security solutions designed to protect your business assets, employees, and customers. Our AI-powered systems provide intelligent threat detection and comprehensive monitoring for commercial environments.",
    fullContent: `
      <h3>Securing Your Business Investment</h3>
      <p>In today's competitive business landscape, security is not just about preventing theft—it's about protecting your entire operation. Our business security solutions provide comprehensive protection for your assets, employees, and customers while helping you maintain operational efficiency and regulatory compliance.</p>

      <h3>AI-Powered Analytics</h3>
      <p>Harness the power of artificial intelligence to transform your security system from reactive to proactive. Our AI-powered analytics can detect unusual patterns, identify potential threats before they escalate, and provide valuable business intelligence. Features include people counting, heat mapping, and behavior analysis to help optimize your operations.</p>

      <h3>Access Control Systems</h3>
      <p>Control who enters your premises and when with sophisticated access control systems. From basic keycard systems to advanced biometric solutions, we offer scalable access control that grows with your business. Track employee attendance, restrict access to sensitive areas, and maintain detailed audit logs for compliance purposes.</p>

      <h3>Video Management Systems</h3>
      <p>Our enterprise-grade video management systems (VMS) provide centralized control over your entire surveillance infrastructure. Manage multiple locations from a single interface, access footage remotely, and utilize powerful search features to quickly find specific events or individuals.</p>

      <h3>Retail Loss Prevention</h3>
      <p>For retail businesses, our specialized solutions help prevent shoplifting, employee theft, and organized retail crime. Point-of-sale integration allows you to correlate transactions with video footage, while AI analytics can identify suspicious behavior patterns.</p>

      <h3>Workplace Safety</h3>
      <p>Beyond security, our systems contribute to workplace safety by monitoring for hazards, ensuring compliance with safety protocols, and providing evidence in case of workplace incidents. Integration with emergency systems ensures rapid response to fires, medical emergencies, or other critical situations.</p>

      <h3>Scalable Infrastructure</h3>
      <p>Whether you're a small startup or a large enterprise, our solutions scale to meet your needs. Cloud-based options provide flexibility and reduce upfront costs, while hybrid systems offer the best of both on-premise and cloud technologies.</p>

      <h3>Regulatory Compliance</h3>
      <p>Many industries face strict security and data protection regulations. Our solutions are designed with compliance in mind, helping you meet requirements for data retention, access control, and audit trails across various regulatory frameworks.</p>
    `,
    author: "Commercial Security Team",
    readingTime: 10,
    publishDate: new Date('2024-10-18')
  },
  {
    id: 3,
    title: "Industrial Security Solutions",
    slug: "industrial-security-solutions",
    category: "Industrial",
    cardImage: webImage,
    intro: "Robust surveillance systems designed for harsh industrial environments and large facilities with enhanced durability and coverage.",
    description: "Learn about specialized security solutions built to withstand harsh industrial conditions while providing comprehensive monitoring for large-scale facilities, warehouses, and manufacturing plants.",
    fullContent: `
      <h3>Built for Demanding Environments</h3>
      <p>Industrial facilities face unique security challenges that require specialized solutions. From extreme temperatures and harsh weather conditions to vast areas requiring coverage, our industrial security systems are engineered to perform reliably in the most demanding environments.</p>

      <h3>Ruggedized Equipment</h3>
      <p>Our industrial-grade cameras and sensors are built to withstand extreme conditions including temperature fluctuations, dust, moisture, and vibration. IP67 and IP68 rated equipment ensures reliable operation in harsh environments, while explosion-proof housings meet safety requirements for hazardous locations.</p>

      <h3>Perimeter Protection</h3>
      <p>Securing large industrial sites requires comprehensive perimeter protection. Our solutions include thermal imaging cameras for detecting intruders in complete darkness, radar systems for wide-area coverage, and intelligent fence-mounted sensors that distinguish between genuine threats and false alarms caused by animals or weather.</p>

      <h3>Critical Infrastructure Protection</h3>
      <p>Protect vital infrastructure and assets with multi-layered security systems. Monitor critical areas such as control rooms, electrical substations, and hazardous material storage with redundant systems that ensure continuous operation even if primary systems fail.</p>

      <h3>Warehouse and Logistics Security</h3>
      <p>For warehouses and distribution centers, our solutions help prevent theft, monitor loading docks, and track the movement of goods throughout your facility. Integration with inventory management systems provides real-time visibility into your supply chain.</p>

      <h3>Safety Monitoring</h3>
      <p>Industrial security systems play a crucial role in workplace safety. Monitor for safety violations, detect unauthorized access to restricted areas, and ensure compliance with safety protocols. AI-powered analytics can identify if workers are wearing proper personal protective equipment (PPE).</p>

      <h3>Long-Range Surveillance</h3>
      <p>Cover vast industrial sites with PTZ (pan-tilt-zoom) cameras offering incredible zoom capabilities and long-range thermal imaging. Automated patrol patterns ensure comprehensive coverage while reducing the need for physical security patrols.</p>

      <h3>Integration with Industrial Systems</h3>
      <p>Our security solutions integrate seamlessly with industrial control systems (ICS), building management systems (BMS), and other operational technology. This integration enables coordinated responses to security events and provides a holistic view of your facility's security posture.</p>

      <h3>Minimal Downtime</h3>
      <p>We understand that downtime is costly in industrial operations. Our systems are designed for high reliability with redundant components, automatic failover capabilities, and remote diagnostic tools that enable quick resolution of any issues.</p>
    `,
    author: "Industrial Solutions Team",
    readingTime: 9,
    publishDate: new Date('2024-10-20')
  },
  {
    id: 4,
    title: "Smart City Solutions",
    slug: "smart-city-solutions",
    category: "Municipal",
    cardImage: webImage,
    intro: "Integrated security systems for smart city initiatives and urban surveillance, ensuring public safety and efficient monitoring.",
    description: "Understand how integrated security systems are transforming urban environments through smart city initiatives, enhancing public safety, traffic management, and emergency response capabilities.",
    fullContent: `
      <h3>Building Safer, Smarter Cities</h3>
      <p>Smart cities leverage technology to improve quality of life for residents while enhancing public safety and operational efficiency. Our smart city solutions integrate advanced surveillance, analytics, and communication systems to create safer, more responsive urban environments.</p>

      <h3>City-Wide Surveillance Networks</h3>
      <p>Deploy comprehensive surveillance networks that cover public spaces, transportation hubs, and critical infrastructure. Our scalable architecture supports thousands of cameras while maintaining centralized management and ensuring data security and privacy compliance.</p>

      <h3>Intelligent Traffic Management</h3>
      <p>Reduce congestion and improve traffic flow with AI-powered traffic monitoring systems. Automatically detect incidents, monitor traffic patterns, and provide real-time data to optimize signal timing and route planning. Integration with emergency services enables faster response times during critical incidents.</p>

      <h3>Public Safety Analytics</h3>
      <p>Advanced analytics help law enforcement agencies respond more effectively to public safety challenges. Facial recognition technology can help locate missing persons, while crowd analysis tools help manage large public events safely. License plate recognition systems assist in locating stolen vehicles and tracking vehicles of interest.</p>

      <h3>Emergency Response Integration</h3>
      <p>Our solutions integrate with emergency services to provide real-time situational awareness during incidents. First responders can access relevant camera feeds, receive alerts about hazardous situations, and coordinate their response more effectively.</p>

      <h3>Environmental Monitoring</h3>
      <p>Beyond security, smart city systems can monitor environmental conditions including air quality, noise levels, and weather patterns. This data helps city planners make informed decisions and alerts residents to potential hazards.</p>

      <h3>Smart Parking Solutions</h3>
      <p>Reduce traffic congestion and improve the parking experience with smart parking systems that detect available spaces and guide drivers to open spots. This reduces time spent searching for parking and lowers vehicle emissions in urban areas.</p>

      <h3>Privacy and Compliance</h3>
      <p>We understand the importance of balancing public safety with individual privacy rights. Our solutions include privacy protection features, comply with data protection regulations, and incorporate transparent policies for data retention and access.</p>

      <h3>Scalable Architecture</h3>
      <p>Smart city deployments often begin with pilot programs and expand over time. Our modular architecture allows cities to start small and scale gradually, adding new capabilities and coverage areas as budgets allow and value is demonstrated.</p>

      <h3>Data-Driven Decision Making</h3>
      <p>Transform raw surveillance data into actionable intelligence. Our analytics platforms provide city planners and administrators with insights into urban patterns, helping them make data-driven decisions about infrastructure investment, resource allocation, and policy development.</p>
    `,
    author: "Smart City Solutions Team",
    readingTime: 11,
    publishDate: new Date('2024-10-22')
  }
];

// Helper functions
export function getBlogBySlug(slug: string): BlogData | undefined {
  return blogsData.find(blog => blog.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, limit: number = 3): BlogData[] {
  return blogsData
    .filter(blog => blog.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

export function getAllBlogSlugs(): string[] {
  return blogsData.map(blog => blog.slug);
}