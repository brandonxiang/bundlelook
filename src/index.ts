import { getList, getListByGroup } from './core/clusterFile';
import { getDetailByFilter } from './core/singleFile';
import { CommandOption } from "./interface";
import { formatFileItem, formatSizeItem } from './utils/print';
import { formatBytes } from './utils/print';
import { getDirSize } from './core/dirSize';

export {
    getList, 
    getDetailByFilter, 
    getListByGroup,
    formatFileItem,
    formatSizeItem,
    formatBytes,
    getDirSize,
}

export const command = async(dir: string, opts: CommandOption) => {
    dir = dir || process.cwd();
    if(opts.total) {
        const total = await getDirSize({dir});
        console.log(`The total size is ${formatBytes(total)} in this directory!!!`)
    } else if(opts.group) {
        const table = await getListByGroup({dir, group: opts.group});
        console.table(formatFileItem(table));
    } else if(opts.filter) {
        const table = await getDetailByFilter({dir, filter:opts.filter});
        console.table(formatSizeItem(table));
    } else {
        const table = await getList({dir});
        console.table(formatFileItem(table));
    }
}