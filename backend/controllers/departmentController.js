import Department from "../models/department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name) {
      return res.status(400).json({
        success: false,
        error: "Department name is required",
      });
    }

    const existingDepartment = await Department.findOne({ dep_name });
    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        error: "Department with this name already exists",
      });
    }

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();
    return res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "Duplicate department name",
      });
    }

    console.error("Department creation error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to create department. Please try again later.",
    });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      {
        dep_name,
        description,
      }
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "edit department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedep = await Department.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, deletedep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "delete department server error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
