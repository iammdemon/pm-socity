import { ICohort } from "./cohort.interface";
import { Cohort } from "./model.cohort";

const createCohortIntoDB = async(payload: ICohort)=>{
    return Cohort.create(payload)
}

const getCohortFromDB = async ()=>{
    return Cohort.find().populate("members", " _id name email username")
}

export const CohortService ={
    createCohortIntoDB,
    getCohortFromDB
}