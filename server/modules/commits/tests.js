import test from 'ava';
import supertest from 'supertest-as-promised';
import uuidv1 from 'uuid/v1';
import fetchProject from '../../util/fetchProject';
import server from '../../server';
import Project from '../../models/project';
import Branches from '../../models/branches';
import ProjectCommits from '../../models/commits';
import { commitExample, invalidExample } from '../../util/commitExample';


const internals = {};
internals.commitExJson = JSON.stringify(commitExample);
internals.invalidCommitJson = JSON.stringify(invalidExample);
internals.bufferCommitJson = '<Buffer 7b 3a 34 37 2c 22 73 6b 69 70 70 ... >';
internals.tokenExample = '27d5fa70-e36b-11e7-85d1-3f5dc44bac81';


test.before('connecting to codeQuality, branchs test', async () => {
  internals.reqAgent = await supertest(server);
});


test.beforeEach(async () => {
  await Project.remove({});
  await Branches.remove({});
  await ProjectCommits.remove({});

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
      projectId: projectDoc._id,
      name: 'master',
    },
    {
      projectId: projectDoc._id,
      name: 'develop',
    },
    {
      projectId: projectDoc._id,
      name: 'featureBranch1',
    },
  ];

  await Branches.create(dummyBranches);
});


test('should fail if token or commitJson are missing, or any of the required params', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: 'project_id', branch: 'develop' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_params');
});


test('should create a new branch if not available', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: projectDoc[0]._id, branch: 'featureBranch2', commitJson: internals.commitExJson, author: 'jm', commitHash: 'ad345234h' });

  const newBranchesDoc = await Branches.find({});

  t.is(newBranchesDoc.length, 4);
});


test('should Not Create a new branch if already exists', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: projectDoc[0]._id, branch: 'develop', commitJson: internals.commitExJson, author: 'jm', commitHash: 'ad345234h' });

  const newBranchesDoc = await Branches.find({});

  t.is(newBranchesDoc.length, 3);
});


test('should fail if commit JSON is an invalid type', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: projectDoc[0]._id, branch: 'develop', commitJson: internals.bufferCommitJson, author: 'jm', commitHash: 'ad345234h' });

  t.is(res.status, 500);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'internal_error');
});


test('should fail if commit JSON is incomplete', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: projectDoc[0]._id, branch: 'develop', commitJson: internals.invalidCommitJson, author: 'jm', commitHash: 'ad345234h' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'incomplete_json');
});


test('should create a new commit record', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: projectDoc[0]._id, branch: 'develop', commitJson: internals.commitExJson, author: 'jm', commitHash: 'ad345234h' });

  const newBranchesDoc = await Branches.find({});
  const projectCommitDoc = await ProjectCommits.find({});

  t.is(newBranchesDoc.length, 3);
  t.is(projectCommitDoc.length, 1);
  t.is(res.status, 200);
});


test('should update projects date', async (t) => {
  const projectDocStart = await fetchProject('projectTestCommits');

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send({ projectId: projectDocStart[0]._id, branch: 'develop', commitJson: internals.commitExJson, author: 'jm', commitHash: 'ad345234h' });

  t.is(res.status, 200);
});
