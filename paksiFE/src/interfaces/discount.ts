export class Discount{
    id:number;
    name:string;
    imageUrl:string;
    discountPercent:number;

    constructor(id:number,name:string,imageUrl:string, discountPercent?:number) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.discountPercent = discountPercent || 0;
    }
}