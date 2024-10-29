import path from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { getDirSize, getList, getListByGroup } from '../dist';

test('get list correctly', async () => {
    const dir = path.resolve('tests/__fixtures__/list');
    const list = await getList({dir});
    const res = [
      { name: 'js', min: 220, max: 440, total: 660, file:2 },
      { name: 'css', min: 129, max: 129, total: 258, file:2 }
    ];
    assert.equal(list, res);
  });

test('get list by group correctly', async () => {
    const dir = path.resolve('tests/__fixtures__/list');
    const list = await getListByGroup({dir, group:['js,css']});
    const res = [
      { name: 'js,css', min: 129, max: 440, total: 918, file: 4 },
    ];
    assert.equal(list, res);
  });

  test('get list by group equal to the directory total', async () => {
    const dir = path.resolve('tests/__fixtures__/map');
    const list = await getListByGroup({dir, group:['js,map']});
    const size = await getDirSize({dir});

    assert.equal(list[0].total, size);
  });

  test('get list by group equal to the directory total', async () => {
    const dir = path.resolve('tests/__fixtures__/map');
    const res1 = await getListByGroup({dir, group:['js']});
    const res2 = await getListByGroup({dir, group:['map']}); 
    const size = await getDirSize({dir});
    const total1 = +res1[0].total;
    const total2 = +res2[0].total;

    assert.equal(total1 + total2, size);
  });
  
test.run();
  