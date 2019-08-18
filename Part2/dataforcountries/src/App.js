import React, { useState, useEffect } from 'react'
import countriesService from "./services/countries"
import Country from "./components/Country"
import Weather from "./components/Weather"

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  


  useEffect(() => {
    countriesService.getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowButton = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  console.log(countriesToShow);


  const selectCountry = () => {
    if (countriesToShow.length > 10) {
      return (<div>Too many matches, be more specific</div>)
    } else if (countriesToShow.length > 1) {
      const countries = countriesToShow.map(country => <li key={country.name}>{country.name} <button onClick={handleShowButton} value={country.name}>Show</button></li>)
      return (
        <>
          {countries}
        </>
      )
    } else if (countriesToShow.length === 1) {
      return (
        <>
          <h1>{countriesToShow[0].name}</h1>
          <div>Capital: {countriesToShow[0].capital} </div>
          <div>Population: {countriesToShow[0].population} </div>
          <h2>Languages</h2>
          <ul>
            {countriesToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={countriesToShow[0].flag} alt="flag"></img>
          <Weather capital={countriesToShow[0].capital} />
        </>
      )
    } else {
      return (
        <>No matches</>
      )
    }
  }


  return (
    <div>
      <div>
        Country Name: <input onChange={handleFilterChange} value={filter} />
      </div>
      <Country selectCountry={selectCountry} />
      
    </div>
  );
};

export default App;