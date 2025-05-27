const { ObjectId } = require("mongodb");
const { connect } = require("../../Connections/DatabaseConnection/connection");

async function updateCategory(image, type, active, name, categoryId) {
  try {
    if (!ObjectId.isValid(categoryId)) {
      console.warn("⚠️ Invalid categoryId.");
      return false;
    }

    const db = await connect();
    const categoryCollection = db.collection("category");

    const updateData = {
      image,
      type,
      active,
      name,
      updatedAt: new Date(),
    };

    const result = await categoryCollection.updateOne(
      { _id: new ObjectId(categoryId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.warn("⚠️ No category found with the given ID.");
      return false;
    }

    console.log("✅ Category updated successfully");
    return true;
  } catch (error) {
    console.error("❌ Error updating category:", error.message);
    return false;
  }
}

module.exports = { updateCategory };
