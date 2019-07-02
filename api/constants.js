// as specified by NBP API
const CURRENCY_TABLES = ['A', 'B'];
const NO_RATE_STATUS = 404;

const nbpApi = 'http://api.nbp.pl/api/exchangerates';
// TODO wywalić do innego pliku
const currencyTableApi = table => `${nbpApi}/tables/${table}`;
const currencyRateApi = (table, currency, date) => `${nbpApi}/rates/${table}/${currency}/${date}`;

module.exports = {
  CURRENCY_TABLES,
  NO_RATE_STATUS,
  currencyTableApi,
  currencyRateApi,
};
