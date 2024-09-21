import { Schema, model } from "mongoose";

export interface shop{
    name:string;
    city:string
    mallName:string;
    description:string;
    shopType:string;
    floorNo:string;
    shopImg:string;
}

export const ShopSchema = new Schema<shop>(
    {
        name: {type:String,required:true},
        city: {type:String,required:true},
        mallName: {type:String,required:true},
        description: {type:String,required:true},
        shopType: {type:String,required:true},
        floorNo: {type:String,required:true},
        shopImg: {type:String,required:true},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const ShopModel =  model<shop>('shop', ShopSchema)