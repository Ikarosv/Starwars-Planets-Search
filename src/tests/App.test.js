import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const filterPlanets = (column, comparison, value) => {
  const columnFlterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(columnFlterSelect, column);
      userEvent.selectOptions(comparisonFilterSelect, comparison);
      userEvent.clear(valueFilterInput);
      userEvent.type(valueFilterInput, value);
      userEvent.click(buttonFilter);
    })
}

const waitFinishLoad = async () => await waitForElementToBeRemoved(await screen.findByText('Carregando...'));

describe('Testando o app', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    })
  })

  afterEach(() => { jest.clearAllMocks(); })

  test('Testa se a tabela é renderizada com o cabeçalho correto;', async () => {
    act(() => {
      render(<App />);
    })

    await waitFinishLoad();
    
    Object.keys(testData.results[0]).forEach(async (name) => {
      expect(await screen.findByRole('columnheader', { name })).toBeInTheDocument()
    })
  });

  test('Testa se a tabela é preenchida com os dados que vem da api;', async () => {
    act(() => {
      render(<App />);
    })
    
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    
    const values = await screen.findAllByRole('cell', { name: 'Tatooine' })

    values.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  });

  test('Testa se a tabela é filtrada de acordo com os filtros escolhidos;', async () => {
    render(<App />);
    
    filterPlanets('population', 'igual a', '200000')

    await waitFor(() => {
      const tatooine = screen.getByRole('cell', { name: /Tatooine/i })
      expect(tatooine).toBeInTheDocument();
    })

  });

  test('Testa se digitando o nome de um planeta se ele aparece na tela.', async () => {
    render(<App />);

    await waitFinishLoad();

    const nameFilterInput = screen.getByTestId('name-filter');
    expect(nameFilterInput).toBeInTheDocument();

    act(() => {
      userEvent.type(nameFilterInput, 'Tatooine');
    })
    expect(screen.getByRole('cell', { name: /Tatooine/i })).toBeInTheDocument();
  });

  test('Testa se ao apertar o botão de excluir um filtro, o filtro some da tela;', async () => {
    render(<App />);

    await waitFinishLoad();
    
    filterPlanets('population', 'igual a', '200000')

    const tatooine = screen.getByRole('cell', { name: /Tatooine/i })
    expect(tatooine).toBeInTheDocument();

    const filter = screen.getByTestId('filter');
    expect(filter).toBeInTheDocument();

    const buttonExclude = filter.children[filter.children.length - 1]

    expect(buttonExclude).toBeInTheDocument();
    userEvent.click(buttonExclude);
    expect(filter).not.toBeInTheDocument();
  });
});
