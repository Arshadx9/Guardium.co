import mongoose, { model, Schema } from "mongoose";


const apikeySchema = new Schema({
    key : {type : String , required : true},
    clientID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'bizowner'
    },
    isActive : {type : Boolean , default: true},

    expiresAt : {
    type : Date , 

    default : () =>{
        return new Date( Date.now() +  365 * 24 * 60 * 60 * 1000)
    }

    },

    name : {type : String , required : true} , 

    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : 'bizowner' , required : true },

    


} , {timestamps : true})

const apikey = model("apikey" , apikeySchema)

export default apikey