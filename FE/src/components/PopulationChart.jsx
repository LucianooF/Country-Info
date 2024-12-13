import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = ({ populationData }) => {
  const years = populationData.map((data) => data.year);
  const populationValues = populationData.map((data) => data.value);

  // Config
  const data = {
    labels: years, 
    datasets: [
      {
        label: 'Población',
        data: populationValues, 
        borderColor: 'rgba(75, 192, 192, 1)', 
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        fill: false,
        tension: 0.1, 
      },
    ],
  };

  return (
    <div>
      <h2>Population over the Years</h2>
      <Line data={data} />
    </div>
  );
};

export default PopulationChart;
