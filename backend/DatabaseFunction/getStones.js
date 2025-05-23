const { connect } = require("../Connections/DatabaseConnection/connection");
async function getStones() {
  let db;
  try {
    db = await connect();
    const stonesCollection = db.collection("stone");
    const stones = await stonesCollection.find({}).toArray();

    return stones;
  } catch (error) {
    console.error("❌ Failed to fetch stones:", error.message);
    return [];
  }
}
module.exports = { getStones };
