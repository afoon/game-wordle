import { Toaster } from 'sonner'
import Game from './components/Game'
import { AnswerProvider } from './contexts/AnswerContext'
import Settings from './components/Settings'
import { KeyboardProvider } from './contexts/KeyboardContext'
import { GameModeProvider } from './contexts/GameModeContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ScaffoldingIcon from '@/assets/icons/scaffolding.svg?react'
import WordGameIcon from '@/assets/icons/wordGame.svg?react'
import { useGameMode } from './contexts'


const Header = () => {
  const { gameMode } = useGameMode();
  return (
    <div className='flex justify-center items-baseline gap-2'>
      {gameMode === 'Normal' ? <WordGameIcon width={32} height={32} /> : <ScaffoldingIcon style={{ transform: 'rotate(10deg)' }} width={40} height={40} />}
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4'>
        {gameMode === 'Normal' ? 'Wordle' : 'Scaffoldle'}
      </h1>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="flex justify-center gap-10">
        <GameModeProvider>
          <KeyboardProvider>
            <div className="inline-block my-20">
              <Toaster richColors position='top-center' />
              <Header />
              <AnswerProvider>
                <Game />
              </AnswerProvider>
            </div>
            <div className='flex justify-end mt-8'>
              <Settings />
            </div>
          </KeyboardProvider>
        </GameModeProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
