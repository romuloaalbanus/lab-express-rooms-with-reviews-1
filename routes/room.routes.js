const router = require("express").Router();
const RoomModel = require("../models/Room.model");

// Crud (CREATE) - HTTP POST
// Create a new room
router.post("/room", async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body.image_url) {
      delete req.body.image_url;
    }

    const result = await RoomModel.create(req.body);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud (READ) - HTTP GET
// See all the rooms
router.get("/room", async (req, res) => {
  try {
    const result = await RoomModel.find();

    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud (READ) - HTTP GET
// See one room
router.get("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RoomModel.findOne({ _id: id }).populate({
      path: "transactions",
      model: "Transaction",
    });

    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// crUd (UPDATE) - HTTP PUT/PATCH
// Update the room
router.put("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RoomModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    console.log(result);

    if (!result) {
      return res.status(404).json({ msg: "Room not found." });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cruD (DELETE) - HTTP DELETE
// Delete the room
router.delete("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RoomModel.deleteOne({ _id: id });

    console.log(result);

    if (result.n === 0) {
      return res.status(404).json({ msg: "Room not found." });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;
