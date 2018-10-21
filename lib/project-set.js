const Project = require('./project');
const { DateTime: { DATE_SHORT } } = require('luxon');

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

  totalReimbursement() {
    let total = 0;
    const countedDays = new Set();

    /**
     * Iterate thru the days of each project. If the project is not contiguous
     * with the next one, its final day is a travel day.
     *
     * Keep track of each counted day in a Set. If a project day is already in the
     * set, skip it entirely. This prevents the first day of a project that's
     * contiguous with a previous one from being counted at all.
     */
    for (const [ projectIdx, project ] of this.projects.entries()) {
      const inSequence = project.inSequenceWith(this.projects[projectIdx + 1]) ||
        project.inSequenceWith(this.projects[projectIdx - 1]);

      for (const [ dayIdx, day ] of project.days.entries()) {
        const dayStr = day.toLocaleString(DATE_SHORT);
        const isFirst = dayIdx === 0;
        const isLast = dayIdx === (project.length - 1);

        if (countedDays.has(dayStr)) continue;

        const dayType = (isFirst && !inSequence) || (isLast && !inSequence) ? 'travel' : 'full';
        const rate = project.dayRates[dayType];

        console.log(`Project ${projectIdx} - ${dayStr}: ${dayType} $${rate}`);
        total += rate;
        countedDays.add(dayStr);
      }
    }

    return total;
  }
}

module.exports = ProjectSet;
