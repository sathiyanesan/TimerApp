import './App.css'
import TimerAlert from './components/TimerAlert';
import TimerSelect from './components/TimerSelect'
import { useState } from "react";

function App() {
  const [openClock, setOpenClock] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  return (
    <>
      <TimerAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
      />
      <TimerSelect
        openClock={openClock}
        setOpenClock={setOpenClock}
        setOpenAlert={setOpenAlert}
        setIsAudioPlaying={setIsAudioPlaying}
      />
    </>
  )
}

export default App
