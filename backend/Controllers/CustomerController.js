const Customer = require("../Models/Customer");
const Order = require("../Models/Order");

// Get all customers with pagination
exports.getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const customers = await Customer.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Customer.countDocuments();

    res.status(200).json({
      customers,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch customers", error: error.message });
  }
};

// Get recent customers
exports.getRecentCustomers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const customers = await Customer.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("name phone avatar");

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching recent customers:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch recent customers",
        error: error.message,
      });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Get customer's orders
    const orders = await Order.find({ customer: req.params.id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate total orders and total spent
    const stats = await Order.aggregate([
      {
        $match: { customer: customer._id },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$total" },
          lastPurchase: { $max: "$createdAt" },
        },
      },
    ]);

    const customerData = {
      ...customer.toObject(),
      totalOrders: stats.length > 0 ? stats[0].totalOrders : 0,
      totalSpent: stats.length > 0 ? stats[0].totalSpent : 0,
      lastPurchase: stats.length > 0 ? stats[0].lastPurchase : null,
      recentOrders: orders.map((order) => ({
        id: order._id,
        date: order.createdAt,
        itemCount: order.items.length,
        total: order.total,
        status: order.status,
      })),
    };

    res.status(200).json(customerData);
  } catch (error) {
    console.error(`Error fetching customer with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Failed to fetch customer", error: error.message });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, postalCode, avatar } =
      req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email, and phone are required" });
    }

    // Check if customer with email already exists
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists" });
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      avatar,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res
      .status(500)
      .json({ message: "Failed to create customer", error: error.message });
  }
};

// Update customer details
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, postalCode, avatar } =
      req.body;

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== customer.email) {
      const existingCustomer = await Customer.findOne({ email });

      if (existingCustomer) {
        return res
          .status(400)
          .json({ message: "Customer with this email already exists" });
      }
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (phone) customer.phone = phone;
    if (address) customer.address = address;
    if (city) customer.city = city;
    if (state) customer.state = state;
    if (postalCode) customer.postalCode = postalCode;
    if (avatar) customer.avatar = avatar;

    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(`Error updating customer with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Failed to update customer", error: error.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(`Error deleting customer with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Failed to delete customer", error: error.message });
  }
};

// Search customers
exports.searchCustomers = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    res.status(200).json(customers);
  } catch (error) {
    console.error(
      `Error searching customers with query "${req.query.q}":`,
      error
    );
    res
      .status(500)
      .json({ message: "Failed to search customers", error: error.message });
  }
};
