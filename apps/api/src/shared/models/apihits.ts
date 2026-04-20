
import mongoose, { model, Schema } from "mongoose"

const apihitSchema = new Schema({

bizname :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'bizowner'
},

keyname : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'apikey'
},


endpoint : {
    type: String , 
    required : true 
},
 method : {
    type : String , 
    required : true 
 },

 statusCode : {
    type : Number ,
    required : true 
 },

 latencyMs : {
   type : Number ,
    required : true  
 } ,
 ip :{
    type : String , 
    required : true 
 },

 timestamp :{
    type : Date ,
    required : true 
 }

}, {
    timestamps:true
}) 


apihitSchema.index({ clientId: 1, timestamp: -1 })
apihitSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 })

const apihit = model("apihit" , apihitSchema)

export default apihit