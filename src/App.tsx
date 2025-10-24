import { Toaster } from 'sonner'
import './App.css'
import Game from './components/Game'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { chooseRandomWord } from './utils'
import { WORD_LIST_URL } from './constants'

function App() {
  const [answer, setAnswer] = useState('');
  useEffect(() => {
    async function getWord() {
      try {
        const response = await fetch(WORD_LIST_URL);
        if (!response) {
          toast.error('Error fetch word list')
        }
        const wordList = await response.text();
        const randomWord = chooseRandomWord(wordList.split("\n"));
        setAnswer(randomWord.toUpperCase());

      }
      catch (error) {
        console.error(error)
      }
    }
    getWord();
  }, [])

  return (
    <div className="inline-block my-20">
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4'>Word Game</h1>
      <Toaster richColors position='top-center' />
      <Game answer={answer} />
    </div>
  )
}

export default App
