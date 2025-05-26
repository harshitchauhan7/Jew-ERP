const express = require("express");
const router = express.Router();
// import * as StonesController from '../Controllers/StoneController.js';
// Import all routers
const MetalsController = require("../Controllers/MetalsController");
const DashboardController = require("../Controllers/DashboardController");
const CustomerController = require("../Controllers/CustomerController");
const UserController = require("../Controllers/UserController");
const AuthRouter = require("./AuthRouter"); // ✅ IMPORT AUTH ROUTER
const StonesController = require("./../Controllers/StoneController");
const ImageController = require("../Controllers/ImageController");
// ✅ Use the AuthRouter at '/auth'
router.use("/auth", AuthRouter); // ✅ This line mounts /auth/login & /auth/signup
//Creat image orute
router.get("uplaodImage", ImageController.uplaodImage);
// Metals routes
router.get("/metals", MetalsController.getAllMetals);
router.get("/metals/:id", MetalsController.getMetalById);
router.post("/metals", MetalsController.createMetal);
router.put("/metals/:id", MetalsController.updateMetal);
router.put("/metals/:id/price", MetalsController.updateMetalPrice);
router.delete("/metals/:id", MetalsController.deleteMetal);

// Stones routes
router.get("/stones", StonesController.getAllStones);
router.get("/stones/:id", StonesController.getStoneById);
router.post("/stones", StonesController.postStone);
router.put("/stones/:id", StonesController.updateStone);
router.put("/stones/:id/price", StonesController.updateStonePrice);
router.delete("/stones/:id", StonesController.deleteStone);

// Dashboard routes
router.get("/dashboard", DashboardController.getDashboardData);
router.get("/sales/graph", DashboardController.getSalesGraphData);
router.get("/analytics", DashboardController.getAnalyticsData);

// Customer routes
router.get("/customers", CustomerController.getAllCustomers);
router.get("/customers/recent", CustomerController.getRecentCustomers);
router.get("/customers/search", CustomerController.searchCustomers);
router.get("/customers/:id", CustomerController.getCustomerById);
router.post("/customers", CustomerController.createCustomer);
router.put("/customers/:id", CustomerController.updateCustomer);
router.delete("/customers/:id", CustomerController.deleteCustomer);

// User routes
router.get("/user/profile", UserController.getUserProfile);
router.put("/user/profile", UserController.updateUserProfile);
router.put("/user/change-password", UserController.changePassword);
router.post("/user/profile-picture", UserController.uploadProfilePicture);

module.exports = router;
