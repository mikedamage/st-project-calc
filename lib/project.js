const { DateTime, Interval } = require('luxon');

class Project {
  static get cityRates() {
    return {
      high: {
        full: 85,
        travel: 55,
      },
      low: {
        full: 75,
        travel: 45,
      },
    }
  }

  constructor({ cityCost, startDate, endDate }) {
    this.dayRates = this.constructor.cityRates[cityCost];
    this.startDate = DateTime.fromISO(startDate);
    this.endDate = DateTime.fromISO(endDate);
    this.interval = Interval.fromDateTimes(this.startDate, this.endDate);
  }

  get length() {
    return this.interval.count('days');
  }
}

module.exports = Project;
