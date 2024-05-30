const express = require("express");
const weatherRouter = express.Router();

let data = [
  {
    activity: ["morning jog", "breakfast", "work", "lunch", "gym"],
    weather: "sunny",
  },

  {
    activity: ["work", "coffee break", "meetings", "dinner", "movie"],
    weather: "cloudy",
  },
  {
    activity: ["weekend", "hiking", "picnic", "reading", "garderning"],
    weather: "rainy",
  },
];

//Base url http://127.0.0  or http://localhost

//GET retrieve the entire list
//http://localhost:4000/api/list
weatherRouter.get("/list", (req, res) => {
  res.send(data);
});

//GET get items by query parameter  ?activity=movie
//http://localhost:4000/api/activities?activity=movie
weatherRouter.get("/activities", (req, res) => {
  const activityToFind = req.query.activity;
  if (!activityToFind) {
    return res.status(400).send("Activity parameter is missing");
  }
  const foundItems = data.filter((item) => {
    return item.activity.includes(activityToFind);
  });
  if (!foundItems.length) {
    return res.status(404).send("Activity not found");
  }
  res.send(foundItems);
});

//GET activities based on weather condition api/activities/weather/:condition
//front-end path api/activities/weather/rainy
weatherRouter.get("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  //   if (!weatherCondition) {
  //     return res.status(400).send("Weather condition is required");
  //   }  这个判断不用写，因为前段没有传condition的话就没有对应的api
  const itemsWithCondition = data.filter((item) => {
    return item.weather === weatherCondition;
  });
  res.send(itemsWithCondition);
});

//POST add a new item through body
weatherRouter.post("/activities", (req, res) => {
  console.log("content", req.body);
  const { activity, weather } = req.body;
  if (!activity || !weather) {
    return res.status(400).send("Activity and weather are required");
  }
  data.push({ activity, weather });
  res.status(201).send({ msg: "Add activity succeeded" });
});

//PUT update activities   /:condition
weatherRouter.put("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const { activity } = req.body;
  const foundIndex = data.findIndex((item) => {
    return item.weather === weatherCondition;
  });
  if (foundIndex === -1) {
    return res.status(404).send("Weather condition not found");
  }
  data[foundIndex].activity = activity;
  res.send({
    msg: "Activities updated successfully",
    updatedWeather: data[foundIndex],
  });
});

//DELETE items based on weather condition  /:condition/rainy
weatherRouter.delete("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const foundIndex = data.findIndex((item) => {
    return item.weather === weatherCondition;
  });
  if (foundIndex === -1) {
    return res.status(404).send("Weather condition not found");
  }
  const deleteWeather = data.splice(foundIndex, 1);
  res.send({
    msg: "Activities deleted successfully",
    deletedWeather: deleteWeather[0],
  });
});

module.exports = weatherRouter;
