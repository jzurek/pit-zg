const { CURRENCY_TABLES } = require('./constants');
const { previousDay } = require('./helpers');
const { getCurrencyRateFromApi, getCurrencyTableFromApi } = require('./nbp');
const { getAllCurrencies, getCurrencyRate, getCurrencyTable } = require('./rates');

const mockRateResponse = {
  data: {
    rates: [{
      mid: 3,
    }],
  },
};

const mockTableResponse = {
  data: [
    {
      rates: [
        {
          code: 'IDK',
          currency: 'I don\'t know',
        }, {
          code: 'WTF',
          currency: 'whatever',
        },
      ],
    },
  ],
};

jest.mock('./nbp');
getCurrencyRateFromApi.mockImplementation(jest.fn(async () => (mockRateResponse)));
getCurrencyTableFromApi.mockImplementation(jest.fn(async () => (mockTableResponse)));

describe('getCurrencyRate', () => {
  it('should call the NBP API with specified parameters and return the rate', async () => {
    const table = 'U';
    const code = 'VIX';
    const date = '1989-02-11';

    const rate = await getCurrencyRate(table, code, date);

    expect(getCurrencyRateFromApi).toHaveBeenCalledWith(table, code, date);
    expect(rate).toEqual(mockRateResponse.data.rates[0].mid);
  });

  it('should call itself again if there is no data for the requested date', async () => {
    const table = 'U';
    const code = 'VIX';
    const dateWithNoRate = '1989-02-11';
    const dateWithRate = previousDay(dateWithNoRate);

    const noRateError = {
      response: {
        status: 404,
      },
    };

    getCurrencyRateFromApi.mockImplementation((t, c, date) => {
      if (date === dateWithNoRate) {
        throw noRateError;
      }

      return mockRateResponse;
    });

    const rate = await getCurrencyRate(table, code, dateWithNoRate);

    expect(getCurrencyRateFromApi).toHaveBeenCalledWith(table, code, dateWithNoRate);
    expect(getCurrencyRateFromApi).toHaveBeenCalledWith(table, code, dateWithRate);
    expect(rate).toEqual(mockRateResponse.data.rates[0].mid);
  });
});

describe('getCurrencyTable', () => {
  it('should call the NBP API with specified parameters and map currencies info', async () => {
    const currencies = {};
    const table = 'Ę';
    const expectedCurrencies = {
      IDK: {
        fullName: 'I don\'t know',
        table,
      },
      WTF: {
        fullName: 'whatever',
        table,
      },
    };

    await getCurrencyTable(table, currencies);

    expect(getCurrencyTableFromApi).toHaveBeenCalledWith(table);
    expect(Object.keys(currencies).length).toEqual(2);
    expect(currencies).toEqual(expectedCurrencies);
  });
});

describe('getAllCurrencies', () => {
  it('should call the NBP API for all the currency tables', async () => {
    await getAllCurrencies();

    CURRENCY_TABLES.forEach((table) => {
      expect(getCurrencyTableFromApi).toHaveBeenCalledWith(table);
    });
  });
});
