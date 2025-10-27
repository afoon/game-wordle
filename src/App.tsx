import './App.css'
import { Toaster } from 'sonner'
import Game from './components/Game'
import { AnswerProvider } from './contexts/AnswerContext'
import Settings from './components/Settings'
import { KeyboardProvider } from './contexts/KeyboardContext'
import { GameModeProvider } from './contexts/GameModeContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="flex justify-center gap-10">
        <GameModeProvider>
          <KeyboardProvider>
            <div className="inline-block my-20">
              <Toaster richColors position='top-center' />
              <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4'>Word Game</h1>
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
