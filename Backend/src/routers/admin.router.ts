import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { CityModel } from '../models/city.model';
import { MallModel } from '../models/mall.model';
const multer = require('multer');
const router = Router();

const storage=multer.diskStorage({
    destination:(req: any,file: any,cb: (arg0: null, arg1: string) => void)=>{
        if(file.fieldname === "mallImg"){
            cb(null,'./uploads/mall')
            console.log("mallImg file--------");
        } else if(file.fieldname === "shopImg"){
            console.log("shopImg file--------");
            cb(null,'./uploads/shop')
        }
    },
    filename:(req: any,file: { originalname: any; },cb: (arg0: null, arg1: any) => void)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage})
// router.use(upload.any());

router.post("/addcity" , asyncHandler(async (req, res) => {
        let resObj = {
            msg:"City Added",
            name: req.body.name
        }
        const savedCity = await CityModel.create(req.body);
        console.log("admin.router::/addcity::response:",savedCity);
        // const newUser = new User(req.body); // Create a new User object from request body
        // const savedUser = await newUser.save(); // Save the user to MongoDB
        // res.json(savedUser); // Send the saved user object back in the response
        res.send(resObj)
    }) 
)

router.get('/city/:cityCode',asyncHandler( async (req,res) => {
        let response = {
            value:false,
            msg:"cityCode is new",
            name:"",
            state:"",
            cityCode:0
        }
        const cityId = req.params.cityCode;    
        const city = await CityModel.find({cityCode:cityId});
        if(city.length) {
            response = {
                value:true,
                msg:"cityCode Already Present",
                name:city[0].name,
                state:city[0].state,
                cityCode:city[0].cityCode,
            }
            res.send(response);
        } else {
            res.send(response);
        }
        console.log("admin.router::/city/:cityCod::response:",response);
    })
)

router.post("/addmall" ,upload.single('mallImg'),asyncHandler(async (req,res) => {
        req.body["mallImg"]= (req as any).file.path;
        let resObj = {
            msg:"Mall Added",
            name: req.body.name
        }
        const savedMall = await MallModel.create(req.body);
        console.log("admin.router::/addmall::savedMall:",savedMall);
        res.send(resObj)
    })
)

router.post("/addshop" , (req,res) => {
    console.log("addshops headers",req.headers);
    console.log("addshops body11",req.body);
    let resObj = {
        msg:"Shop Added"
    }
    res.send(resObj)
})

//wildcard routes get called when no routes are matched
router.get("*", (req,res) => {
    res.send("get URL not found");
})

router.post("*", (req,res) => {
    res.send("post URL not found");
})
export default router;