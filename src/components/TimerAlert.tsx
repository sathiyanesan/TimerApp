import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useEffect } from "react";


const TimerAlert = ({ openAlert, setOpenAlert }: any) => {
    // const [openAlert, setOpenAlert] = useState(false);

    let audio = new Audio('/clock-alarm-8761.mp3');

    useEffect(() => {
        const alertInterval = setInterval(() => {
            if (openAlert) {
                audio.play();
            }
        }, 1000)

        return () => {
            audio.pause();
            clearInterval(alertInterval);
        }
    }, [openAlert])



    return (<>
        <div>
            {openAlert && <Alert
                severity="warning"
                action={<Button color="inherit" onClick={() => {
                    setOpenAlert(false)
                }} size="small">OK</Button>}
            >Time's Up
            </Alert>
            }
        </div>
    </>)
}

export default TimerAlert;