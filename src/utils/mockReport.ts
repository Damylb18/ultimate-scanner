import type { ScanReport } from "../types/report";

function clampScore(value: number){
    return Math.max(0, Math.min(100, value))
}

export function buildMockReport(tokenAddress: string): ScanReport{
    //Deterministic mock so same input gives same output
    const base = clampScore(100 - (tokenAddress.trim().length % 60))

    const safetyScore = base
    const safetyLabel = safetyScore >= 70 ? 'Safe' : safetyScore >= 40 ? 'Caution' : 'High Risk'

    return{
        tokenName: 'DEMO Token',
        tokenSymbol: 'DEMO',
        tokenAddress,

        safetyScore,
        safetyLabel,
        summary: 'Overall token safety based on technical and behaviuoral analysis',

        sections:[
            {
                title: 'Contract Analysis',
                items: [
                    {label: 'Ownership Status', status: { text: 'Renounced', tone: 'good' }},
                    { label: 'Mint Authority', status: { text: 'Disabled', tone: 'good' } },
                    { label: 'Liquidity Lock', status: { text: 'Partial', tone: 'warn' } },
                    { label: 'Contract Verified', status: { text: 'Verified', tone: 'good' } },
                ],
            },
            {
                title: 'Behavioural Indicators',
                items: [
                     { label: 'Top Holder Behaviour', status: { text: 'Normal', tone: 'good' } },
                     { label: 'Sell Pressure', status: { text: 'Low', tone: 'good' } },
                     { label: 'Wallet Clustering', status: { text: 'Moderate', tone: 'warn' } },
                     { label: 'Unusual Activity', status: { text: 'None Detected', tone: 'good' } },
                ],
            },
        ],
    }
}