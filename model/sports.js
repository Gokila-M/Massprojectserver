import mongoose from "mongoose";

const sports =  new mongoose.Schema({
    sportsName:{
        type:String,
        required: true,
    },
    sportStartTime:{
        type:String,
        required: true
    },
    sportStartDate:{
        type : Date, 
        required: true
    },
    registerStartDate:{
        type : Date, 
        required: true
    },
    registerEndDate:{
        type : Date, 
        required: true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlock:{
        type:Boolean,
        default:false
    }            
},  {
    timestamps: true
}
)
const Sports=mongoose.model('Sports',sports)
export default Sports;