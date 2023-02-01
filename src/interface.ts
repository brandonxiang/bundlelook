export interface FileInfo {
    min: number;
    max: number;
    total: number;
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
}
