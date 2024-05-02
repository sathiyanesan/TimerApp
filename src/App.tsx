import './App.css'
import TimerSelect from './components/TimerSelect'
import React, { useState } from "react";

function App() {
  const [openClock, setOpenClock] = useState(false);
  return (
    <>
      <TimerSelect openClock={openClock} setOpenClock={setOpenClock} />
    </>
  )
}

export default App
