'use client'

import { IAOutputAPIInterface } from '@/services/ollama/types'
import { useState, useEffect } from 'react'

export default function Chat() {
    const [data, setData] = useState<IAOutputAPIInterface | null>(null)
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
      fetch('/api/ia',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: 'Ceci est un test'})
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data as IAOutputAPIInterface)
          setLoading(false)
        })
    }, [])
   
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
   
    return (
      <div>
        <p>Ceci est un test</p>
        <p>{data.response}</p>
        
      </div>
    )
}