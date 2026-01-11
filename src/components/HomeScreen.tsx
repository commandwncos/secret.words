import css from '../main.module.css'

interface StartGame {
  status: "start" | "play" | "finish"| "end";
  setStatus: React.Dispatch<React.SetStateAction<"start" | "play" | "finish" | "end">>;
}

export default function HomeScreen({status, setStatus}: StartGame) {
    return (
        <div className={css.application}>
            <h1 className={css.title}>Palavra Secreta</h1>
            <p className={css.sub_title}>Tente descobrir a palavra secreta</p>
            <button className={css.start_button} onClick={()=>setStatus('play')}>{status.toUpperCase()}</button>
        </div>
    )
}