import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const getQuote = async () => {
        const response = await axios.get('https://api.quotable.io/random');
        setQuote(response.data.content);
        setAuthor(response.data.author);
    };

    useEffect(() => {
        getQuote();
    }, []);

    const searchQuotes = async () => {
        const response = await axios.get(`https://api.quotable.io/quotes?author=${search}`);
        setSearchResults(response.data.results);
    };

    return (
        <div className="app">
            <h1>Quotes</h1>
            <h2>Quote of the Day</h2>
            <button onClick={getQuote}>Get Quote</button>
            <p className="quote">{quote}</p>
            <p className="author">-{author}</p>
    
            <h2>Search Quotes</h2>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Author name" />
            <button onClick={searchQuotes}>Search</button>
            {searchResults.map((quote, index) => (
                <p key={index} className="quote">{quote.content}</p>
            ))}
        </div>
    );
}

export default App;
