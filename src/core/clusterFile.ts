import fg from "fast-glob";
import fs from "fs";
import path from "path";
import FileMap from "../models/FileMap";


/**
 * 查看文件夹内部的所有文件类型的聚类详情
 * 以文件后缀返回统计数据
 * @param opts 
 * @returns 
 */
 export const getList = async(params: {dir: string}) => {
    const fileMap = new FileMap();
    const allFiles = await fg('**', {cwd: params.dir});

    allFiles.forEach(file => {
        const extname = path.extname(file);
        const extForShort = extname.replace(/./i, '');
        const stat = fs.statSync(path.resolve(params.dir, file));
        fileMap.setFileMap(extForShort, stat.size);
    });
    const res = fileMap.getFileTable();

    return res;
}

/**
 * 查看文件夹内部的所有文件类型的聚类详情（需要提供聚类条件）
 * 以文件后缀返回统计数据
 * @param opts 
 */
 export const getListByGroup = async (params: {dir: string, group: string[]| string}) => {
    const fileMap = new FileMap();
    const allFiles = await fg('**', {cwd: params.dir});

    allFiles.forEach(file => {
        const extname = path.extname(file);
        const extForShort = extname.replace(/./i, '');
        const stat = fs.statSync(path.resolve(params.dir, file));

        if(typeof(params.group)=='string') {
            const group = params?.group;
            if(group.includes(extForShort)) {
                fileMap.setFileMap(group, stat.size);
            }
        } else if (Array.isArray(params.group)) {
            params.group.forEach((groupName) => {
                if(groupName.includes(extForShort)) {
                    fileMap.setFileMap(groupName, stat.size);
                }
            })
        }
        
    });
    const res = fileMap.getFileTable();
    return res;
}