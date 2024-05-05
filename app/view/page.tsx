import FetchOwnedTokens from '@/components/FetchTokens'
import React from 'react'

export default function Page() {
  return (
    <div>
        <p className="text-large font-bold mb-3">
            View NFTs owned
        </p>
        <FetchOwnedTokens />
    </div>
  )
};