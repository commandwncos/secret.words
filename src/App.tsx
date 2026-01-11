// Components
import HomeScreen from './components/HomeScreen'
import Game from './components/Game'
import OnGame from './components/OnGame'
import GameOver from './components/GameOver'

// Hooks
import {
  useState,
  // useCallback,
  // useEffect
} from 'react'


export default function App() {
  const [status, setStatus] = useState<'start' | 'play' | 'finish' |'end'>('start');
  const [title, setTitle] = useState('')
  


  return (
    <>
      <div>
        {(() => {
          switch (status) {
            case 'start':
              return <HomeScreen status={status} setStatus={setStatus} />;
            case 'play':
              return <Game setTitle={setTitle} setStatus={setStatus} />;
            case 'finish':
              return <OnGame title={title} setStatus={setStatus} />;
            case 'end':
              return <GameOver setStatus={setStatus}/>;
            default:
              return null;
          }
        })()}
      </div>
    </>
  )
}
