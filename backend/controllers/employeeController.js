import Employee from "../models/employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import multer from "multer";
import fs from "fs";
import validator from "validator";

// Ensure public/uploads directory exists
const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage and configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    }
    cb(new Error("Only image files (jpeg, jpg, png) are allowed"));
  },
});

// Add Employee
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !employeeId) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Validate password strength
    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
      return res.status(400).json({ success: false, error: "Password is too weak" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already registered" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    // Create new employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();

    return res.status(201).json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    return res.status(500).json({ success: false, error: "Server error in adding employee" });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    return res.status(500).json({ success: false, error: "Server error in fetching employees" });
  }
};

// Get Single Employee
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    return res.status(500).json({ success: false, error: "Server error in fetching employee" });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await User.findByIdAndUpdate(employee.userId, { name });
    await Employee.findByIdAndUpdate(id, { maritalStatus, designation, department, salary });

    return res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    return res.status(500).json({ success: false, error: "Server error in updating employee" });
  }
};

// Fetch Employees by Department ID
const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees by department ID:", error.message);
    return res.status(500).json({ success: false, error: "Server error in fetching employees" });
  }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };
