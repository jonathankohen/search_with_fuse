import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Search from './components/Search.jsx';
import Display from './components/Display.jsx';

const SW_URL = 'https://swapi.dev/api';

function App() {
    const [loading, setLoading] = useState(true),
        [people, setPeople] = useState([]),
        [query, setQuery] = useState('');

    useEffect(() => {
        axios
            .get(`${SW_URL}/people/`)
            .then(res => {
                setPeople(res.data.results);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const fuse = new Fuse(people, {
        keys: ['name', 'eye_color'],
    });

    const matches = fuse.search(query);

    return (
        <div className="App">
            <Search
                onChange={e => setQuery(e.target.value)}
                value={query}
                placeholder="Search"
            />

            <Display
                matches={matches}
                people={people}
                loading={loading}
                query={query}
            />
        </div>
    );
}

export default App;
