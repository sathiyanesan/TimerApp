import dayjs from "dayjs";
import { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';

const DigitalClockDisplay = ({ timers, setOpenClock, setOpenAlert }: any) => {
    const [timeUpdate, setTimeUpdate] = useState({
        hours: timers.get('hour'),
        minutes: timers.get('minute'),
        seconds: timers.get('second')
    });

    const [pause, setPause] = useState(false);
    const [progress, setProgress] = useState(100);

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
    const totalUserSelectedDuration = dayjs.duration(totalTimeSelected).asSeconds();

    useEffect(() => {
        let lastTime = Date.now();
        let currentTime = Date.now()
        let remainingDuration = dayjs.duration({
            hours: timeUpdate.hours,
            minutes: timeUpdate.minutes,
            seconds: timeUpdate.seconds
        });
        let timerIntervalId = setInterval(() => {
            if (!pause) {
                if (remainingDuration.asSeconds() > 0) {
                    currentTime = Date.now()
                    let elapsedTime = Math.abs((currentTime - lastTime) / 1000)
                    lastTime = currentTime;
                    remainingDuration = remainingDuration.subtract({ seconds: elapsedTime });

                    if (remainingDuration.asSeconds() <= 0) {
                        remainingDuration = dayjs.duration(0);
                        clearInterval(timerIntervalId);
                    }

                    const hours = remainingDuration.get('hour')
                    const minutes = remainingDuration.get('minute')
                    const seconds = remainingDuration.get('second')
                    const progressValue = Math.round((remainingDuration.asSeconds() / totalUserSelectedDuration) * 100)

                    setTimeUpdate({ hours, minutes, seconds })
                    setProgress(progressValue);
                }
            }
        }, 1000)

        return () => {
            clearInterval(timerIntervalId);
        }

    }, [totalUserSelectedDuration, pause])

    //  console.log(timeUpdate)
    const handleTogglePause = () => {
        setPause(!pause)
    }


    let timesUp: boolean = totalDuration.asSeconds() === 0;
    timesUp &&
        setTimeout(() => {
            setOpenAlert(true);
            setOpenClock(false)
        }, 500)

    return (<>
        <div>
            {/* <div>
                {timesUp && <Alert severity="warning">Time's Up</Alert>
                }
            </div> */}
            <div className="app-title">
                <p className="title-text">"Every Second Counts: Stay Excited with Our Countdown App!"</p>
            </div>
            <div>
                <div>
                    <Box sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                        <CircularProgress sx={{ '--CircularProgress-size': '340px', '--CircularProgress-progressColor': "#7D7C7C" }} determinate value={progress} >
                            <div >
                                <h1 style={{ fontSize: '70px', color: "#113946" }}>{dayjs.duration(timeUpdate).format('HH:mm:ss')}</h1>
                                <h6 style={{ fontSize: '15px', color: "#555843" }}>{displayTotalTime()}</h6>
                            </div>

                        </CircularProgress>
                    </Box>
                </div>
                <div>
                    {pause ?
                        <PlayCircleIcon color="primary"
                            sx={{
                                width: "70px",
                                height: "70px",
                                color: "#9BCF53",
                                paddingTop: "20px",
                                paddingRight: "30px",
                                "&:hover": {
                                    color: "#7A9D54"
                                }
                            }}
                            onClick={() => { handleTogglePause() }} />
                        :
                        <PauseCircleIcon
                            sx={{
                                width: "70px",
                                height: "70px",
                                color: timesUp ? "#C8AE7D" : "#9BCF53",
                                paddingTop: "20px",
                                paddingRight: "30px",
                                "&:hover": {
                                    color: timesUp ? "#C8AE7D" : "#7A9D54"
                                }
                            }}
                            onClick={() => { !timesUp && handleTogglePause() }} />
                    }

                    <StopCircleIcon
                        sx={{
                            width: "70px",
                            height: "70px",
                            color: "#C70039",
                            paddingLeft: "30px",
                            "&:hover": {
                                color: "#FE0000"
                            }

                        }}
                        onClick={() => { setOpenClock(false) }} />

                </div>
            </div>
        </div >
    </>)
}




export default DigitalClockDisplay;