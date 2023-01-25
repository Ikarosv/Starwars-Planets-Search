import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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
    
    Object.keys(testData.results[0]).forEach(async (name) => {
      expect(await screen.findByRole('columnheader', { name: new RegExp(name) })).toBeInTheDocument()
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

  test('Testa se a tabela é preenchida com os dados que vem da api;',async () => {
    // jest.spyOn(global, 'fetch');
    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(testData)
    // })
    act(() => {
      render(<App />);
    })
    
    const columnFlterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(columnFlterSelect, 'population');
      userEvent.selectOptions(comparisonFilterSelect, 'igual a');
      userEvent.type(valueFilterInput, '200000');
      userEvent.click(buttonFilter);
    })

      // const tatooine = await screen.findByRole('cell', { name: /Tatooine/i })
      // expect(tatooine).toBeInTheDocument();
  });
});
