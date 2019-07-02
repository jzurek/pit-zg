const axios = require('axios');
const { NBP_API } = require('./constants');

const currencyTableApi = table => `${NBP_API}/tables/${table}`;
const currencyRateApi = (table, currency, date) => `${NBP_API}/rates/${table}/${currency}/${date}`;

function getCurrencyRateFromApi(table, code, date) {
  return axios.get(currencyRateApi(table, code, date));
}

function getCurrencyTableFromApi(table) {
  return axios.get(currencyTableApi(table));
}

module.exports = {
  getCurrencyRateFromApi,
  getCurrencyTableFromApi,
};
