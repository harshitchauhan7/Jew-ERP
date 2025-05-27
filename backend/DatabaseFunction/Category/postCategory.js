const { connect } = require("../../Connections/DatabaseConnection/connection");

async function postCategory(image, type, active, name) {
  try {
    const db = await connect();
    const categoryCollection = db.collection("category");

    const newCategory = {
      image: image || "https://avatars.githubusercontent.com/u/129311377?v=4",
      type,
      active,
      name,
      createdAt: new Date(),
    };

    const result = await categoryCollection.insertOne(newCategory);

    return true;
  } catch (error) {
    console.error("❌ Error uploading category:", error.message);
    return false;
  }
}
module.exports = { postCategory };
