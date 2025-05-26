const { connect } = require("../Connections/connection");
const Stone = require("../Models/Stone"); // Assuming you have a Stone model
const { getStones } = require("../DatabaseFunction/getStones");
const { addStones } = require("../DatabaseFunction/postStone");

// Get all stones
exports.getAllStones = async (req, res) => {
  try {
    const stones = await getStones();
    console.log("all stones are", stones);
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
    const stone = await stonesCollection.findOne({ _id: req.params.id });

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
    const { name, price, image, description } = req.body;

    // Basic validation
    if (!name || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await addStones(name, price, image, description || "");

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
    const { stoneName, stonePrice, stoneImage, description } = req.body;
    const db = await connect();
    const stonesCollection = db.collection("stone");

    const result = await stonesCollection.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...(stoneName && { stoneName }),
          ...(stonePrice && { stonePrice }),
          ...(stoneImage && { stoneImage }),
          ...(description && { description }),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Stone not found" });
    }

    const updatedStone = await stonesCollection.findOne({ _id: req.params.id });
    res.json(updatedStone);
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
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

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
