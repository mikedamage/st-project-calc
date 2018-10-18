const ProjectSet = require('../project-set');

let projectSet;

beforeEach(() => {
  projectSet = new ProjectSet();
});

test('has a projects property', () => {
  expect(projectSet.projects).toBeDefined();
});
