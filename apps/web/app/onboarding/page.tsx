"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = "http://13.63.45.239:5000"

const Onboarding = () => {
    const [copied, setCopied] = useState(false)
    const [apiKey, setApiKey] = useState("")

    useEffect(() => {
        const loadOnboardingData = async () => {
            try {
                await axios.post(`${API_URL}/api/auth/complete-onboarding`, {}, {
                    withCredentials: true
                })

                const res = await axios.get(`${API_URL}/api/client/getapikey`, {
                    withCredentials: true
                })

                setApiKey(res.data?.data?.apikey?.key ?? "")
            } catch (error) {
                console.error("Failed to load onboarding data", error)
                setApiKey("")
            }
        }

        loadOnboardingData()
    }, [])

    async function handleCopy() {
        await navigator.clipboard.writeText(apiKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-[rgb(240,235,229)] flex flex-col items-center justify-center gap-8 px-4">
            <h1 className="text-4xl font-editorial text-black">Your API Key</h1>
            <p className="text-gray-500 text-center max-w-xl">
                Copy this key and embed it in your backend using the Guardium SDK
            </p>

            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3 w-full max-w-lg gap-4">
                <span className="flex-1 text-sm font-mono text-gray-700 truncate">
                    {apiKey || "Loading..."}
                </span>
                <button
                    onClick={handleCopy}
                    className="text-sm px-3 py-1 bg-black text-white rounded-md shrink-0"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <a href="/dashboard" className="px-6 py-3 bg-black text-white rounded-lg text-sm">
                Go to Dashboard
            </a>
        </div>
    )
}

export default Onboarding