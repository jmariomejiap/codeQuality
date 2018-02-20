import test from 'ava';
import supertest from 'supertest-as-promised';
import uuidv1 from 'uuid/v1';
import server from '../../server';
import fetchProject from '../../util/fetchProject';
import Project from '../../models/project';
import Branches from '../../models/branches';
import ProjectCommits from '../../models/commits';
import { commitExample, generateExamples } from '../../util/commitExample';

const internals = {};
internals.commitExample = commitExample;


test.before('connecting to codeQuality, commitshistory test', async () => {
  internals.reqAgent = await supertest(server);
});


test.beforeEach(async () => {
  await Project.remove({});
  await Branches.remove({});
  await ProjectCommits.remove({});

  const dummyProject = {
    name: 'projectTestCommitsHistory',
    token: uuidv1(),
    dateCreated: new Date(),
    dateUpdated: new Date(),
    activeBranch: 'develop',
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

  const dummyCommit = [
    {
      projectId: projectDoc._id,
      branch: 'develop',
      commitDate: new Date(),
      testCoveragePorcentage: internals.commitExample,
      author: 'mySelf',
      gitCommitHash: 'adefe45a',
    },
    {
      projectId: projectDoc._id,
      branch: 'develop',
      commitDate: new Date(),
      testCoveragePorcentage: internals.commitExample,
      author: 'mySelf',
      gitCommitHash: 'adefe45a',
    },
    {
      projectId: projectDoc._id,
      branch: 'develop',
      commitDate: new Date(),
      testCoveragePorcentage: internals.commitExample,
      author: 'mySelf',
      gitCommitHash: 'adefe45a',
    },
  ];

  await ProjectCommits.create(dummyCommit);
});


test('should fail if projectId or branch are missing', async (t) => {
  const projectDoc = await fetchProject('projectTestCommitsHistory');

  const res = await internals.reqAgent
    .get(`/api/v1/commitshistory?projectId=${projectDoc[0]._id}&limit=30`);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_params');
});


test('should fail if projectId or branch are invalid', async (t) => {
  const projectDoc = await fetchProject('projectTestCommitsHistory');

  const res = await internals.reqAgent
    .get(`/api/v1/commitshistory?projectId=${projectDoc[0]._id}&branch=feature1`);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value_commits');
});


test('should fail if limit given is NaN', async (t) => {
  const projectDoc = await fetchProject('projectTestCommitsHistory');

  const res = await internals.reqAgent
    .get(`/api/v1/commitshistory?projectId=${projectDoc[0]._id}&branch=develop&limit=boom`);

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'missing_params');
});


test('should return an array of commits', async (t) => {
  const projectDoc = await fetchProject('projectTestCommitsHistory');

  const res = await internals.reqAgent
    .get(`/api/v1/commitshistory?projectId=${projectDoc[0]._id}&branch=develop`);

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
});


test('should return an array of 5 commits if limit give is 5', async (t) => {
  const projectDoc = await fetchProject('projectTestCommitsHistory');

  const temp = {
    projectId: projectDoc[0]._id,
    branch: 'feature1',
    commitDate: new Date(),
    testCoveragePorcentage: internals.commitExample,
    author: 'jm',
    gitCommitHash: 'qwsssw5a',
  };

  const arrCommits = generateExamples(temp, 25);

  await ProjectCommits.create(arrCommits);

  const res = await internals.reqAgent
    .get(`/api/v1/commitshistory?projectId=${projectDoc[0]._id}&branch=feature1&limit=5`);

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.is(res.body.commitsHistory.length, 5);
});


test('should return an array of 20 commits if No limit is given', async (t) => {
  const projectDoc = await fetchProject('projectTestCommitsHistory');

  const temp = {
    projectId: projectDoc[0]._id,
    branch: 'feature1',
    commitDate: new Date(),
    testCoveragePorcentage: internals.commitExample,
    author: 'jm',
    gitCommitHash: 'qwsssw5a',
  };

  const arrCommits = generateExamples(temp, 25);

  await ProjectCommits.create(arrCommits);

  const res = await internals.reqAgent
    .get(`/api/v1/commitshistory?projectId=${projectDoc[0]._id}&branch=feature1`);

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
  t.is(res.body.commitsHistory.length, 20);
});
