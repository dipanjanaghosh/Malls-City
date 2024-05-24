import { Schema, model } from "mongoose";

export interface mall{
    name:string;
    city:string
    cityCode:number;
    description:string;
    noOffloor:Number;
    address:string;
    mallImg:string;
}

export const MallSchema = new Schema<mall>(
    {
        name: {type:String,required:true},
        city: {type:String,required:true},
        cityCode: {type:Number,required:true},
        description: {type:String,required:true},
        noOffloor: {type:Number,required:true},
        address: {type:String,required:true},
        mallImg: {type:String,required:true},
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

export const MallModel =  model<mall>('mall', MallSchema)









