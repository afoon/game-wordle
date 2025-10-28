import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Moon, SettingsIcon, Sun } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import GameModeSelect from '@/components/Game/GameModeSelect'
import { Switch } from '@/components/ui/switch'
import { useKeyboard, useTheme } from '@/contexts'
import {memo} from 'react';

const Settings = () => {
  const {toggleHighlight, keyHighlight} = useKeyboard()
  const {theme, toggleTheme} = useTheme()
    return (
      <div>
    <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <SettingsIcon />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className='flex flex-col gap-2 items-center w-90 mr-2'>
            <Field orientation={"horizontal"}>
              <FieldLabel>
            Game Mode:
              </FieldLabel>
            <GameModeSelect/>
            </Field>
            <Field orientation={"horizontal"}>
              <FieldContent>
              <FieldLabel htmlFor='used-keys'>Highlight used keys</FieldLabel>
              <FieldDescription>
                Increase the difficulty by removing used keys highlighting.
              </FieldDescription>
              </FieldContent>
              <Switch id="used-keys" checked={keyHighlight} onCheckedChange={toggleHighlight}/>
            </Field>
          </PopoverContent>
        </Popover>
        <Button variant='outline' onClick={() => toggleTheme()}>
          {theme === "light" ? <Sun/> : <Moon/>}
        </Button>
      </div>
        )
}

export default memo(Settings)