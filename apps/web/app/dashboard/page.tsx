"use client"
import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = "http://13.63.125.183:5000"

type EndpointHit = {
    endpoint: string
    count: number
}

export default function DashboardPage() {

    const [totalHits, setTotalHits] = useState(0)
    const [hitsbyendpoint, sethitsbyendpoint] = useState<EndpointHit[]>([])
    const [avglatency, setavglatency] = useState(0)
    const [errorrate, seterrorrate] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hitsRes, endpointRes, latencyRes, errorRes] = await Promise.all([
                    axios.get(`${API_URL}/api/analytics/totalhits`, { withCredentials: true }),
                    axios.get(`${API_URL}/api/analytics/hitsbyend`, { withCredentials: true }),
                    axios.get(`${API_URL}/api/analytics/avglatency`, { withCredentials: true }),
                    axios.get(`${API_URL}/api/analytics/errorrate`, { withCredentials: true }),
                ])

                setTotalHits(hitsRes.data.data.yourhits)
                sethitsbyendpoint(endpointRes.data.data.yourhits)
                setavglatency(latencyRes.data.data.yourlatency)
                seterrorrate(errorRes.data.data.yourrate)
            } catch (error) {
                console.error("Failed to fetch analytics", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-[rgb(240,235,229)] flex items-center justify-center">
                <p className="font-mono text-black">Loading...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[rgb(240,235,229)] p-10">
            <h1 className="font-mono text-4xl text-black mb-10">Dashboard</h1>

            <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="font-mono text-sm text-gray-500 mb-1">Total Hits</p>
                    <p className="font-mono text-4xl text-black">{totalHits}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="font-mono text-sm text-gray-500 mb-1">Avg Latency</p>
                    <p className="font-mono text-4xl text-black">{avglatency}ms</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="font-mono text-sm text-gray-500 mb-1">Error Rate</p>
                    <p className="font-mono text-4xl text-black">{errorrate}%</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="font-mono text-sm text-gray-500 mb-1">Endpoints Tracked</p>
                    <p className="font-mono text-4xl text-black">{hitsbyendpoint.length}</p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <p className="font-mono text-sm text-gray-500 mb-4">Hits by Endpoint</p>
                {hitsbyendpoint.length === 0 ? (
                    <p className="font-mono text-sm text-gray-400">No data yet</p>
                ) : (
                    hitsbyendpoint.map((item: EndpointHit, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <p className="font-mono text-sm text-black">{item.endpoint}</p>
                            <p className="font-mono text-sm text-gray-500">{item.count} hits</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}