import path from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { getDirSize } from '../dist';

test('get directory size correctly', async () => {
  const dir = path.resolve('tests/__fixtures__/size');
  const size = await getDirSize({dir});
  assert.equal(size, 440);
});


test.run();
