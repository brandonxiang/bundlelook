import fs from "fs";
import path from "path";
import fg from 'fast-glob';

export const getDirSize = async (params: {dir: string, ignore?: string[] }) => {
    const allFiles = await fg('**', {cwd: params.dir, ignore: params.ignore});
    let res = 0;
    allFiles.forEach(file => {
        const stat = fs.statSync(path.resolve(params.dir, file));
        res += stat.size;
    });
    return res;
}