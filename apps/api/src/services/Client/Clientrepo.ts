import apikey from "../../shared/models/apikeys.js"
import bizowner from "../../shared/models/bizownerdb.js"


export const findApiKeyByClientId = async (clientId: string) => {
    return await apikey.findOne({ clientID: clientId })
                                
}

export const findprofile = async ( ClientID : string ) => {
    return await bizowner.findById(ClientID).select('-password')
}