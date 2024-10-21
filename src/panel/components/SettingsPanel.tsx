import React from 'react';
import './SettingsPanel.css';

interface SettingsPanelProps {
  isOpen: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen }) => {
  return (
    <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
        <div id="settings-content" className={`${isOpen ? 'settings_visible' : 'settings_hidden'}`}>Settings content</div>
    </div>
  );
};

export default SettingsPanel;