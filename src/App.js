import React, { useState } from 'react';

const ARRAY = [
  { id: "01", name: "understanding the difference between grid-template and grid-auto" },
  { id: "02", name: "recreating grid with the github contribution" },
  { id: "03", name: "03" }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchChangeHandler = e => {
    setSearchTerm(e.target.value);
  };

  const getHighlightedText = (text, highlight) => {
    
    if (!highlight.trim()) {
      return text;
    }

    const parts = text.toLowerCase().split(highlight.toLowerCase());
    const highlightedParts = [];

    let lastIndex = 0;
    parts.forEach((part, index) => {
      if (index > 0) {
        const originalHighlight = text.substr(lastIndex, highlight.length);
        highlightedParts.push(
          <span key={lastIndex} className="highlight">
            {originalHighlight}
          </span>
        );
        lastIndex += highlight.length;
      }
      highlightedParts.push(<span key={lastIndex}>{text.substr(lastIndex, part.length)}</span>);
      lastIndex += part.length;
    });

    return highlightedParts;
  };

  return (
    <div className="App">
      <input
        type='search'
        placeholder='Type for Search'
        onChange={searchChangeHandler}
      />

      <div>
        {ARRAY &&
          ARRAY
            .filter(val =>
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((data, indx) => (
              <div key={data.id}>
                <h2>{getHighlightedText(data.name, searchTerm)}</h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default App;
