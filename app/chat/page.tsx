'use client'

import { IAOutputAPIInterface } from '@/services/ollama/types'
import { useState, useEffect, FormEvent } from 'react'

export default function Chat() {
    const [data, setData] = useState<IAOutputAPIInterface | null>(null)
    const [isLoading, setLoading] = useState(true)


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget)
      setLoading(true)
      const res = await fetch('/api/ia',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: formData.get('prompt')})
      })
      const iaAnswer = await res.json()
      setData(iaAnswer as IAOutputAPIInterface)
      setLoading(false)

    }
   
    return (
      <div>

        <form onSubmit={onSubmit}>
          <input className='border-2 border-black' type="text" name="prompt" />
          <button className='border-2 border-black' type="submit">Ask IA</button>
        </form>
        <p>{data?data.response:""}</p>
          
      </div>
    )
}