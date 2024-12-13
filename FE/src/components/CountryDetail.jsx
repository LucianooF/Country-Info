import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PopulationChart from './PopulationChart';

const CountryDetail = () => {
  const { code } = useParams(); 
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/countriesinfo/${code}`);
        setCountryInfo(response.data); 
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar la información del país');
        setLoading(false);
      }
    };

    fetchCountryDetail();
  }, [code]); 

  if (loading) {
    return <p>Cargando información del país...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const latestPopulation = countryInfo.population.length > 0 ? countryInfo.population[countryInfo.population.length - 1].value : "No disponible";

  const populationData = countryInfo.population;

  return (
    <div>
      <h1>{countryInfo.name}</h1>
      <p><strong>Population:</strong> {populationData[populationData.length - 1].value}</p>

      <h2>Neighboring Countries:</h2>
      <ul>
        {countryInfo.borders && countryInfo.borders.length > 0 ? (
          countryInfo.borders.map((border) => (
            <li key={border.countryCode}>
              {border.commonName} ({border.officialName})
            </li>
          ))
        ) : (
          <p>No tiene países vecinos registrados.</p>
        )}
      </ul>
      <PopulationChart populationData={populationData} />
    </div>
  );
};

export default CountryDetail;
