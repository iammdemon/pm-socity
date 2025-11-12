import catchAsync from "../../utils/catchAsync";
import { CohortService } from "./service.cohort";

const createCohort = catchAsync(async(req, res)=>{
    const result = await CohortService.createCohortIntoDB(req.body)
    res.status(201).json({ message: "Cohort created successfully", data: result });
})

const getCohort = catchAsync(async(req, res)=>{
const result = await CohortService.getCohortFromDB()
res.status(200).json({message:"Cohorts Fetched successfully",data: result});
})


export const CohortController ={
    createCohort,
    getCohort
}