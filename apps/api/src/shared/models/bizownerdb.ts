import { model, Schema } from "mongoose";




const bizownerSchema = new Schema({
    username : {type : String , unique : true},
    password : {type : String },
    isActive : {type : Boolean , default : true} , 

})

const bizowner = model("bizowner" , bizownerSchema)

export default bizowner