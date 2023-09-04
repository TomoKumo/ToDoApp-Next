'use client'

import { CacheProvider } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import { cache } from '@emotion/css'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider value={cache}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}
