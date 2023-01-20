import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  const [planetName, setPlanetName] = useState('');
  return (
    <PlanetsProvider>
      <input
        name="planetName"
        value={ planetName }
        onChange={ (e) => setPlanetName(e.target.value) }
        placeholder="Digite o nome de um planeta"
        data-testid="name-filter"
      />
      <Table planetName={ planetName } />
    </PlanetsProvider>
  );
}

export default App;
