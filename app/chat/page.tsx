'use client'

import { IAOutputAPIInterface } from '@/services/ollama/types'
import { useState, useEffect, FormEvent } from 'react'

export default function Chat() {
    const [answer, setAnswer] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)


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
      const iaAnswer = await res.json() as IAOutputAPIInterface
      setAnswer(iaAnswer.response)
      setLoading(false)

    }
   
    return (
      <div className='flex flex-col items-center h-screen '>
        <div className='mt-10 h-96'>
          {isLoading &&
            <p>Loading...</p>
          }
          {!isLoading &&
            <p>{answer?answer:""}</p>
          } 
        </div>
        
        <form className='grid grid-flow-row grid-cols-6 gap-4 bottom-0' onSubmit={onSubmit}>
          <textarea className='border-2 border-black rounded-md col-span-5' name="prompt" cols={50} />
          <button className='bg-sky-500 hover:bg-sky-700 text-white px-2 py-1 rounded-md col-span-1' type="submit">Ask IA</button>
        </form>
        
          
      </div>
    )
}