import React from 'react';

export default function Person({ name, eye_color }) {
    return (
        <div>
            <h1>{name}</h1>
            <h3>{eye_color}</h3>
        </div>
    );
}
