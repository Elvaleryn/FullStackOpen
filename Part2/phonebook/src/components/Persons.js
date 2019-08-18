import React from 'react'



const Persons = ({ persons, filter, removePerson }) => {

    const peopleOnList = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const people = peopleOnList.map(people => <li key={people.name}>{people.name} {people.number} <button onClick={() => removePerson(people.id)}>Delete</button> </li>)

   
    
    return (
        <div>
            <ul>
                {people}
            </ul>
        </div>
    );
};

export default Persons;