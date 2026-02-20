export class Products{
    id:number;
    name:string;
    handler:string;
    retailPrice:number;
    wholesalePrice:number;
    imageUrl:string;
    available:boolean;

    constructor(id:number,name:string, handler:string, retailPrice:number, wholesalePrice:number, imageUrl:string, available:boolean) {
        this.id = id;
        this.name = name;
        this.handler = handler;
        this.retailPrice = retailPrice;
        this.wholesalePrice = wholesalePrice;
        this.imageUrl = imageUrl;
        this.available = available;
    }
}