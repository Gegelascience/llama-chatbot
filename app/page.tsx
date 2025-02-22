import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <Link className='px-2 py-1 rounded-md bg-sky-500 hover:bg-sky-700 text-white' href="/chat">Discuss with llama or Mistral</Link>
      <Link className='px-2 py-1 rounded-md bg-sky-500 hover:bg-sky-700 text-white' href="/rag">Test Rag with log</Link>
    </div>
  );
}
