// This file contains API functions for metals management

// Fetch all metals
export const fetchAllMetals = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/metals");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching all metals:", error);
    throw error;
  }
};

// Fetch a single metal by ID
export const fetchMetalById = async (id) => {
  try {
    const response = await fetch(`/api/metals/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching metal with ID ${id}:`, error);
    throw error;
  }
};

// Update metal price
export const updateMetalPrice = async (id, price) => {
  try {
    const response = await fetch(`/api/metals/${id}/price`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating price for metal with ID ${id}:`, error);
    throw error;
  }
};

// Create a new metal
export const createMetal = async (metalData) => {
  try {
    const response = await fetch("http://localhost:5000/api/metals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metalData),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // console.log("hello")
    return await response.json();
  } catch (error) {
    console.error("Error creating metal:", error);
    return null;
  }
};

// Update metal details
export const updateMetal = async (id, metalData) => {
  try {
    const response = await fetch(`/api/metals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metalData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating metal with ID ${id}:`, error);
    throw error;
  }
};

// Delete a metal
export const deleteMetal = async (id) => {
  try {
    const response = await fetch(`/api/metals/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting metal with ID ${id}:`, error);
    throw error;
  }
};
