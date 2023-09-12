import mongoose from "mongoose";

const usersportsmapping =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sportsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports',
    },
   
},
{
    timestamps: true,
}
);


const Usersportsmapping=mongoose.model('Usersportsmapping',usersportsmapping)
export default Usersportsmapping;