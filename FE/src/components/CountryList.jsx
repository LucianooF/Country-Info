import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from './ListItem';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCountries = async () => {
		try {
				const response = await axios.get('http://localhost:3000/api/countries');
				console.log(response.data);
				setCountries(response.data);
				setLoading(false);
			} catch(err) {
				console.error('Error obtaining countries', err);
				setError('Error loading countries');
				setLoading(false);
			}
		};
		
		fetchCountries();

	}, []);
	if (error) {
    return <p>{error}</p>;
  }

	if (loading) {
    return <p>Cargando países...</p>;
  }

	return (
    <ul>
      {countries.map((country) => (
        <ListItem key={country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
