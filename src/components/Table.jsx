import PropTypes from 'prop-types';
import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table() {
  const { planetsData, loading } = useContext(PlanetsContext);

  if (loading || !planetsData) {
    return <Loading />;
  }

  console.log(planetsData);

  const planets = planetsData.results;

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
    <td key={ index }>{formatUrl(planet[theader])}</td>
  ));

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
          planets.map((planet, index) => {
            console.log(planet);
            return (
              <tr key={ planet.name + index }>
                {
                  toTableData(planet)
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  tdatas: PropTypes.arrayOf(),
  theaders: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default Table;
