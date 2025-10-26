import { Toaster } from 'sonner'
import './App.css'
import Game from './components/Game'
import { GAME_MODE } from './constants'
import useLocalStorage from './hooks/useLocalStorage'
import { Button } from './components/ui/button'
import { Settings } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import GameModeSelect from './components/Game/GameModeSelect'
import { AnswerProvider } from './contexts/AnswerContext'
function App() {
  const [gameMode, setGameMode] = useLocalStorage('gameMode', GAME_MODE.NORMAL)
  return (
    <div className="flex justify-center gap-10">
      <div className="inline-block my-20">
        <Toaster richColors position='top-center' />
        <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4'>Word Game</h1>
        <AnswerProvider>
        <Game gameMode={gameMode} />
        </AnswerProvider>
      </div>
      <div className='flex justify-end mt-8'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <Settings />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className='flex gap-2 items-center w-full'>
            Game Mode:
            <GameModeSelect gameMode={gameMode} setGameMode={setGameMode} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default App
