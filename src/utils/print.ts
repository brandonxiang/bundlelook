import { FileItem, SizeItem } from "../interface";


export function formatBytes(bytes: number ,decimals?:number) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }

export function formatFileItem(table: FileItem[]) {
    return table.map(item => ({
        name: item.name,
        total: formatBytes(item.total),
        max: formatBytes(item.max),
        min: formatBytes(item.min),
    }))
}

export function formatSizeItem(table: SizeItem[]) {
    return table.map(list => {
        return {
            path: list.path,
            size: list.size,
            sizeFormat: formatBytes(list.size),
        }
    })
}