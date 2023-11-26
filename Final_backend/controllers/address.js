const addressRouter = require("express").Router();
const db = require("../models");

const Address = db.address;

addressRouter.get("/", async (req, res) => {
  const allAddress = await Address.findAll({
    attributes: { exclude: ["districtDistrictId"] },
  });
  res.status(200).json(allAddress);
});

addressRouter.post("/", async (req, res) => {
  // I am expecting districtId from frontend.
  const { line1, line2, city, districtId } = req.body;

  const addAddress = await Address.create({
    addressLine1: line1,
    addressLine2: line2 | null,
    city,
    districtId,
  });

  res.send(addAddress.toJSON());
});

module.exports = addressRouter;
