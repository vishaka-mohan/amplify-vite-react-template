import React, { useState } from 'react';

interface NotebookProps {
  content: string[];
}

const Notebook: React.FC<NotebookProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotebook = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="notebook-container">
      {!isOpen && (
        <button className="notebook-icon" onClick={toggleNotebook}>
          📝 Notebook
        </button>
      )}
      {isOpen && (
        <div className="notebook">
          <button className="close-button" onClick={toggleNotebook}>
            x
          </button>
          <div className="notebook-content">
            {content.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notebook;
