import apihit from "../../shared/models/apihits.js"


export const Totalhits = async () => {
 return await apihit.countDocuments()
}

export const Hitsbyendpoint = async () => {
    return await apihit.aggregate(
        [
            {$group: { _id : "$endpoint" , count : {$sum : 1}      }},
         { $sort : {count : -1} }
        ]
    )
}