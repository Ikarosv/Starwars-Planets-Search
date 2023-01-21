import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

const COLUM_FILTER_OPTIONS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const COMPARISON_FILTER_OPTIONS = ['maior que', 'menor que', 'igual a'];

function App() {
  const [planetName, setPlanetName] = useState('');
  const [valueFilter, setValueFilter] = useState(0);
  const [columnFilter, setColumnFilter] = useState(COLUM_FILTER_OPTIONS[0]);
  const [comparisonFilter, setComparisonFilter] = useState(COMPARISON_FILTER_OPTIONS[0]);
  const [comparison, setComparison] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setComparison({
      valueFilter,
      columnFilter,
      comparisonFilter,
    });
  };

  return (
    <PlanetsProvider>
      <Input
        value={ planetName }
        onChange={ (e) => setPlanetName(e.target.value) }
        placeholder="Digite o nome de um planeta"
        data-testid="name-filter"
      />
      <br />
      <form
        onSubmit={ handleSubmit }
      >
        <Select
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
          options={ COLUM_FILTER_OPTIONS }
        />
        <Select
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ (e) => setComparisonFilter(e.target.value) }
          options={ COMPARISON_FILTER_OPTIONS }
        />
        <Input
          data-testid="value-filter"
          type="number"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
        <Button
          type="submit"
          data-testid="button-filter"
        >
          filtrar
        </Button>
      </form>
      <Table
        planetName={ planetName }
        comparison={ comparison }
      />
    </PlanetsProvider>
  );
}

export default App;
