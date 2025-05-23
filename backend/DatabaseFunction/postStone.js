const { connect } = require("../Connections/DatabaseConnection/connection");

async function addStones(name, price, image, description) {
  // Basic validation
  if (
    !name ||
    typeof name !== "string" ||
    typeof price !== "number" ||
    !image ||
    typeof image !== "string" ||
    !description ||
    typeof description !== "string"
  ) {
    throw new Error("Invalid input types");
  }

  const newStone = {
    name,
    price,
    image: image || "/placeholder.svg?height=150&width=150",
    description,
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
