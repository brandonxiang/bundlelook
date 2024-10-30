export interface FileInfo {
    /** 体积最小 */
    min: number;
    /** 体积最大 */
    max: number;
    /** 总体积最大 */
    total: number;
    /** 文件个数 */
    file: number;
}

export interface FileItem extends FileInfo  {
    name: string;
}

export interface SizeItem {
    path: string; 
    size: number;
    sizeFormat?: string;
}

export interface CommandOption {
    filter?: string;
    group?: string | string[];
    total?: boolean;
    sizeLimit?: string;
}
