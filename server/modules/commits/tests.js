import test from 'ava';
import supertest from 'supertest-as-promised';
import uuidv1 from 'uuid/v1';
import server from '../../server';
import Project from '../../models/project';
import Branches from '../../models/branches';

const internals = {};

test.before('connecting to codeQuality, branchs test', async () => {
  internals.reqAgent = await supertest(server);
});


test.beforeEach(async () => {
  await Project.remove({});
  await Branches.remove({});

  const dummyProject = {
    name: 'projectTestCommits',
    token: uuidv1(),
    dateCreated: new Date(),
    dateUpdated: new Date(),
    isActive: true,
  };

  const projectDoc = await Project.create(dummyProject);

  const dummyBranches = [
    {
      token: projectDoc.token,
      name: 'master',
    },
    {
      token: projectDoc.token,
      name: 'develop',
    },
    {
      token: projectDoc.token,
      name: 'featureBranch1',
    },
  ];

  await Branches.create(dummyBranches);
});

test('should fail if token or commitJson are missing', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send({ token: 'validToken-missingCommit' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value');
});
