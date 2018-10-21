/* globals test, expect */

const ProjectSet = require('../project-set');
const sets = require('../../etc/project-sets.json');

let projectSet;

test('Project Set 1', () => {
  /**
   * Project Set 1:
   *  [
   *    {
   *      "cityCost": "low",
   *      "startDate": "2015-09-01",
   *      "endDate": "2015-09-03"
   *    }
   *  ]
   *
   * Low cost city
   * Travel days: 2 * $45 = 90
   * Full days: 1 * $75 = 75
   * Total Reimbursement: 165
   */
  projectSet = new ProjectSet(sets[0]);
  expect(projectSet.totalReimbursement()).toEqual(165)
});

