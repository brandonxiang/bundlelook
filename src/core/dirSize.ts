import fs from "fs";
import path from "path";
import fg from 'fast-glob';

export const getDirSize = async (params: {dir: string}) => {
    const allFiles = await fg('**', {cwd: params.dir});
    let res = 0;
    allFiles.forEach(file => {
        const stat = fs.statSync(path.resolve(params.dir, file));
        res += stat.size;
    });
    return res;
}