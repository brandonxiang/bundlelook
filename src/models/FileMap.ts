
import { FileInfo, FileItem } from "../interface";


export default class FileMap {
    private fileMap: Map<string, FileInfo>;

    constructor() {
        this.fileMap = new Map<string, FileInfo>();
    }

    getFileTable () {
        const subtotal = {
            name: 'subtotal',
            total: 0,
            max: 0,
            min: 0,
            file: 0,
        } as FileItem;
        const collector = [] as FileItem[];
        this.fileMap.forEach((fileItem,key) => {
            collector.push({
                name: key,
                ...fileItem
            });
            subtotal.total += fileItem.total;
            if(fileItem.max > subtotal.max) {
                subtotal.max = fileItem.max;
            }
            if(fileItem.min < subtotal.min || subtotal.min === 0) {
                subtotal.min = fileItem.min;
            }
            subtotal.file += fileItem.file;
        })
        const res = collector.sort((a,b) => {
            return b.total - a.total
         });


        res.push(subtotal);
        return res;
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



