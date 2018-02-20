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
internals.commitExJson = commitExample;
internals.invalidCommitJson = invalidExample;
internals.tokenExample = '7332d110-eae5-11e7-918c-29c3642adbe2';


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
    activeBranch: 'master',
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
    .send({ token: 'silly-token', branch: 'develop' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_params');
});


test('should fail if token doesnt belong to any project', async (t) => {
  const payload = {
    token: internals.tokenExample,
    branch: 'develop',
    commitJson: internals.commitExJson,
    author: 'jm',
    commitHash: 'ad345234h',
    message: 'dummy commit message',
    date: '2017-12-25T18:10:08.408+0000',
  };

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send(payload);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value_project');
});


test('should create a new branch if not available', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const payload = {
    token: projectDoc[0].token,
    branch: 'featureBranch2',
    commitJson: internals.commitExJson,
    author: 'jm',
    commitHash: 'ad345234h',
    message: 'dummy commit message',
    date: '2017-12-25T18:10:08.408+0000',
  };

  await internals.reqAgent
    .post('/api/v1/commit')
    .send(payload);

  const newBranchesDoc = await Branches.find({});

  t.is(newBranchesDoc.length, 4);
});


test('should Not Create a new branch if already exists', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const payload = {
    token: projectDoc[0].token,
    branch: 'develop',
    commitJson: internals.commitExJson,
    author: 'jm',
    commitHash: 'ad345234h',
    message: 'dummy commit message',
    date: '2017-12-25T18:10:08.408+0000',
  };

  await internals.reqAgent
    .post('/api/v1/commit')
    .send(payload);

  const newBranchesDoc = await Branches.find({});

  t.is(newBranchesDoc.length, 3);
});


test('should fail if commit JSON is incomplete', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const payload = {
    token: projectDoc[0].token,
    branch: 'develop',
    commitJson: internals.invalidCommitJson,
    author: 'jm',
    commitHash: 'ad345234h',
    message: 'dummy commit message',
    date: '2017-12-25T18:10:08.408+0000',
  };

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send(payload);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'incomplete_json');
});


test('should create a new commit record', async (t) => {
  const projectDoc = await fetchProject('projectTestCommits');

  const payload = {
    token: projectDoc[0].token,
    branch: 'develop',
    commitJson: internals.commitExJson,
    author: 'jm',
    commitHash: 'ad345234h',
    message: 'dummy commit message',
    date: '2017-12-25T18:10:08.408+0000',
  };

  const res = await internals.reqAgent
    .post('/api/v1/commit')
    .send(payload);

  const newBranchesDoc = await Branches.find({});
  const projectCommitDoc = await ProjectCommits.find({});

  t.is(newBranchesDoc.length, 3);
  t.is(projectCommitDoc.length, 1);
  t.is(res.status, 200);
});
