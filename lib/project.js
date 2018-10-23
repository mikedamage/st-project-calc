const { DateTime } = require('luxon');

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
    this.startDate = DateTime.fromISO(startDate).startOf('day');
    this.endDate = DateTime.fromISO(endDate).endOf('day');
    this.interval = this.startDate.until(this.endDate);
    this.days = [ this.startDate ];

    for (let i = 1; i < this.length; i++) {
      this.days.push(this.startDate.plus({ days: i }));
    }
  }

  dayRate(fullDay) {
    return fullDay ? this.dayRates.full : this.dayRates.travel;
  }

  containsDate(date) {
    const dateTime = typeof date === 'string' ? new DateTime.fromISO(date) : date;
    return this.interval.contains(dateTime);
  }

  overlapsWith(otherProject) {
    return otherProject.containsDate(this.endDate);
  }

  adjacentTo(otherProject) {
    return this.endDate.get('day') + 1 === otherProject.startDate.get('day') ||
      this.startDate.get('day') === otherProject.endDate.get('day') + 1;
  }

  inSequenceWith(otherProject) {
    if (!otherProject) return false;
    return this.overlapsWith(otherProject) || this.adjacentTo(otherProject);
  }

  get length() {
    return this.interval.count('days');
  }
}

module.exports = Project;
