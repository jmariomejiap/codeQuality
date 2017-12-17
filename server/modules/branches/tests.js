import test from 'ava';
import supertest from 'supertest-as-promised';
import uuidv1 from 'uuid/v1';
import server from '../../server';
import Project from '../../models/project';
import Branches from '../../models/branches';
import fetchProject from '../../util/fetchProject';

const internals = {};

test.before('connecting to codeQuality, branchs test', async () => {
  internals.reqAgent = await supertest(server);
});

test.beforeEach(async () => {
  await Project.remove({});

  const dummyProject = {
    name: 'projectTestBranches',
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


test('should fail if query has no valid projectId ', async (t) => {
  const res = await internals.reqAgent
    .get('/api/v1/branches');

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value');
});


test('should fail if token is empty ', async (t) => {
  const res = await internals.reqAgent
    .get('/api/v1/branches?token=');

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value');
});


test('should fail if token is no match ', async (t) => {
  const wrongToken = '27d5fa70-e36b-11e7-85d1-3f5dc44bac81';
  const res = await internals.reqAgent
    .get(`/api/v1/branches?token=${wrongToken}`);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value');
});


test('should return all available branches', async (t) => {
  const projectDoc = await fetchProject('projectTestBranches');
  const res = await internals.reqAgent
    .get(`/api/v1/branches?token=${projectDoc[0].token}`);

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.is(res.body.branches.length, 3);
});
