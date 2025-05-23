const { connect } = require("../Connections/DatabaseConnection/connection");

async function addMetals(
  name,
  unit,
  standardPurity,
  standardPurityPrice,
  image,
  variants
) {
  // Basic validation
  //Do it yourself
  const newMetal = {
    name,
    unit,
    standardPurity,
    standardPurityPrice,
    image,
    variants,
    createdAt: new Date(),
  };
  console.log(newMetal);
  try {
    const db = await connect();
    const metalsCollection = db.collection("metals");
    const result = await metalsCollection.insertOne(newMetal);
    console.log("✅ Metal uploaded successfully, ID:", result.insertedId);
    return result;
  } catch (error) {
    console.error("❌ Error uploading metal:", error.message);
    throw error;
  }
}

module.exports = { addMetals };
