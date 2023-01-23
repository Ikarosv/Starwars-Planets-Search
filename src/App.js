import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

const COMPARISON_FILTER_OPTIONS = ['maior que', 'menor que', 'igual a'];

function App() {
  const [planetName, setPlanetName] = useState('');
  const [COLUMN_FILTER_OPTIONS, setColumnFilterOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [valueFilter, setValueFilter] = useState(0);
  const [columnFilter, setColumnFilter] = useState(COLUMN_FILTER_OPTIONS[0]);
  const [comparisonFilter, setComparisonFilter] = useState(COMPARISON_FILTER_OPTIONS[0]);
  const [comparison, setComparison] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setComparison([...comparison, {
      valueFilter,
      columnFilter,
      comparisonFilter,
    }]);

    const options = COLUMN_FILTER_OPTIONS
      .filter((option) => option !== columnFilter);
    setColumnFilterOptions(options);
    setColumnFilter(options[0]);
  };

  const resetFilters = () => {
    setComparison([]);
    const options = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    setColumnFilter(options);
    setColumnFilter(options[0]);
  };

  const handleDeletion = (column) => {
    const deleted = comparison.filter((filter) => filter.columnFilter !== column);
    setComparison(deleted);
    setColumnFilterOptions([...COLUMN_FILTER_OPTIONS, column]);
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
          options={ COLUMN_FILTER_OPTIONS }
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
      <ul>
        {
          comparison.map((filter) => (
            <li key={ filter.columnFilter } data-testid="filter">
              <p>
                {
                  `${filter.columnFilter} 
                  ${filter.comparisonFilter} ${filter.valueFilter}`
                }
                <button
                  type="button"
                  onClick={ () => handleDeletion(filter.columnFilter) }
                >
                  X

                </button>
              </p>
            </li>
          ))
        }
      </ul>
      <button
        onClick={ resetFilters }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
      <Table
        planetName={ planetName }
        comparison={ comparison }
      />
    </PlanetsProvider>
  );
}

export default App;
