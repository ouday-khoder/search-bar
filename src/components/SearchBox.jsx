import React, { useState } from 'react';
import classes from './SearchBox.module.css';
const ARRAY = [
    { id: "01", name: "understanding the difference between grid-template and grid-auto" },
    { id: "02", name: "recreating the github contribution graph with CSS grid layout" },
    { id: "03", name: "testing 03" }
  ];


const SearchBox = () => {
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
            <span key={lastIndex} className={classes.highlight}>
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
    <div className={classes.container}>
      <input
        type='search'
        placeholder='Type for Search'
        onChange={searchChangeHandler}
        className={classes.input}
      />

      <div>
        {ARRAY &&
          ARRAY
            .filter(val =>
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(data => (
              <div key={data.id}>
                <ul>
                    <li><h2>{getHighlightedText(data.name, searchTerm)}</h2></li>
                </ul>
                
              </div>
            ))}
      </div>
    </div>
    )
}

export default SearchBox;