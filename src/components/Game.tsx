import css from '../main.module.css'
// Wordlist
import Wordlist from '../data/Wordlist'

interface StartGame {
    setStatus: React.Dispatch<React.SetStateAction<"start" | "play" | "finish" | "end">>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function Game({ setStatus, setTitle }: StartGame) {
    const keys = Object.keys(Wordlist.Matters)
    
    return (
        <div className={css.application}>
            <h1 className={css.title}>VAMOS JOGAR</h1>
            <p className={css.sub_title}>Escolha uma categoria</p>
            <div className={css.container_card}>
                {keys.map((key, index) => (
                    <button 
                        key={index}
                        className={css.start_button}
                        onClick={
                            () => {
                                setStatus('finish')
                                setTitle(key)
                            }
                        
                        }
                        >{key.toUpperCase()}</button>
                ))}
            </div>
        </div>
    )
}