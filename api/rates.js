const { CURRENCY_TABLES, NO_RATE_STATUS } = require('./constants');
const { getCurrencyRateFromApi, getCurrencyTableFromApi } = require('./nbp');
const { previousDay } = require('./helpers');

const noRateForDay = (error) => {
  const { response: { status } } = error;

  return status === NO_RATE_STATUS;
};

async function getCurrencyRate(table, code, date) {
  try {
    const response = await getCurrencyRateFromApi(table, code, date);

    const { data: { rates } } = response;
    const { mid } = rates[0];

    return mid;
  } catch (error) {
    if (noRateForDay(error)) {
      // eslint-disable-next-line no-console
      console.info(`No rate published on ${date}, returning rate for the previous day`);

      return getCurrencyRate(table, code, previousDay(date));
    }

    console.error(error); // eslint-disable-line no-console
    throw error;
  }
}

async function getCurrencyTable(table, currencies) {
  try {
    const response = await getCurrencyTableFromApi(table);

    const { rates } = response.data[0];
    rates.forEach((c) => {
      currencies[c.code] = { // eslint-disable-line no-param-reassign
        fullName: c.currency,
        table,
      };
    });

    return currencies;
  } catch (error) {
    console.error(error); // eslint-disable-line no-console

    return {};
  }
}

async function getAllCurrencies() {
  const currencies = {};

  await Promise.all(CURRENCY_TABLES.map(table => getCurrencyTable(table, currencies)));

  return currencies;
}

module.exports = {
  getAllCurrencies,
  getCurrencyRate,
  getCurrencyTable,
};
