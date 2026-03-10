import { Totalhits , Hitsbyendpoint ,avglatperendpoint , errorrateperendpoint } from "./analyticsrepo.js"

export const gettotalhits = async () => {
    const thetotalhits = await Totalhits()

    return thetotalhits
}

export const getHitsByEndpoint = async () => {
    const theHitsbyEndpoint = await  Hitsbyendpoint()

    return theHitsbyEndpoint
}

export const getAvgLatency = async () => {
    const theAvgLatency = await  avglatperendpoint()

    return theAvgLatency

}

export const getErrorRate = async () => {
    const theErrorRate = await  errorrateperendpoint()

return theErrorRate
}