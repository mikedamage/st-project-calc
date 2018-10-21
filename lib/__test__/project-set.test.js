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
   * Days:
   * 09-01 (travel, low cost): $45
   * 09-02 (full day, low cost): $75
   * 09-03 (travel day, low cost): $45
   * Total Reimbursement: 165
   */
  projectSet = new ProjectSet(sets[0]);
  expect(projectSet.totalReimbursement()).toEqual(165)
});

test('Project Set 2', () => {
  /**
   * Project Set 2:
   *  [
   *    {
   *      "cityCost": "low",
   *      "startDate": "2015-09-01",
   *      "endDate": "2015-09-01"
   *    },
   *    {
   *      "cityCost": "high",
   *      "startDate": "2015-09-02",
   *      "endDate": "2015-09-06"
   *    },
   *    {
   *      "cityCost": "low",
   *      "startDate": "2015-09-06",
   *      "endDate": "2015-09-08"
   *    }
   *  ]
   *
   * Days:
   * 09-01 (travel, low): $45
   * 09-02 (full, high): $85
   * 09-03 (full, high): $85
   * 09-04 (full, high): $85
   * 09-05 (full, high): $85
   * 09-06 (full, high): $85
   * 09-07 (full, low): $75
   * 09-08 (travel, low): $45
   * Total Reimbursement: $590
   */
  projectSet = new ProjectSet(sets[1]);
  expect(projectSet.totalReimbursement()).toEqual(590);
});

