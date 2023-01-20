import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { data: planetsData, loading, error, fetchData } = useFetch();

  useEffect(() => {
    async function makeFetch() {
      await fetchData('https://swapi.dev/api/planets');
    }

    makeFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({
    planetsData,
    loading,
    error,
  }), [planetsData, loading, error]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.shape(),
}.isReqired;

export default PlanetsProvider;
