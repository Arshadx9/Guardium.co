import apihit from "../../shared/models/apihits.js"

export const Totalhits = async () => {
    return await apihit.countDocuments()
}

export const Hitsbyendpoint = async () => {
    return await apihit.aggregate([
        { $group: { _id: "$endpoint", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ])
}

export const avglatperendpoint = async () => {
    return await apihit.aggregate([
        { $group: { _id: "$endpoint", count: { $sum: 1 }, avgLatency: { $avg: "$latencyMs" } } },
        { $sort: { avgLatency: -1 } }
    ])
}

export const errorrateperendpoint = async () => {
    return await apihit.aggregate([
        {
            $group: {
                _id: "$endpoint",
                totalHits: { $sum: 1 },
                errorCount: {
                    $sum: {
                        $cond: [{ $gte: ["$statusCode", 400] }, 1, 0]
                    }
                }
            }
        },
        {
            $project: {
                errorRate: {
                    $multiply: [
                        { $divide: ["$errorCount", "$totalHits"] },
                        100
                    ]
                }
            }
        }
    ])
}