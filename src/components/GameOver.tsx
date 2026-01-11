import css from '../main.module.css'
import clsx from "clsx";

interface StartGame {
  setStatus: React.Dispatch<React.SetStateAction<"start" | "play" | "finish" | "end">>;
}

export default function GameOver({ setStatus }: StartGame) {
    
    return (
        <div className={clsx(css.application, css.gameover)}>
            <h1 className={clsx(css.title, css.gameoverTitle)}>Game Over</h1>
            <p className={clsx(css.sub_title, css.gameoverSubTitle )}>Você esgotou todas as tentativas!</p>

            <div className={css.buttons}>
                <button 
                    className={css.start_button} 
                    onClick={() => setStatus('play')}
                >
                    Retentar
                </button>

                <button 
                    className={css.start_button} 
                    onClick={() => setStatus('start')}
                >
                    Sair
                </button>
            </div>
        </div>
    )
}
