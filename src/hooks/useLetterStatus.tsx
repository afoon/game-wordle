import { decode } from '@/utils';
import {useCallback, useMemo, useState} from 'react';

const useLetterStatus = () => {
        const used: Set<string> = useMemo(() => new Set(), []);
        const [lettersStatus, setLetterStatus] = useState({})
        const correct = useMemo(() => new Set(), []);
        const updateUsedLetters = (guess: string, answer: string) => {
            const matched = new Set();
            const letters = guess.split('')
            letters.forEach((letter, idx) => {
                if (!used.has(letter)) {
                    used.add(letter);
                }
                if (guess.charAt(idx) === decode(answer).charAt(idx)) {
                    correct.add(letter);
                }
            })
            used.forEach(letter => {
                if (decode(answer).includes(letter)) {
                    matched.add(letter);
                }
            })
            const mismatch = matched.difference(correct)
            setLetterStatus({ mismatch, correct, used: used.difference(matched) })
    
    
        }
        const resetKeyboard = useCallback(() => {
            correct.clear();
            used.clear();
            setLetterStatus({})
        },[correct, used])
    return {
        updateUsedLetters,
        usedLetters: lettersStatus,
        resetKeyboard
    }
}

export default useLetterStatus