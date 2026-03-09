import apikeys from "../../shared/models/apikeys.js"


export const findapikey = async (apikey : string) => {
  
    return await apikeys.findOne({
        key : apikey
    })
}