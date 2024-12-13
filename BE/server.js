import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;
const apiBaseUrl = process.env.API_BASE_URL ?? '/api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get(`${apiBaseUrl}/countries`, async (req, res) => {
  try {
    const response = await axios.get(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    const countriesList = response.data.map((country) => country);
    res.status(200).json(countriesList);
    console.log(countriesList);
  } catch (error) {
    console.error('Error obtaining the list of countries', error);
    res.status(500).json({ message: 'Error obtaining the list of countries' });
  }
});

app.get(`${apiBaseUrl}/countriesinfo/:code`, async (req, res) => {
  const { code } = req.params;
  try {
    const infoBorder = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${code}`
    );
    const name = infoBorder.data.commonName.trim().toLowerCase();
    console.log(infoBorder.data.commonName);
    // console.log(infoBorder.data.borders);

    const population = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/population`
    );
    // console.log(Array.isArray(population.data.data))
    const countryPopulation = population.data.data.find(
      (c) => c.country.trim().toLowerCase() === name
    );

    const flags = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/flag/images`
    );
    const countryFlag = flags.data.data.find(
      (c) => c.name === infoBorder.data.commonName
    );
    res.status(200).json({
      name: infoBorder.data.commonName,
      borders: infoBorder.data.borders,
      population: countryPopulation.populationCounts,
      flag: countryFlag.flag,
    });
  } catch (error) {
    console.error('Error obtaining info about the country', error);
    res.status(500).json({ message: `Error obtaining info about the country` });
  }
});

app.listen(port, () => {
  console.log(
    `http://localhost:${port}${apiBaseUrl}/countries Server is listening on Port: ${port}`
  );
});
