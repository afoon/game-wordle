export interface KeyboardProps {
    usedLetters: usedLetterType;
    onKeyDown: (value: string) => void;
    row?: string[]
}

export interface usedLetterType {
    used?: Set<string>,
    correct?: Set<string>
    mismatch?: Set<string>
}