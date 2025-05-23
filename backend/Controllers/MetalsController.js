const Metal = require("../Models/Metal"); // Unified casing
const { addMetals } = require("../DatabaseFunction/postmetal");
const { getMetals } = require("../DatabaseFunction/getMetals");
// Get all metals
exports.getAllMetals = async (req, res) => {
  try {
    let allMetals = await getMetals();

    res.status(200).json(allMetals);
  } catch (error) {
    console.error("Error fetching metals:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch metals", error: error.message });
  }
};

// Get a single metal by ID??
exports.getMetalById = async (req, res) => {
  try {
    const metal = await Metal.findById(req.params.id);

    if (!metal) {
      return res.status(404).json({ message: "Metal not found" });
    }

    res.status(200).json(metal);
  } catch (error) {
    console.error(`Error fetching metal with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Failed to fetch metal", error: error.message });
  }
};

// Create a new metal
exports.createMetal = async (req, res) => {
  try {
    const { name, unit, standardPurity, standardPurityPrice, image, varients } =
      req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    console.log(
      {
        name,
        unit,
        standardPurity,
        standardPurityPrice,
        image,
        varients,
      },
      "body",
      req.body
    );
    await addMetals(
      name,
      unit,
      standardPurity,
      standardPurityPrice,
      image,
      varients
    );
    //noe we will make aget request agian to db and return the new data
    this.getAllMetals(req, res);
  } catch (error) {
    console.error("Error creating metal:", error);
    res
      .status(500)
      .json({ message: "Failed to create metal", error: error.message });
  }
};

// Update metal price
exports.updateMetalPrice = async (req, res) => {
  try {
    const { price } = req.body;

    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Valid price is required" });
    }

    const metal = await Metal.findById(req.params.id);

    if (!metal) {
      return res.status(404).json({ message: "Metal not found" });
    }

    // Calculate trend percentage
    const oldPrice = metal.price;
    const priceDifference = price - oldPrice;
    const trendPercentage = (priceDifference / oldPrice) * 100;

    metal.price = price;
    metal.trend = Number.parseFloat(trendPercentage.toFixed(2));
    metal.lastUpdated = new Date();

    const updatedMetal = await metal.save();
    res.status(200).json(updatedMetal);
  } catch (error) {
    console.error(
      `Error updating price for metal with ID ${req.params.id}:`,
      error
    );
    res
      .status(500)
      .json({ message: "Failed to update metal price", error: error.message });
  }
};

// Update metal details
exports.updateMetal = async (req, res) => {
  try {
    const { name, icon } = req.body;

    const metal = await Metal.findById(req.params.id);

    if (!metal) {
      return res.status(404).json({ message: "Metal not found" });
    }

    if (name) metal.name = name;
    if (icon) metal.icon = icon;

    const updatedMetal = await metal.save();
    res.status(200).json(updatedMetal);
  } catch (error) {
    console.error(`Error updating metal with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Failed to update metal", error: error.message });
  }
};

// Delete a metal
exports.deleteMetal = async (req, res) => {
  try {
    const metal = await Metal.findByIdAndDelete(req.params.id);

    if (!metal) {
      return res.status(404).json({ message: "Metal not found" });
    }

    res.status(200).json({ message: "Metal deleted successfully" });
  } catch (error) {
    console.error(`Error deleting metal with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Failed to delete metal", error: error.message });
  }
};
