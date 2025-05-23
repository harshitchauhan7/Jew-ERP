const Metal = require("../Models/Metal");
const Sale = require("../Models/Sale");
const Customer = require("../Models/Customer");
const Order = require("../Models/Order");

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    // Get metals
    const metals = await Metal.find().limit(4);

    // Get recent customers
    const customers = await Customer.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name phone avatar");

    // Get sales data for graph (monthly by default)
    const period = req.query.period || "monthly";
    const salesData = await getSalesGraphData(period);

    // Get analytics data
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const analyticsData = await getAnalyticsData(date);

    res.status(200).json({
      metals,
      customers,
      salesData,
      analyticsData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

// Get sales graph data
exports.getSalesGraphData = async (req, res) => {
  try {
    const period = req.query.period || "monthly";
    const data = await getSalesGraphData(period);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching sales graph data:", error);
    res.status(500).json({
      message: "Failed to fetch sales graph data",
      error: error.message,
    });
  }
};

// Get analytics data
exports.getAnalyticsData = async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const data = await getAnalyticsData(date);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({
      message: "Failed to fetch analytics data",
      error: error.message,
    });
  }
};

// Helper function to get sales graph data
const getSalesGraphData = async (period) => {
  const salesMade = [];
  const productsSold = [];

  if (period === "daily") {
    // Group by hour for the current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const salesByHour = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: { $hour: "$createdAt" },
          totalSales: { $sum: "$amount" },
          totalProducts: { $sum: "$quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in missing hours
    for (let i = 0; i < 24; i++) {
      const hourData = salesByHour.find((item) => item._id === i);

      const hour = i < 10 ? `0${i}:00` : `${i}:00`;

      salesMade.push({
        hour,
        value: hourData ? hourData.totalSales : 0,
      });

      productsSold.push({
        hour,
        value: hourData ? hourData.totalProducts : 0,
      });
    }
  } else if (period === "weekly") {
    // Group by day for the current week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const salesByDay = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalSales: { $sum: "$amount" },
          totalProducts: { $sum: "$quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in missing days
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      // MongoDB's $dayOfWeek returns 1 for Sunday, 2 for Monday, etc.
      const dayData = salesByDay.find((item) => item._id === i + 1);

      salesMade.push({
        day: days[i],
        value: dayData ? dayData.totalSales : 0,
      });

      productsSold.push({
        day: days[i],
        value: dayData ? dayData.totalProducts : 0,
      });
    }
  } else {
    // Group by month for the current year
    const startOfYear = new Date();
    startOfYear.setMonth(0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    const endOfYear = new Date();
    endOfYear.setMonth(11, 31);
    endOfYear.setHours(23, 59, 59, 999);

    const salesByMonth = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$amount" },
          totalProducts: { $sum: "$quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in missing months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < 12; i++) {
      // MongoDB's $month returns 1 for January, 2 for February, etc.
      const monthData = salesByMonth.find((item) => item._id === i + 1);

      salesMade.push({
        month: months[i],
        value: monthData ? monthData.totalSales : 0,
      });

      productsSold.push({
        month: months[i],
        value: monthData ? monthData.totalProducts : 0,
      });
    }
  }

  return { salesMade, productsSold };
};

// Helper function to get analytics data
const getAnalyticsData = async (dateString) => {
  const date = new Date(dateString);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Get previous day for comparison
  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  const startOfPreviousDay = new Date(previousDay);
  startOfPreviousDay.setHours(0, 0, 0, 0);

  const endOfPreviousDay = new Date(previousDay);
  endOfPreviousDay.setHours(23, 59, 59, 999);

  // Get sales data for current day
  const currentDaySales = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$amount" },
        totalProducts: { $sum: "$quantity" },
      },
    },
  ]);

  // Get sales data for previous day
  const previousDaySales = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfPreviousDay, $lte: endOfPreviousDay },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$amount" },
        totalProducts: { $sum: "$quantity" },
      },
    },
  ]);

  // Get customer visits for current day
  const currentDayCustomers = await Order.distinct("customer", {
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  // Get customer visits for previous day
  const previousDayCustomers = await Order.distinct("customer", {
    createdAt: { $gte: startOfPreviousDay, $lte: endOfPreviousDay },
  });

  // Calculate percentage changes
  const currentDaySalesValue =
    currentDaySales.length > 0 ? currentDaySales[0].totalSales : 0;
  const previousDaySalesValue =
    previousDaySales.length > 0 ? previousDaySales[0].totalSales : 0;
  const salesChange =
    previousDaySalesValue === 0
      ? 100
      : Math.round(
          ((currentDaySalesValue - previousDaySalesValue) /
            previousDaySalesValue) *
            100
        );

  const currentDayProductsValue =
    currentDaySales.length > 0 ? currentDaySales[0].totalProducts : 0;
  const previousDayProductsValue =
    previousDaySales.length > 0 ? previousDaySales[0].totalProducts : 0;
  const productsChange =
    previousDayProductsValue === 0
      ? 100
      : Math.round(
          ((currentDayProductsValue - previousDayProductsValue) /
            previousDayProductsValue) *
            100
        );

  const currentDayCustomersValue = currentDayCustomers.length;
  const previousDayCustomersValue = previousDayCustomers.length;
  const customersChange =
    previousDayCustomersValue === 0
      ? 100
      : Math.round(
          ((currentDayCustomersValue - previousDayCustomersValue) /
            previousDayCustomersValue) *
            100
        );

  return {
    salesMade: {
      value: currentDaySalesValue,
      change: salesChange,
    },
    productsSold: {
      value: currentDayProductsValue,
      change: productsChange,
    },
    customersVisited: {
      value: currentDayCustomersValue,
      change: customersChange,
    },
  };
};
