
'use client'

import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'wagmi/chains'
import { type ReactNode } from 'react'

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'base',
          name: 'KeyChat',
          logo: '/keychat-logo.png',
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  )
}
