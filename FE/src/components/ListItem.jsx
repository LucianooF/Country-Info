import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const ListItem = ({ country }) => {
  return (
    <li>
      <Link to={`/country/${country.countryCode}`}>{country.name}</Link> {/* Link a la página del país */}
    </li>
  );
};

export default ListItem;
