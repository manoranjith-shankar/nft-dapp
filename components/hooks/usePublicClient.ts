"use client"

import { createPublicClient, http } from 'viem'
import { polygonAmoy } from 'viem/chains'
 
const publicClient = createPublicClient({ 
  chain: polygonAmoy,
  transport: http()
})

export default publicClient;