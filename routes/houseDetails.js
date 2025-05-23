const express = require("express");
const {
  HouseDetails,
  validatePost,
  validateUpdate,
  validateMongooseId,
} = require("../models/houseDetails");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const houseDetails = await HouseDetails.find()
      .sort(req.query.sort_by)
      .select({ __v: 0 });
    return res.status(200).json({ message: "Success", data: houseDetails });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: error?.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!validateMongooseId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id!" });
    }

    const houseDetail = await HouseDetails.findById(req.params.id).select({
      __v: 0,
    });
    if (houseDetail) {
      return res.status(200).json({ message: "Success", data: houseDetail });
    } else {
      return res
        .status(404)
        .json({ message: "House details with the given id was not found!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: error?.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validatePost(req.body, "post");
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let houseDetail = new HouseDetails(req.body);
    houseDetail = await houseDetail.save();
    return res.status(200).json({ message: "Success", data: houseDetail });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: error?.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!validateMongooseId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id!" });
    }

    const { error } = validateUpdate(req.body, "update");
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const houseDetail = await HouseDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (houseDetail) {
      return res.status(200).json({ message: "Success", data: houseDetail });
    } else {
      return res
        .status(404)
        .json({ message: "House details with the given id ws not found!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: error?.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!validateMongooseId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id!" });
    }

    const houseDetail = await HouseDetails.findByIdAndDelete(req.params.id);
    if (houseDetail) {
      return res.status(200).json({ message: "Success", data: houseDetail });
    } else {
      return res
        .status(404)
        .json({ message: "House details with the given id ws not found!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: error?.message });
  }
});

module.exports = router;
