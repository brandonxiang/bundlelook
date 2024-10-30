import fg from "fast-glob";
import path from 'path';
import fs from "fs";
import { SizeItem } from "../interface";

export const sortFile = (sizeItems: SizeItem[], sizeLimit?: number) => {
    return sizeItems.filter(item => {
        if(sizeLimit) {
            return item.size > sizeLimit;
        }
        return true;
    })
    .sort((a,b) => {
        return b.size - a.size
    });
}

export const getFileSize = (files: string[], dir: string) => {
    return files.map(file => {
        const stat = fs.statSync(path.resolve(dir, file));
        return {
            path: file, 
            size: stat.size
        }
    })
}

/**
 * 查看文件夹内部的某个文件类型的具体详情
 * 详情包括文件路径和文件体积
 * @param opts 
 * @returns 
 */
 export const getDetailByFilter = async (params: {dir: string, filter?: string, sizeLimit?: number }) => {
    const pattern = params.filter ? `**/**.${params.filter}` : `**/**`;
    const allFiles = await fg(pattern, {cwd: params.dir});
    const res = getFileSize(allFiles, params.dir);
    return sortFile(res, params.sizeLimit);
}