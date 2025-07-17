import { useState } from 'react';
import './css/modeToggle.css';

function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <button 
      onClick={toggleMode} 
      className={`mode-toggle ${isDarkMode ? 'dark' : 'light'}`}
      title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDarkMode ? '🌞' : '🌙' }
    </button>
  );
}

export default ModeToggle;
