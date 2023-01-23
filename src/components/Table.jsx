import PropTypes from 'prop-types';
import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table({ planetName, comparison }) {
  const { planetsData, loading } = useContext(PlanetsContext);

  if (loading || !planetsData) {
    return <Loading />;
  }

  let planets = planetsData.results;
  delete planets[0].residents;

  const theaders = Object.keys(planets[0]);

  const formatUrl = (item) => {
    if (item instanceof Array) {
      return item.reduce((acc, url, index) => [...acc,
        <a key={ url + index } href={ url }>
          {url}
          <br />
        </a>,
      ], []);
    }

    return item;
  };

  const toTableData = (planet, index) => theaders.map((theader) => (
    <td key={ `${planet[theader]}${index}${index}` }>{formatUrl(planet[theader])}</td>
  ));

  if (planetName) {
    planets = planets.filter((planet) => planet.name.toLowerCase()
      .includes(planetName.toLowerCase()));
  }

  if (Object.keys(comparison).length) {
    planets = comparison.reduce((acc, item) => {
      const { valueFilter, columnFilter, comparisonFilter } = item;
      switch (comparisonFilter) {
      case 'maior que':
        return acc.filter((planet) => +planet[columnFilter] > valueFilter)
          .filter((planet) => planet[columnFilter] !== 'unknown');
      case 'menor que':
        return acc.filter((planet) => +planet[columnFilter] < valueFilter)
          .filter((planet) => planet[columnFilter] !== 'unknown');
      case 'igual a':
        return acc.filter((planet) => planet[columnFilter] === valueFilter)
          .filter((planet) => planet[columnFilter] !== 'unknown');
      default: return acc;
      }
    }, planets);
  }

  return (
    <table>
      <thead>
        <tr>
          {
            theaders.map((theader, index) => (
              <th key={ `${theader}${index}` }>{theader}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          planets.map((planet, index) => (
            <tr key={ planet.name + index }>
              {
                toTableData(planet)
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  planetName: PropTypes.string,
}.isRequired;

Table.propTypes = {
  tdatas: PropTypes.arrayOf(),
  theaders: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default Table;
