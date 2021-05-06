import React from 'react';

import Person from './Person';

export default function Display({ matches, people, loading, query }) {
    return (
        <div>
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
