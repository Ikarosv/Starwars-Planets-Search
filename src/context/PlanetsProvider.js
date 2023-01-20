import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    async function makeFetch() {
      await fetchData();
    }

    makeFetch();
  }, [fetchData]);

  const value = useMemo(() => ({
    data,
    loading,
    error,
  }), [data, loading, error]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.shape(),
}.isReqired;
