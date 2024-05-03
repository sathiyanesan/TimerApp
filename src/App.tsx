import './App.css'
import TimerAlert from './components/TimerAlert';
import TimerSelect from './components/TimerSelect'
import { useState } from "react";

function App() {
  const [openClock, setOpenClock] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <TimerAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <TimerSelect
        openClock={openClock}
        setOpenClock={setOpenClock}
        setOpenAlert={setOpenAlert}
      />
    </>
  )
}

export default App
