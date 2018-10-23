const Project = require('./project');
const { DateTime: { DATE_SHORT } } = require('luxon');

class ProjectSet {
  constructor(entries = []) {
    this.projects = entries.map((props) => new Project(props));
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
        console.log(`Contiguous with: (next: ${contiguousNext}, prev: ${contiguousPrev}), Rates: (travel: ${project.dayRates.travel}, full: ${project.dayRates.full})`);
      }

      for (const [ dayIdx, day ] of project.days.entries()) {
        const dayStr = day.toLocaleString(DATE_SHORT);
        const firstDay = dayIdx === 0;
        const lastDay = dayIdx === (project.length - 1);

        if (countedDays.has(dayStr)) continue;

        let fullDay = true;

        if (firstDay && lastDay) {
          fullDay = !firstProject && !lastProject;
        } else if (firstDay) {
          fullDay = contiguousPrev;
        } else if (lastDay) {
          fullDay = contiguousNext;
        }

        const rate = project.dayRate(fullDay);

        if (process.env.DEBUG) {
          console.log(`\tDay ${dayStr} (day ${dayIdx + 1} of ${project.days.length}) Type: ${fullDay ? 'full' : 'travel'}, Rate: $${rate}`);
        }

        total += rate;
        countedDays.add(dayStr);
      }

      if (process.env.DEBUG) console.log('\n');
    }

    return total;
  }
}

module.exports = ProjectSet;
