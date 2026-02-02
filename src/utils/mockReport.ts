import type { BadgeTone, ScanReport } from '../types/report'

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value))
}

/**
 * Deterministic “seed” from a string.
 * Same input -> same output, for demos.
 */
function seedFromString(input: string) {
  let seed = 0
  for (let i = 0; i < input.length; i += 1) {
    seed = (seed + input.charCodeAt(i) * (i + 1)) % 10_000
  }
  return seed
}

function pick<T>(seed: number, options: readonly T[], salt: number) {
  const index = (seed + salt) % options.length
  return options[index]
}

function toneForStatus(label: string, text: string): BadgeTone {
  const good = new Set([
    'Disabled',
    'Locked',
    'Burned',
    'Low',
    'Adequate',
    'No',
    'Stable',
    'Normal',
    'Distributed',
  ])

  const warn = new Set(['Moderate', 'Low']) // note: Low can be good or bad 

  const bad = new Set([
    'Enabled',
    'Not Locked',
    'High',
    'Yes',
    'Unstable',
    'Inconsistent',
    'Concentrated',
  ])

  // Label-specific overrides (because words like “Low” mean different things)
  if (label === 'Liquidity Pool Size' && text === 'Low') return 'warn'
  if (label === 'Coordinated Selling Risk' && text === 'High') return 'bad'
  if ((label === 'Pump Pattern Detected' || label === 'Dump Phase Detected') && text === 'Yes') return 'bad'

  if (bad.has(text)) return 'bad'
  if (good.has(text)) return 'good'
  if (warn.has(text)) return 'warn'
  return 'neutral'
}

function makeItem(label: string, text: string) {
  return {
    label,
    status: {
      text,
      tone: toneForStatus(label, text),
    },
  }
}

export function buildMockReport(tokenAddress: string): ScanReport {
  const normalized = tokenAddress.trim()
  const seed = seedFromString(normalized)

  // Safety score
  const safetyScore = clampScore(95 - (seed % 55)) // 40..95 range
  const safetyLabel = safetyScore >= 70 ? 'Safe' : safetyScore >= 50 ? 'Caution' : 'High Risk'

  // ---- Card 1: Technical Risk Indicators ----
  const mintAuthority = pick(seed, ['Disabled', 'Enabled'] as const, 1)
  const freezeAuthority = pick(seed, ['Disabled', 'Enabled'] as const, 2)
  const liquidityLock = pick(seed, ['Locked', 'Burned', 'Not Locked'] as const, 3)
  const top10Concentration = pick(seed, ['Low', 'Moderate', 'High'] as const, 4)
  const creatorSupplyShare = pick(seed, ['Low', 'Moderate', 'High'] as const, 5)
  const liquidityPoolSize = pick(seed, ['Adequate', 'Low'] as const, 6)

  // ---- Card 2: Insider Behaviour Analysis ----
  const earlyInsiderAccumulation = pick(seed, ['Low', 'Moderate', 'High'] as const, 7)
  const insiderDistributionDetected = pick(seed, ['No', 'Yes'] as const, 8)
  const coordinatedSellingRisk = pick(seed, ['Low', 'High'] as const, 9)

  // ---- Card 3: Market Behaviour (Price and Volume) ----
  const pumpPattern = pick(seed, ['No', 'Yes'] as const, 10)
  const dumpPhase = pick(seed, ['No', 'Yes'] as const, 11)
  const volumeStability = pick(seed, ['Stable', 'Unstable'] as const, 12)

  // ---- Card 4: Liquidity Behaviour Consistency ----
  const liqVolConsistency = pick(seed, ['Normal', 'Inconsistent'] as const, 13)
  const lpDominance = pick(seed, ['Distributed', 'Concentrated'] as const, 14)
  const postPeakRisk = pick(seed, ['Low', 'High'] as const, 15)

  return {
    tokenName: 'DEMO Token',
    tokenSymbol: 'DEMO',
    tokenAddress: normalized,

    safetyScore,
    safetyLabel,
    summary: 'Overall token safety based on technical, behavioural, market, and liquidity consistency signals.',

    sections: [
      {
        title: 'Technical Risk Indicators',
        items: [
          makeItem('Mint Authority', mintAuthority),
          makeItem('Freeze Authority', freezeAuthority),
          makeItem('Liquidity Lock Status', liquidityLock),
          makeItem('Top 10 Holder Concentration', top10Concentration),
          makeItem('Creator Supply Share', creatorSupplyShare),
          makeItem('Liquidity Pool Size', liquidityPoolSize),
        ],
      },
      {
        title: 'Insider Behaviour Analysis',
        items: [
          makeItem('Early Insider Accumulation', earlyInsiderAccumulation),
          makeItem('Insider Distribution Detected', insiderDistributionDetected),
          makeItem('Coordinated Selling Risk', coordinatedSellingRisk),
        ],
      },
      {
        title: 'Market Behaviour (Price and Volume)',
        items: [
          makeItem('Pump Pattern Detected', pumpPattern),
          makeItem('Dump Phase Detected', dumpPhase),
          makeItem('Volume Stability', volumeStability),
        ],
      },
      {
        title: 'Liquidity Behaviour Consistency',
        items: [
          makeItem('Liquidity to Volume Consistency', liqVolConsistency),
          makeItem('Liquidity Provider Dominance', lpDominance),
          makeItem('Post-Peak Liquidity Risk', postPeakRisk),
        ],
      },
    ],
  }
}