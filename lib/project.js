const { DateTime, Duration } = require('luxon');

class Project {
  constructor({ cityCost, startDate, endDate }) {
    this.cityCost = cityCost;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

module.exports = Project;
