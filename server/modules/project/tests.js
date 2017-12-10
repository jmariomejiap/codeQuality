import test from 'ava';
import supertest from 'supertest';
import server from '../../server';
import Project from '../../models/project';

const internals = {};

test.before('connecting to codeQuality', async () => {
  internals.reqAgent = await supertest(server);
});

test('should responde 200', async (t) => {
  const res = await internals.reqAgent
    .get('/api/v1/project');

  t.is(res.status, 200);
});
