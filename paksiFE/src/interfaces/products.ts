export class Products{
    id:number;
    name:string;
    handle:string;
    retailPrice:number;
    wholesalePrice:number;
    imageUrl:string;
    available:boolean;
    discountPercent:number;
    storageType:string;
    category:string;

    constructor(id:number,name:string, handle:string, retailPrice:number, wholesalePrice:number, imageUrl:string, available:boolean, discountPercent:number, storageType:string, category:string) {
        this.id = id;
        this.name = name;
        this.handle = handle;
        this.retailPrice = retailPrice;
        this.wholesalePrice = wholesalePrice;
        this.imageUrl = imageUrl;
        this.available = available;
        this.discountPercent = discountPercent;
        this.storageType = storageType;
        this.category = category;
    }
}

export interface ProductCategory {
    name: string;
    items: ProductItem[];
}

export interface ProductItem{
    id: number;
    name: string;
    sizes: string[];
}