const { connect } = require("../Connections/DatabaseConnection/connection");

async function addStones(name, size, color, unit, price, piece, weight, image) {
  const newStone = {
    name,
    size,
    color,
    unit,
    price,
    piece,
    weight,
    image,
  };

  try {
    const db = await connect(); // Assuming connect is your MongoDB connection function
    const stonesCollection = db.collection("stone");
    const result = await stonesCollection.insertOne(newStone);
    console.log("✅ Stone uploaded successfully, ID:", result.insertedId);
    return result;
  } catch (error) {
    console.error("❌ Error uploading stone:", error.message);
    throw error;
  }
}

module.exports = { addStones };
