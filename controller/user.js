import { captialtheFirstLetter } from "../config/firstletter.js";
import User, { validateUser } from "../model/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
//-------------------------------------------------------------(USER)------------------------------------------------------------------------
export const getAllUser = async (req, res) => {
  try {
    const view = await User.find().select("-password");
    res.status(200).json({ data: view });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    let found = await User.findById({ _id: req.params.id });
    if (!found) return res.status(400).json({ message: "user not found" });
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const ownerReg = async (req, res) => {
  const saltRounds = 10;
  const val = validateUser(req.body);
  if (val) return res.status(400).json({ message: val.error });
  if (!req.body.password)
    return res.status(400).json({ message: "please enter password" });
  let email = req.body.email;
  let firstName = captialtheFirstLetter(req.body.firstName);
  let lastName = captialtheFirstLetter(req.body.lastName);
  let exUserPhone = await User.findOne({ mobileNo: req.body.mobileNo });
  let exUserEmail = await User.findOne({ email: email });
  if (exUserEmail) return res.json({ message: "email already register" });
  if (exUserPhone) return res.json({ message: "Phone No already exists" });

  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      let register = new User({
        email: email?.toLowerCase(),
        password: hash,
        firstName: firstName,
        lastName: lastName,
        dob: req.body.dob,
        gender: req.body.gender?.toLowerCase(),
        bloodGroup: req.body.bloodGroup,
        marriageStatus: req.body.marriageStatus?.toLowerCase(),
        mobileNo: req.body.mobileNo,
        roleId: req.body.roleId,
        isOwner: true,
      });
      await register.save();
      res.status(201).json({ message: "Owner register success" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createRegister = async (req, res) => {
  const Body = req.body;
  // let obj = await checkAccessCreate(req.user, menuId);
  // if (obj.access == false && obj.message !== null)
  //   return res.status(obj.status).json({ message: obj.message });
  const saltRounds = 10;
  const val = validateUser(req.body);
  if (val) return res.status(400).json({ message: val.error });
  // if (!req.body.password)
  //   return res.status(400).json({ message: "please enter password" });
  let email = req.body.email;
  let firstName = captialtheFirstLetter(Body.firstName);
  let lastName = captialtheFirstLetter(Body.lastName);
  let exUserPhone = await User.findOne({ mobileNo: Body.mobileNo });
  let exUserEmail = await User.findOne({ email: email });
  if (exUserEmail)
    return res.status(400).json({ message: "email already register" });
  if (exUserPhone)
    return res.status(400).json({ message: "Phone No already exists" });
  bcrypt.hash(Body.password, saltRounds, async (err, hash) => {
    try {
      let register = new User({
        email: email?.toLowerCase(),
        password: hash,
        firstName: firstName,
        lastName: lastName,
        dob: Body.dob,
        gender: Body.gender?.toLowerCase(),
        bloodGroup: Body.bloodGroup,       
        mobileNo: Body.mobileNo,
      });
      let user = await register.save();
      res.status(201).json({ message: "Register success", userId: user._id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const login = async (req, res) => {
  const Body = req.body;
  let email = Body.email?.toLowerCase();
  let foundUser = await User.findOne({ email: email });
  if (!Body.email)
    return res.status(400).json({ message: "please enter email" });
  if (!Body.password)
    return res.status(400).json({ message: "please enter password" });
  if (foundUser) {
    if (foundUser.isOwner == false && foundUser.isActive == false)
      return res.status(400).json({ message: "your are not active user" });
    if (foundUser.isOwner == false && foundUser.isBlock == true)
      return res.status(400).json({ message: "your are blocked user" });
    bcrypt.compare(Body.password, foundUser.password, (err, result) => {
      if (result) {
        try {
          const token = jwt.sign({ id: foundUser?._id }, process.env.JWT, {
            expiresIn: "12h",
          });
          res
            .header("token", token)
            .json({ message: "login successfully", token: token });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      } else {
        res.status(400).json({ message: "please enter correct password" });
      }
    });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

export const profile = async (req, res) => {
  try {
    const view = await User.findById({ _id: req.user.id }).select("-password");
    if (!view) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ data: view });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const view = await User.findById({ _id: req.params.id }).select(
      "-password"
    );
    res.status(200).json({ data: view });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  let { email, password, gender, firstName, lastName, dob } = req.body;
  try {
    const users = await User.findById({ _id: req.params.id });
    if (!users) return res.status(400).json({ message: "users not found" });
    if( !email && !firstName && !password && !gender && !lastName && !dob ){
      return res.status(400).json({ message: "lease edit Something to update" });
    }
    let resp = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        dob: dob,
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
