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
     * with the next one, its final day is a travel day. If not contiguous with
     * the previous one, its first day is a travel day as well.
     *
     * Keep track of each counted day in a Set. If a project day is already in the
     * set, skip it entirely. This prevents the first day of a project that's
     * contiguous with a previous one from being counted at all.
     */
    for (const [ projectIdx, project ] of this.projects.entries()) {
      const firstProject = projectIdx === 0;
      const lastProject = projectIdx === this.projects.length - 1;

      const contiguousNext = project.inSequenceWith(this.projects[projectIdx + 1]);
      const contiguousPrev = project.inSequenceWith(this.projects[projectIdx - 1]);

      if (process.env.DEBUG) {
        console.log(`Project ${projectIdx + 1} (project ${projectIdx + 1} of ${this.projects.length})`);
        console.log(`Contiguous with: next=${contiguousNext} | prev=${contiguousPrev}`);
      }

      for (const [ dayIdx, day ] of project.days.entries()) {
        const dayStr = day.toLocaleString(DATE_SHORT);
        const firstDay = dayIdx === 0;
        const lastDay = dayIdx === (project.length - 1);

        if (countedDays.has(dayStr)) continue;

        let dayType;

        if (firstDay && lastDay) {
          dayType = (firstProject || lastProject) ? 'travel' : 'full';
        } else if (firstDay) {
          dayType = contiguousPrev ? 'full' : 'travel';
        } else if (lastDay) {
          dayType = contiguousNext ? 'full' : 'travel';
        } else {
          dayType = 'full';
        }

        const rate = project.dayRates[dayType];

        if (process.env.DEBUG) {
          console.log(`Day ${dayStr} (day ${dayIdx + 1} of ${project.days.length})`);
          console.log(`Day type: ${dayType} ($${rate})`);
        }

        total += rate;
        countedDays.add(dayStr);
      }
    }

    return total;
  }
}

module.exports = ProjectSet;
