import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import personsService from "./services/persons"
import Notifications from "./components/Notifications"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFiltered] = useState("")
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    useEffect(() => {
        personsService.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    const handleFilterChange = (event) => {
        setFiltered(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) === -1) {
            personsService.create(personObject).then(response => {
                setPersons(persons.concat(personObject))
                setMessage(`${newName} is added to phonebook`)
                setMessageType("success")
                setTimeout(() => {
                    setMessage(null)
                    setMessageType(null)
                }, 2000)
            })
        } else {
            if (window.confirm(`${newName} is already in the phone book, replace the old number with the new one?`)) {
                const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
                personsService.update(personToUpdate.id, { name: newName, number: newNumber })
                    .then(response => {
                        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response.data))
                        setMessage(`${newName}'s number has changed`)
                        setMessageType("success")
                        setTimeout(() => {
                            setMessage(null)
                            setMessageType(null)
                        }, 2000);
                    }).catch(error => {
                        setMessage(`${newName} has already been deleted`)
                        setMessageType("error")
                        setPersons(persons.filter(p => p.id !== personToUpdate.id))
                        setTimeout(() => {
                            setMessage(null)
                            setMessageType(null)

                        }, 2000)
                    })
            }
        }



        setNewName("")
        setNewNumber("")
        window.location.reload();


    }



    const removePerson = (id) => {
        const personToRemove = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${personToRemove.name}`)) {
            personsService
                .deletePerson(id)
                .then(response => {
                    setPersons(persons.filter(p => p.id !== id))
                    setMessage(`${personToRemove.name} has been removed`)
                    setMessageType("success")
                    setTimeout(() => {
                        setMessage(null)
                        setMessageType(null)

                    }, 2000)
                    
                }).catch(error => {
                    setMessage(`Error: ${error.response.data.error}`)
                    setMessageType("error")
                    setTimeout(() => {
                        setMessage(null)
                        setMessageType(null)

                    }, 2000)
                })
        }

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notifications message={message} messageType={messageType} />
            <Filter handleFilterChange={handleFilterChange} filter={filter} />
            <h2>Add new person</h2>
            <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} setPersons={setPersons} removePerson={removePerson} />
        </div>
    )
}

export default App