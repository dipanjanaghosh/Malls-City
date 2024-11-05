import { Schema, model } from "mongoose";

export interface city {
    name: string;
    cityCode: number;
    state: string;
}

export const CitySchema = new Schema<city>(
    {
        name: {
            type: String,
            required: true,
        },
        cityCode: {
            type: Number,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

export const CityModel = model<city>("city", CitySchema);
