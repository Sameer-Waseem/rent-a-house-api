const express = require("express");
const {
  HouseDetails,
  validatePost,
  validateUpdate,
} = require("../models/houseDetails");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const houseDetail = await HouseDetails.findById(req.params.id).select({
      __v: 0,
    });
    if (houseDetail) {
      return res.status(200).json(houseDetail);
    } else {
      return res
        .status(404)
        .json({ message: "House details with the given id ws not found!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const houseDetails = await HouseDetails.find().select({ __v: 0 });
    return res.status(200).json(houseDetails);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validatePost(req.body, "post");
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let houseDetail = new HouseDetails(req.body);
    houseDetail = await houseDetail.save();
    return res.status(200).json(houseDetail);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateUpdate(req.body, "update");
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const houseDetail = await HouseDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (houseDetail) {
      return res.status(200).json(houseDetail);
    } else {
      return res
        .status(404)
        .json({ message: "House details with the given id ws not found!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const houseDetail = await HouseDetails.findByIdAndDelete(req.params.id);
    if (houseDetail) {
      return res.status(200).json(houseDetail);
    } else {
      return res
        .status(404)
        .json({ message: "House details with the given id ws not found!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
