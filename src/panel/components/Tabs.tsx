import React from 'react';
import './Tabs.css';

interface TabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button 
        className={activeTab === 0 ? 'active' : ''} 
        onClick={() => setActiveTab(0)}
      >
        Tab 1
      </button>
      <button 
        className={activeTab === 1 ? 'active' : ''} 
        onClick={() => setActiveTab(1)}
      >
        Tab 2
      </button>
    </div>
  );
};

export default Tabs;