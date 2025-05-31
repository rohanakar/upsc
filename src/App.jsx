import React, { useState } from 'react';
import SearchBar from './component/Searchbar';
import Answer from './component/Answer';
import Loader from './component/Loader';
import { fetchSearchResults } from './api/mockApi';
import './App.css';
const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlResult, setHtmlResult] = useState("");
  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const result = await fetchSearchResults(query,setHtmlResult);
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>What can I help with?</h1>      
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />      
      {htmlResult && <Answer loading={loading} htmlResult={htmlResult} />}

    </div>
  );
};

export default App;
