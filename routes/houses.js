const express = require("express");
const { House, validatePost, validateUpdate } = require("../models/house");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (house) {
      return res.status(200).json({ house });
    } else {
      return res
        .status(404)
        .json({ message: "House with the given id ws not found!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const houses = await House.find();
    return res.status(200).json({ houses });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let house = new House(req.body);
    house = await house.save();
    return res.status(200).json({ house });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const house = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (house) {
      return res.status(200).json({ house });
    } else {
      return res
        .status(404)
        .json({ message: "House with the given id ws not found!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const house = await House.findByIdAndDelete(req.params.id);
    if (house) {
      return res.status(200).json({ house });
    } else {
      return res
        .status(404)
        .json({ message: "House with the given id ws not found!" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
