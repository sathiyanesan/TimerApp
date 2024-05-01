import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useEffect, useState } from "react";
import objectSupport from "dayjs/plugin/objectSupport";
import duration from "dayjs/plugin/duration";
import Alert from '@mui/material/Alert';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';


const DigitalClockDisplay = ({ timers, clockDisplay }: any) => {
    const [timeUpdate, setTimeUpdate] = useState({
        hours: timers.get('hour'),
        minutes: timers.get('minute'),
        seconds: timers.get('second')
    });
    const [showPlayPause, setShowPlayPause] = useState(true);

    const totalTimeSelected = {
        hours: timers.get('hour'),
        minutes: timers.get('minute'),
        seconds: timers.get('second')
    }
    const displayTotalTime = (): string => {
        const hour = Number(totalTimeSelected.hours);
        const minute = Number(totalTimeSelected.minutes);
        const second = Number(totalTimeSelected.seconds);
        const hourStr = hour !== 0 ? `${hour} hours` : ""
        const minuteStr = minute !== 0 ? `${minute} minutes` : ""
        const secondStr = second !== 0 ? `${second} seconds` : ""
        return `Total ${hourStr} ${minuteStr} ${secondStr}`
    }


    // dayjs.extend(objectSupport)
    // const formattedValue = dayjs(selectedTime).format('HH:mm:ss');

    dayjs.extend(duration)
    const totalDuration = dayjs.duration(timeUpdate);
    let newTotalAfterSubraction = totalDuration;

    useEffect(() => {
        let timerIntervalId = setInterval(() => {
            if (newTotalAfterSubraction.asSeconds() > 0) {
                let reduceTime = newTotalAfterSubraction.subtract({ seconds: 1 });
                setTimeUpdate(({
                    hours: reduceTime.get('hour'),
                    minutes: reduceTime.get('minute'),
                    seconds: reduceTime.get('second')
                }))
                newTotalAfterSubraction = reduceTime;
            }
        }, 1000)

        return () => {
            clearInterval(timerIntervalId);
        }

    }, [timeUpdate.seconds])

    //  console.log(timeUpdate)

    return (<>
        <div>
            <div>
                {newTotalAfterSubraction.asSeconds() === 0 && <Alert severity="warning">Time's Up</Alert>}
            </div>
            <div>
                <div>
                    <h1>{dayjs.duration(timeUpdate).format('HH:mm:ss')}</h1>
                    <h6>{displayTotalTime()}</h6>
                </div>
                <div>
                    {showPlayPause ?
                        <PauseCircleIcon color="primary"
                            style={{ width: "50px", height: "50px" }}
                            onClick={() => { setShowPlayPause(false) }} />
                        :
                        <PlayCircleIcon color="primary"
                            style={{ width: "50px", height: "50px" }}
                            onClick={() => { setShowPlayPause(true) }} />
                    }
                    <StopCircleIcon color="error"
                        style={{ width: "50px", height: "50px" }}
                        onClick={() => { }} />
                </div>
            </div>


        </div>
    </>)
}




export default DigitalClockDisplay;