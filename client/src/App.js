import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Search from './components/Search.jsx';
import Person from './components/Person.jsx';

const SW_URL = 'https://swapi.dev/api';

function App() {
    const [loading, setLoading] = useState(true),
        [people, setPeople] = useState([]),
        [query, setQuery] = useState('');

    useEffect(() => {
        axios
            .get(`${SW_URL}/people/`)
            .then(res => {
                console.log(res.data.results);
                setPeople(res.data.results);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const fuse = new Fuse(people, {
        keys: ['name', 'eye_color'],
    });

    // took a lot of trial and error to find out that this returns an array of "items"
    const matches = fuse.search(query);

    return (
        <div className="App">
            <Search
                onChange={e => setQuery(e.target.value)}
                value={query}
                placeholder="Search"
            />

            {!loading && query ? (
                <>
                    {matches.map((match, i) => (
                        <Person
                            key={i}
                            name={match.item.name}
                            eye_color={match.item.eye_color}
                        />
                    ))}
                </>
            ) : (
                <>
                    {people.map((person, i) => (
                        <Person key={i} {...person} />
                    ))}
                </>
            )}
        </div>
    );
}

export default App;
