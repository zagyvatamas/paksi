export class Products{
    id:number;
    name:string;
    handle:string;
    retailPrice:number;
    wholesalePrice:number;
    imageUrl:string;
    available:boolean;
    discountPercent:number;

    constructor(id:number,name:string, handle:string, retailPrice:number, wholesalePrice:number, imageUrl:string, available:boolean, discountPercent:number) {
        this.id = id;
        this.name = name;
        this.handle = handle;
        this.retailPrice = retailPrice;
        this.wholesalePrice = wholesalePrice;
        this.imageUrl = imageUrl;
        this.available = available;
        this.discountPercent = discountPercent;
    }
}