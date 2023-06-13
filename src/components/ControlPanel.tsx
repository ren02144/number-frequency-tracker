import React, { useState } from 'react';
import './ControlPanel.css';

interface ControlPanelProps {
  handleNumberConfirm: (number: string) => void;
  intervalSeconds: number;
  setIntervalSeconds: (seconds: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  isTimerPaused: boolean;
  handleQuit: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  handleNumberConfirm,
  intervalSeconds,
  setIntervalSeconds,
  pauseTimer,
  resumeTimer,
  isTimerPaused,
  handleQuit,
}) => {
  const [numberInput, setNumberInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
  };

  const handleConfirm = () => {
    if(numberInput.length){
      handleNumberConfirm(numberInput);
    }
    setNumberInput('');
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seconds = parseInt(event.target.value, 10);
    setIntervalSeconds(seconds);
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <div>
        <label htmlFor="intervalInput">Interval (seconds):</label>
        <input
          type="number"
          id="intervalInput"
          value={intervalSeconds}
          onChange={handleIntervalChange}
        />
      </div>
      <div>
        <label htmlFor="numberInput">Number Input:</label>
        <input
          type="number"
          id="numberInput"
          value={numberInput}
          onChange={handleInputChange}
        />
        <button onClick={handleConfirm}>Confirm</button>
      </div>
      <button onClick={pauseTimer} disabled={isTimerPaused}>
        Halt
      </button>
      <button onClick={resumeTimer} disabled={!isTimerPaused}>
        Resume
      </button>
      <button onClick={handleQuit}>
        Quit
      </button>
    </div>
  );
};

export default ControlPanel;
