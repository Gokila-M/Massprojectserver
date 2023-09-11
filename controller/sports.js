import { captialtheFirstLetter } from "../config/firstletter.js";
import Sports from "../model/sports.js";

export const createSports = async (req, res) => {
    const Body = req.body; 
    let sportsName = captialtheFirstLetter(Body.sportsName);
    let exsportsName = await Sports.findOne({ sportsName: sportsName });  
    if (exsportsName)
      return res.status(400).json({ message: "SportsName already register" });    
      try {
        let createSports = new Sports({          
          sportsName: sportsName,          
          sportStartTime: Body.sportStartTime,
          sportStartDate: Body.sportStartDate,
          registerStartDate: Body.registerStartDate,       
          registerEndDate: Body.registerEndDate,
          isActive:Body.isActive,
          isBlock:Body.isBlock
        });
        let sports = await createSports.save();
        res.status(201).json({ message: "Sports created  success", userId: sports._id });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
   
  };

  export const updateSports = async (req, res) => {
    let { sportsName, sportStartTime, sportStartDate, registerStartDate, registerEndDate,isActive,isBlock } = req.body;
    try {
      const users = await Sports.findById({ _id: req.params.id });
      if (!users) return res.status(400).json({ message: "users not found" });
      if( !email && !firstName && !password && !gender && !lastName && !dob ){
        return res.status(400).json({ message: "lease edit Something to update" });
      }
      let resp = await Sports.findByIdAndUpdate(
        { _id: req.params.id },
        {
          sportsName: sportsName,          
          sportStartTime: Body.sportStartTime,
          sportStartDate: Body.sportStartDate,
          registerStartDate: Body.registerStartDate,       
          registerEndDate: Body.registerEndDate,
          isActive:Body.isActive,
          isBlock:Body.isBlock,
        },{new:true}
      );
      if (!resp) {
        return res.status(400).json({ message: "something went wrong" });
      }
      else{
        return res.status(200).json({ message: "User update successfully" ,Data:resp});
      }
   
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };