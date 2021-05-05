import React from 'react';

export default function Search({ onChange, placeholder, query }) {
    return (
        <div>
            <input
                className="SearchInput"
                type="text"
                onChange={onChange}
                placeholder={placeholder}
                value={query}
            />
        </div>
    );
}
