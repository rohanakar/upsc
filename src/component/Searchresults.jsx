import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
