import fg from "fast-glob";
import path from 'path';
import fs from "fs";

export const sortFile = (files :string[], dir: string) => {
    return files.map(file => {
        const stat = fs.statSync(path.resolve(dir, file));
        return {
            path: file, 
            size: stat.size
        }
    }).sort((a,b) => {
        return b.size - a.size
    });
}


/**
 * 查看文件夹内部的某个文件类型的具体详情
 * 详情包括文件路径和文件体积
 * @param opts 
 * @returns 
 */
 export const getDetailByFilter = async (params: {dir: string, filter: string}) => {
    const allFiles = await fg(`**/**.${params.filter}`, {cwd: params.dir});
    const res = sortFile(allFiles, params.dir);
    return res;
}