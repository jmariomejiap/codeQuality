import test from 'ava';
import supertest from 'supertest';
import server from '../../server';
import Project from '../../models/project';

const internals = {};

test.before('connecting to codeQuality', async () => {
  internals.reqAgent = await supertest(server);
});

test.beforeEach(async () => {
  await Project.remove({});

  const projectDummy = {
    name: 'projectNameTest',
    token: 'token',
    dateCreated: new Date(),
    dateUpdated: new Date(),
    isActive: true,
  };
  await Project.create(projectDummy);
});

test('should fail if no projectName sent', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/project');

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_value');
});

test('should fail if  projectName starts with special characters or number', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/project')
    .send({ projectName: '#myProject' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_valueRegex');
});

test('should fail if  projectName is not a string', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/project')
    .send({ projectName: 100 });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'invalid_parameter_type');
});

test('should fail if project already exist', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/project')
    .send({ projectName: 'projectNameTest' });

  t.is(res.status, 404);
  t.is(res.body.result, 'error');
  t.is(res.body.error, 'project_already_exist');
});

test('should save a project', async (t) => {
  const res = await internals.reqAgent
    .post('/api/v1/project')
    .send({ projectName: 'firstProject' });

  t.is(res.status, 200);
  t.is(res.body.result, 'ok');
});

