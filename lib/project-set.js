const Project = require('./project');

class ProjectSet {
  constructor(entries = []) {
    this.projects = entries.map((props) => new Project(props));
  }

  get startDate() {
    return this.projects[0].startDate;
  }

  get endDate() {
    return this.projects[this.projects.length - 1].endDate;
  }

  get length() {
    return this.projects.reduce((sum, proj) => sum + proj.length, 0);
  }
}

module.exports = ProjectSet;
