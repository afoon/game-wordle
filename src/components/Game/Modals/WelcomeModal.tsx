import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState, type SyntheticEvent } from "react";
import { useGameMode } from "@/contexts";
import { GAME_MODE } from "@/constants";


const WelcomeModal = () => {
    const { gameMode, updateGameMode } = useGameMode();
    const [open, setOpen] = useState(true)
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setOpen(false)
    }
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogTitle>
                    Welcome to Scaffoldle!
                </DialogTitle>
                <DialogDescription>
                    Get started by choosing a game mode.
                </DialogDescription>
                <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLabel>
                                Choose a game mode
                            </FieldLabel>
                            <RadioGroup defaultValue={GAME_MODE.SCAFFOLD} name="gamemode" onValueChange={(value) => { updateGameMode(value) }}>
                                <FieldLabel htmlFor="scaffold-radio">
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Scaffoldle</FieldTitle>
                                            <FieldDescription>
                                                This is a twist on the classic wordle game.
                                            </FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value={GAME_MODE.SCAFFOLD} id="scaffold-radio" />
                                    </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor="normal-radio">
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Classic</FieldTitle>
                                            <FieldDescription>
                                                A clone of the traditional worlde game.
                                            </FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value={GAME_MODE.NORMAL} id="normal-radio" />
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        </FieldSet>
                    </FieldGroup>
                                                    {gameMode === GAME_MODE.SCAFFOLD &&
                                    <div  className="m-2 text-sm text-muted-foreground">
                                        <p className="text-foreground font-semibold mb-2">How to play</p>
                                    You start with 6 tries to guess the word. With every correctly guessed word, the next game will have one less row of guesses. If correct word is not guessed at the end of the game, a row is added.The game is over when final word is guessed in one try.
                                    </div>
                             }
                    <Button type="submit">Play</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default WelcomeModal