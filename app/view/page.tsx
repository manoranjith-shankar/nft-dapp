import FetchOwnedTokens from '@/components/FetchTokens'
import React from 'react'

const ViewPage = () => {
  return (
    <div>
        <p className="text-large font-bold mb-3">
            View NFTs owned
        </p>
        <FetchOwnedTokens />
    </div>
  )
}

export default ViewPage