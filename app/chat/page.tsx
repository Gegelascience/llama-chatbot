'use client'

import { IAOutputAPIInterface } from '@/services/ollama/types'
import { useState, useEffect, FormEvent } from 'react'
import {MsgBox, MsgBoxProps} from '../../components/MsgBox';

export default function Chat() {
    const [answer, setAnswer] = useState<string | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [chatMsgs, setchatMsgs] = useState<MsgBoxProps[]>([])


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      
   
      const formData = new FormData(event.currentTarget)
      const requestUser = formData.get('prompt');
      const model = formData.get('model');
      chatMsgs.push({
        msg: requestUser? requestUser.toString(): "", 
        isUser: true, 
        index: chatMsgs.length
      })

      
      setLoading(true)
      const res = await fetch('/api/ia',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.get('prompt'),
          model:model
        })
      })
      const iaAnswer = await res.json() as IAOutputAPIInterface
      setAnswer(iaAnswer.response)
      chatMsgs.push({msg: iaAnswer.response, isUser: false, index: chatMsgs.length})
      setLoading(false)

    }
   
    return (
      <div className='flex flex-col items-center h-screen '>
        <div className='max-h-8/10'>
        { chatMsgs.map((msg, index) => (
           <MsgBox msg={msg.msg} isUser={msg.isUser} index={msg.index} />

        ))
        }
        </div>
        <div className='mt-10 h-96'>
          {isLoading &&
            <p>Loading...</p>
          }
        </div>
        
        <form className='grid grid-flow-row grid-cols-6 gap-4 bottom-0' onSubmit={onSubmit}>
          
          <input type="radio" required id="llama" name="model" value="llama3.2"/>
          <label htmlFor="llama">Llama 3.2</label><br/>
          <input type="radio" id="mistral" name="model" value="mistral"/>
          <label htmlFor="mistral">Mistral</label><br/>
          
          <textarea className='border-2 border-black rounded-md col-span-5' name="prompt" cols={50} />        
          <button className='bg-sky-500 hover:bg-sky-700 text-white px-2 py-1 rounded-md col-span-1' type="submit">Ask IA</button>
        </form>
        
          
      </div>
    )
}