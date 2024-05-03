import { AlertTitle, Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useEffect, useState } from "react";


const TimerAlert = ({ openAlert, setOpenAlert, isAudioPlaying, setIsAudioPlaying }: any) => {
    // const [openAlert, setOpenAlert] = useState(false);
    // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    let audio = new Audio('/src/assets/TimerAudios/clock-alarm-8761.mp3');

    useEffect(() => {
        const alertInterval = setInterval(() => {
            if (openAlert && isAudioPlaying) {
                audio.play();
            }
        }, 1000)

        return () => {
            clearInterval(alertInterval);
        }
    }, [openAlert, isAudioPlaying])



    return (<>
        <div>
            {openAlert && <Alert
                severity="warning"
                action={<Button color="inherit" onClick={() => {
                    setOpenAlert(false)
                    setIsAudioPlaying(false)
                }} size="small">OK</Button>}
            >Time's Up
            </Alert>
            }
        </div>
    </>)
}

export default TimerAlert;