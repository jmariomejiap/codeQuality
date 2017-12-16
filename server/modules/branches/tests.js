import test from 'ava';
import supertest from 'supertest-as-promised'; // eslint-disable-line
import server from '../../server';

const internals = {};

test.before('connecting to codeQuality, branchs test', async () => {
  internals.reqAgent = await supertest(server);
});

test('should fail if query has no valid projectId ', async (t) => {
  const res = await internals.reqAgent
    
})