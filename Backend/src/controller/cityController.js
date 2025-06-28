const { CityModel } = require("../models/city.model");
const logger = require("../appLogger");
const citiesData = require("../../assests/cities.json"); // Path to downloaded JSON file

exports.getOneCity = async (req, res) => {
    let response = {
        value: false,
        msg: "cityCode is new",
        name: "",
        state: "",
        cityCode: 0,
    };
    const cityId = req.params.cityCode;
    const city = await CityModel.find({ cityCode: cityId });
    if (city.length) {
        response = {
            value: true,
            msg: "cityCode Already Present",
            name: city[0].name,
            state: city[0].state,
            cityCode: city[0].cityCode,
        };
        res.send(response);
    } else {
        res.send(response);
    }
    logger.info(
        `cityController:://getOneCity::response:: ${JSON.stringify(response)}`
    );
};

exports.addCity = async (req, res) => {
    let resObj = {
        msg: "City Added",
        name: req.body.name,
    };
    const savedCity = await CityModel.create(req.body);
    logger.info(
        `cityController:://addcity::response:: cities.length : ${JSON.stringify(
            savedCity
        )}`
    );
    // const newUser = new User(req.body); // Create a new User object from request body
    // const savedUser = await newUser.save(); // Save the user to MongoDB
    // res.json(savedUser); // Send the saved user object back in the response
    res.send(resObj);
};

exports.getAllCity = async (req, res) => {
    const cities = await CityModel.find();
    logger.info(
        `cityController::/getallcity::response: cities.length : ${cities.length}`
    );
    res.send(cities);

    // fs.readFile("./data.ts", (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // Solution 2: Streams
    // const readable = fs.createReadStream("./data.ts");
    // readable.on("data", (chunk: any) => {
    //     res.write(chunk);
    // });
    // readable.on("end", () => {
    //     res.end();
    // });
    // readable.on("error", (err: any) => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found!");
    // });

    // Solution 3: Streams
    // const readable = fs.createReadStream("./data.ts");
    // readable.pipe(res);
};

exports.getIndianCity = async (req, res) => {
    console.log("Fetching Indian cities from JSON data", citiesData.cities);
    logger.info(
        `cityController::/getindiancity::response: citiesData.length : ${citiesData.cities.length}`
    );
    res.send(citiesData);
};

exports.getIndianCitiesByState = async (req, res) => {
    try {
        logger.info(
            `cityController::/getindiancitiesbystate::request: state : ${req.params.state}`
        );
        const state = req.params.state;
        const filteredCities = citiesData.cities.filter(
            (city) => city.State.toLowerCase() === state.toLowerCase()
        );
        logger.info(
            `cityController::/getindiancitiesbystate::response: filteredCities.length : ${filteredCities.length}`
        );
        res.send(filteredCities);
    } catch (error) {
        logger.error(
            `cityController::/getindiancitiesbystate::error: ${error.message}`
        );
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.getIndianCitiesByDistrict = async (req, res) => {
    try {
        logger.info(
            `cityController::/getindiancitiesbydistrict::request: district : ${req.params.district}`
        );
        const district = req.params.district;
        const filteredCities = citiesData.cities.filter(
            (city) => city.District.toLowerCase() === district.toLowerCase()
        );
        logger.info(
            `cityController::/getindiancitiesbydistrict::response: filteredCities.length : ${filteredCities.length}`
        );
        res.send(filteredCities);
    } catch (error) {
        logger.error(
            `cityController::/getindiancitiesbydistrict::error: ${error.message}`
        );
        return res.status(500).send({ error: "Internal Server Error" });
    }
};
