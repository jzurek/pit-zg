jest.mock('axios');
const axios = require('axios');
const { getCurrencyRateFromApi, getCurrencyTableFromApi } = require('./nbp');
const { NBP_API } = require('./constants');

describe('getCurrencyRateFromApi', () => {
  it('should call the proper API with specified parameters', () => {
    const table = 'X';
    const code = 'OPA';
    const date = '1989-02-10';

    getCurrencyRateFromApi(table, code, date);

    expect(axios.get).toHaveBeenCalledWith(`${NBP_API}/rates/X/OPA/1989-02-10`);
  });
});

describe('getCurrencyTableFromApi', () => {
  it('should call the proper API with specified parameters', () => {
    const table = 'Y';

    getCurrencyTableFromApi(table);

    expect(axios.get).toHaveBeenCalledWith(`${NBP_API}/tables/Y`);
  });
});
