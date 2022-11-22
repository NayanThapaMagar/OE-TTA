/* eslint-disable camelcase */
const moment = require('moment');

module.exports = async (startDate, endDate) => {
  try {
    const start_date = moment(startDate, 'YYYY-MM-DDTHH:mm:ss');
    const end_date = moment(endDate, 'YYYY-MM-DDTHH:mm:ss');
    const duration = moment.duration(end_date.diff(start_date));
    const hours = duration.asHours();
    return hours;
  } catch (e) {
    return null;
  }
};
