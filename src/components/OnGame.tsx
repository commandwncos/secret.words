import css from '../main.module.css'
import Wordlist from '../data/Wordlist'
import { useState, useRef } from 'react';

interface StartGame {
    setStatus: React.Dispatch<React.SetStateAction<"start" | "play" | "finish" | "end">>;
    title: string
}

export default function HomeScreen({ setStatus, title }: StartGame) {
    const words = Wordlist.Matters[title as keyof typeof Wordlist.Matters] as string[];
    const inputRef = useRef<HTMLInputElement>(null);

    // Palavra escolhida aleatoriamente
    const [word] = useState(() => {
        return words[Math.floor(Math.random() * words.length)].toUpperCase();
    });

    // Estado do jogo
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [usedLetters, setUsedLetters] = useState<string[]>([]);
    const [attemptsLeft, setAttemptsLeft] = useState(15);
    const [score, setScore] = useState(0);

    // Função para processar o input
    const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = (e.currentTarget.elements.namedItem('letter') as HTMLInputElement).value.toUpperCase();
        e.currentTarget.reset();
        inputRef.current?.focus()


        if (!input || usedLetters.includes(input)) return;

        setUsedLetters(prev => [...prev, input]);

        if (word.includes(input)) {
            // Acertou
            setGuessedLetters(prev => [...prev, input]);
            const count = word.split('').filter(l => l === input).length;
            setScore(prev => prev + count * 10);
        } else {
            // Errou
            setAttemptsLeft(prev => prev - 1);
        }
    }

    // Verifica se o jogo terminou
    const isGameOver = attemptsLeft <= 0 || word.split('').every(l => l === ' ' || guessedLetters.includes(l));

    return (
        <div className={css.application}>
            <h1 className={css.title}>{title.toUpperCase()}</h1>
            <p className={css.sub_title}>Pontos: {score.toString().padStart(3, '0')}</p>
            <h3 className={css.tip_title}>Adivinhe a palavra</h3>

            <div className={css.card}>
                {word.split('').map((letter, index) => (
                    <p key={index} className={css.card_letter}>
                        {letter === ' ' ? '-' : guessedLetters.includes(letter) ? letter : '_'}
                    </p>
                ))}
            </div>

            {!isGameOver ? (
                <>
                    <p className={css.sub_title}>Tente adivinhar uma letra da palavra:</p>
                    <form className={css.game_form} onSubmit={handleGuess}>
                        <input type="text" name="letter" maxLength={1} required className={css.game_form_input} ref={inputRef} />
                        <button className={css.start_button} type="submit">{'jogar'.toUpperCase()}</button>
                    </form>

                    <div>
                        <p className={css.sub_title}>Letras já utilizadas:</p>
                        {/* <span className={css.used_letters_span}>{usedLetters.join(', ') || '-'}</span> */}
                        <span className={css.used_letters_span}>{
                            usedLetters.length > 0 ? (
                                usedLetters.map((letter, index) => (
                                    <span key={index}>{letter}</span>
                                ))
                            ) : (<span>-</span>)
                        }</span>
                    </div>

                    <p className={css.sub_title}>Tentativas restantes: {attemptsLeft}</p>
                </>
            ) : (
                <div>
                    <h2 className={css.tip_title}>{attemptsLeft > 0 ? 'Você ganhou!' : 'Fim de jogo!'}</h2>
                    <p className={css.sub_title}>A palavra era: {word}</p>
                    <button className={css.start_button} onClick={() => setStatus('end')}>Finalizar</button>
                </div>
            )}
        </div>
    )
}
