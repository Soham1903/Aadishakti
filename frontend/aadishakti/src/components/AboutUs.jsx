import React, { useState } from 'react';
import Hero from './about/Hero';
import TabNavigation from './about/TabNavigation';
import AboutOrganization from './about/AboutOrganization';
import AboutFounder from './about/AboutFounder';
import EventsInitiatives from './about/EventsInitiatives';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('organization');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'organization':
        return <AboutOrganization />;
      case 'founder':
        return <AboutFounder />;
      case 'events':
        return <EventsInitiatives />;
      default:
        return <AboutOrganization />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87161a]/5 via-[#87161a]/10 to-[#87161a]/5">
      <Hero />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto px-4 py-12">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AboutUs;