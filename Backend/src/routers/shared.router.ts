import { Router } from 'express';
import { MYDATA } from "../data";
import { CityModel } from '../models/city.model';
import asyncHandler from 'express-async-handler';
import { MallModel } from '../models/mall.model';
import { ShopModel } from '../models/shop.model';

const router = Router();

router.get("/cities" ,asyncHandler( async (req,res) => {
        const cities = await CityModel.find();
        res.send(cities)
    })
)

router.get("/malls" , asyncHandler( async (req,res) => {
        const malls = await MallModel.find();
        res.send(malls)
    })
)

router.get("/shops" ,asyncHandler( async (req,res) => {
        const shops = await ShopModel.find();
        res.send(shops)
    })
)

export default router;