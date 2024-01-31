import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function Flag() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [randomCountry, setRandomCountry] = useState({});

  const getCountries = () => {
    axios
    .get(`https://ih-countries-api.herokuapp.com/countries`)
    .then(response => {
      setCountries(response.data);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
}; 

  useEffect(() => {
    getCountries()
  }, []);

  const getRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    setRandomCountry(randomCountry);
    setIsLoading(false);
  };

  useEffect(() => {
    if(!isLoading && countries) getRandomCountry()
  }, [countries]);

  return (
    <div className="flag-card">
        {randomCountry.alpha2Code && (
            <>
                <img src={`https://flagcdn.com/w2560/${randomCountry.alpha2Code.toLowerCase()}.png`} alt='country-flag' />
                <div className="overlay"></div>
            </>
        )}
        <div className="flag-card-content">
            <h1>Get to Know a Country</h1>
            <h3>A little trivia of a country</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>{randomCountry.name?.common}</h1>
                    <h5>Capital: {randomCountry.capital}</h5>
                    <p><strong>Languages spoken: </strong><br/> {randomCountry.languages && Object.values(randomCountry.languages).join(', ')}</p>
                    <div className="borders">
                       <p><strong>Borders:</strong></p>
                        {Array.isArray(randomCountry.borders) && randomCountry.borders.length > 0
                            ? randomCountry.borders.map((alpha3CodeOfBorderCountry, index) => {
                                const matchingCountries = countries.find(country => country.alpha3Code === alpha3CodeOfBorderCountry);
                                const borderCountryNames = matchingCountries.name.common;
                                return <span className="border-country-class" key={index}>{borderCountryNames + " "}</span>;
                            })
                            : 'The country has no borders.'}
                    </div>
                    <div className="country-links">
                      <a href={`https://www.google.com/maps/place/${randomCountry.name?.common}/@${randomCountry?.latlng?.[0]},${randomCountry?.latlng?.[1]}`} target="_blank" rel="noreferrer">On Google Maps</a>
                      <br />
                      <a href={`https://en.wikipedia.org/wiki/${randomCountry.name?.common}`} target="_blank" rel="noreferrer">On Wikipedia</a>
                    </div>
                </div>
            )}
        </div>
    </div>
)
}
