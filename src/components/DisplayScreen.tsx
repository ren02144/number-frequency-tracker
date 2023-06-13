import React from 'react';
import './DisplayScreen.css';

interface DisplayScreenProps {
  lines: string[];
}

const DisplayScreen: React.FC<DisplayScreenProps> = ({
  lines,
}) => {

  return (
    <div className="display-screen">
      <h2>Display Screen</h2>
      {lines.map((line, index) => (
        <p className="display-line" key={index}>{line}</p>
      ))}
    </div>
  );
};

export default DisplayScreen;
