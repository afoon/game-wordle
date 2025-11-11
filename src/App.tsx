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
import WelcomeModal from './components/Game/Modals/WelcomeModal'


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
      <GameModeProvider>
        <WelcomeModal/>
        <KeyboardProvider>
          <div className="flex justify-center gap-2 md:gap-10 flex-wrap-reverse  mt-2
           sm:mt-26 w-full">
            <div className="inline-block max-w-full">
              <Toaster richColors position='top-center' />
              <Header />
              <AnswerProvider>
                <Game />
              </AnswerProvider>
            </div>
            <div className='flex justify-end'>
              <Settings />
            </div>
          </div>
        </KeyboardProvider>
      </GameModeProvider>
    </ThemeProvider>
  )
}

export default App
