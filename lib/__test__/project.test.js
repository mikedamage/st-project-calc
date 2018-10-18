const Project = require('../project');

test('sets properties based on options object', () => {
  const project = new Project({
    cityCost: 'high',
    startDate: '2018-01-01',
    endDate: '2018-01-02'
  });

  expect(project.cityCost).toEqual('high');
  expect(project.startDate).toEqual('2018-01-01');
  expect(project.endDate).toEqual('2018-01-02');
});
