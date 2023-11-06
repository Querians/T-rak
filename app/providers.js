'use client'

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers = ({ children }) => {
    const [queryClient] = useState(
        () => new QueryClient(
            {
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5,
                        refetchOnWindowFocus: false,
                    },
                },
            }
        ))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers;