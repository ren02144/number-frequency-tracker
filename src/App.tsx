import React, { useState, useEffect, useRef } from 'react';
import ControlPanel from './components/ControlPanel';
import DisplayScreen from './components/DisplayScreen';
import { isFibonacciNumber } from './utils/isFibonacciNumber';
import './App.css';

const App: React.FC = () => {
  const [numberFrequency, setNumberFrequency] = useState<{ [key: string]: number }>({});
  const [intervalSeconds, setIntervalSeconds] = useState(1);
  const [lines, setLines] = useState<string[]>([]);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [shouldQuit, setShouldQuit] = useState(false);

  const handleNumberConfirm = (number: string) => {
    setNumberFrequency((prevFrequency) => ({
      ...prevFrequency,
      [number]: (prevFrequency[number] || 0) + 1,
    }));

    const numberInt = parseInt(number, 10);
    if (isFibonacciNumber(numberInt)) {
      setLines((prevLines) => [...prevLines, 'FIB']);
    }
  };

  const handlePauseTimer = () => {
    setIsTimerPaused(true);
  };

  const handleResumeTimer = () => {
    setIsTimerPaused(false);
  };

  const handleQuit = () => {
    const sortedNumberFrequency = Object.entries(numberFrequency).sort(
      ([numberA, frequencyA], [numberB, frequencyB]) => frequencyB - frequencyA
    ); //TODO: Split sort as single function in utils
    const newLine = sortedNumberFrequency
      .map(([number, frequency]) => `${number}: ${frequency}`)
      .join(', ');
    setLines((prevLines: string[]) => [...prevLines, newLine, 'Thanks for playing']);
    setShouldQuit(true);
  };

  //create a timer to hold time interval
  const timer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!isTimerPaused && intervalSeconds > 0 && !shouldQuit) {
      //sort number by frequency
      timer.current = setInterval(() => {
        const sortedNumberFrequency = Object.entries(numberFrequency).sort(
          ([numberA, frequencyA], [numberB, frequencyB]) => frequencyB - frequencyA
        );

      //construct all number and frqquency to be a single string
      const newLine = sortedNumberFrequency
        .map(([number, frequency]) => `${number}: ${frequency}`)
        .join(', ');

      setLines((prevLines: string[]) => [...prevLines, newLine]);
      }, intervalSeconds * 1000);
    } else {
      if (timer.current) {
        clearInterval(timer.current);
      }
      timer.current = null;
    }
    //clear time interval if number and frequency updated
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, [numberFrequency, intervalSeconds, isTimerPaused, shouldQuit, setLines]);
  //TODO: find a way to avoid dependency change refresh time interval

  return (
    <div className="app-container">
      <DisplayScreen lines={lines} />
      <ControlPanel
        handleNumberConfirm={handleNumberConfirm}
        intervalSeconds={intervalSeconds}
        setIntervalSeconds={setIntervalSeconds}
        isTimerPaused={isTimerPaused}
        pauseTimer={handlePauseTimer}
        resumeTimer={handleResumeTimer}
        handleQuit={handleQuit}
      />
    </div>
  );
};

export default App;