import Department from "../models/department.js";
import Employee from "../models/employee.js"
import Leave from "../models/leave.js";

const getSummary = async (req,res) => {
    try{
        const totalEmployees=await Employee.countDocuments();

        const totalDepartments=await Department.countDocuments();

        const totalSalaries=await Employee.aggregate([
            {$group:{_id:null,totalSalary:{$sum:"$salary"}}}
        ])

        const employeeAppliedForLeave=await Leave.distinct('employeeId')

        const leaveStatus=await Leave.aggregate([
            {$group:{
                _id:"$status",
                count:{$sum:1}
            }}
        ])

        const leaveSummary={
            appliedFor:employeeAppliedForLeave.length,
            approved:leaveStatus.find(item => item._id ==="Approved")?.count || 0,
            rejected:leaveStatus.find(item => item._id ==="Rejected")?.count || 0,
            pending:leaveStatus.find(item => item._id ==="Pending")?.count || 0,
        }

        return res.status(200).json({
            success:true,
            totalEmployees,
            totalDepartments,
            totalSalary:totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })
    }catch(error){
        return res.status(500).json({succes:false,error:"Dashboard summary error"})
    }
}

export {getSummary}