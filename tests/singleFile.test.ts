import path from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { getDetailByFilter } from '../dist';

test('get list correctly', async () => {
  const dir = path.resolve('tests/__fixtures__/list');
  const list = await getDetailByFilter({ dir, filter: 'js' });
  const res = [{ path: '1.js', size: 440 }, { path: '2.js', size: 220 }]
  assert.equal(list, res);
});

test('get list with size limit correctly', async () => {
  const dir = path.resolve('tests/__fixtures__/list');
  const list = await getDetailByFilter({ dir, filter: 'js,css', sizeLimit: 300 });
  const res = [{ path: '1.js', size: 440 }]
  assert.equal(list, res);
});

test('get list with size limit correctly', async () => {
  const dir = path.resolve('tests/__fixtures__/list');
  const list = await getDetailByFilter({ dir, filter: 'js', sizeLimit: 300 });
  const res = [{ path: '1.js', size: 440 }]
  assert.equal(list, res);
});



test.run();
