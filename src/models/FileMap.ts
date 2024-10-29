
import { FileInfo, FileItem } from "../interface";


export default class FileMap {
    private fileMap: Map<string, FileInfo>;

    constructor() {
        this.fileMap = new Map<string, FileInfo>();
    }

    getFileTable () {
        const res = [] as FileItem[];
        this.fileMap.forEach((fileItem,key) => {
            res.push({
                name: key,
                ...fileItem
            });
        })
        return res.sort((a,b) => {
           return b.total - a.total
        })
    }

    setFileMap (name: string, size: number) {
        if(this.fileMap.has(name)) {
            const fileInfo = this.fileMap.get(name);
    
            if(fileInfo) {
                let max: number = fileInfo.max;
                let min: number = fileInfo.min;
                let total: number = fileInfo.total;
                let file: number = fileInfo.file;
                if(size > fileInfo.max) {
                    max = size;
                }
                if(size < fileInfo.min) {
                    min = size;
                }
                total = total + size;
                file = file + 1;
    
                this.fileMap.set(name, {
                    ...fileInfo,
                    min,
                    max,
                    total,
                    file
                });
            } 
        } else {
            this.fileMap.set(name, {min: size, max:size, total: size, file: 1});
        }
    
    }

}



