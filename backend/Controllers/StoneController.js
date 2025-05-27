const { connect } = require("../Connections/DatabaseConnection/connection");
const Stone = require("../Models/Stone"); // Assuming you have a Stone model
const { getStones } = require("../DatabaseFunction/getStones");
const { addStones } = require("../DatabaseFunction/postStone");
const { ObjectId } = require("mongodb");
// Get all stones
exports.getAllStones = async (req, res) => {
  try {
    const stones = await getStones();

    res.json(stones);
  } catch (err) {
    console.error("Failed to fetch stones:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single stone by ID

exports.getStoneById = async (req, res) => {
  try {
    const db = await connect();
    const stonesCollection = db.collection("stone");

    const stone = await stonesCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!stone) {
      return res.status(404).json({ message: "Stone not found" });
    }

    res.json(stone);
  } catch (err) {
    console.error(`Failed to fetch stone with ID ${req.params.id}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new stone
exports.postStone = async (req, res) => {
  try {
    console.log("Incoming data is", req.body);
    const { name, size, color, unit, price, piece, weight, image } = req.body;

    // Basic validation

    const result = await addStones(
      name,
      size,
      color,
      unit,
      price,
      piece,
      weight,
      image ||
        "https://avatars.githubusercontent.com/u/129311377?v=4https://avatars.githubusercontent.com/u/129311377?v=4"
    );

    if (result && result.insertedId) {
      //After insting we all calling the getAllStones to sen the updated data
      //to forntend
      this.getAllStones(req, res);
    } else {
      throw new Error("Failed to insert stone");
    }
  } catch (err) {
    console.error("Failed to create stone:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update stone

exports.updateStone = async (req, res) => {
  try {
    const { name, size, color, unit, price, piece, weight, image } = req.body;
    const db = await connect();
    const stonesCollection = db.collection("stone");

    let objectId;
    try {
      objectId = new ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await stonesCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          ...(name && { name }),
          ...(size && { size }),
          ...(color && { color }),
          ...(unit && { unit }),
          ...(price && { price }),
          ...(piece && { piece }),
          ...(weight && { weight }),
          ...(image && { image }),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Stone not found" });
    }

    const updatedStone = await stonesCollection.findOne({ _id: objectId });
    this.getAllStones(req, res);
  } catch (err) {
    console.error(`Failed to update stone with ID ${req.params.id}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete stone
exports.deleteStone = async (req, res) => {
  try {
    const db = await connect();
    const stonesCollection = db.collection("stone");

    const result = await stonesCollection.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Stone not found" });
    }

    res.json({ message: "Stone deleted successfully" });
  } catch (err) {
    console.error(`Failed to delete stone with ID ${req.params.id}:`, err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update stone price
exports.updateStonePrice = async (req, res) => {
  try {
    const { price } = req.body;

    const db = await connect();
    const stonesCollection = db.collection("stone");

    const result = await stonesCollection.updateOne(
      { _id: req.params.id },
      { $set: { stonePrice: price } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Stone not found" });
    }

    const updatedStone = await stonesCollection.findOne({ _id: req.params.id });
    res.json(updatedStone);
  } catch (err) {
    console.error(
      `Failed to update price for stone with ID ${req.params.id}:`,
      err
    );
    res.status(500).json({ message: "Server error" });
  }
};
