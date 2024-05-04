import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DigitalClockDisplay from "./DigitalClockDisplay";
import StopCircleIcon from '@mui/icons-material/StopCircle';


const TimerSelect = ({ openClock, setOpenClock, setOpenAlert }: any) => {
    const [timerValue, setTimerValue] = React.useState<dayjs.Dayjs | null>(dayjs('2022-04-17T00:00:00'));
    // const [openClock, setOpenClock] = useState(false);


    const noSelection: boolean = timerValue?.get('hour') === 0 && timerValue?.get('minute') === 0 && timerValue?.get('second') === 0;

    return (
        <>{!openClock ? (
            <div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={['MobileTimePicker', 'MultiSectionDigitalClock']}
                        >
                            <DemoItem label="Select Time">
                                <MultiSectionDigitalClock
                                    value={timerValue}
                                    onChange={(newValue) => { setTimerValue(newValue) }}
                                    views={['hours', 'minutes', 'seconds']}
                                    ampm={false}
                                    timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
                                    sx={{

                                        // "&:selected": {
                                        //     bgcolor: "#6C5F5B"
                                        // }
                                        // color :"#6C5F5B"
                                    }}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
        )
            : (<DigitalClockDisplay
                timers={timerValue}
                setOpenClock={setOpenClock}
                setOpenAlert={setOpenAlert}
            />)}

            <div>
                {!openClock &&
                    <PlayCircleIcon
                        color={noSelection ? "disabled" : "primary"}
                        sx={{
                            width: "70px",
                            height: "70px",
                            color: "#9BCF53",
                            paddingTop: "20px",
                            "&:hover":{
                                color:"#7A9D54"
                            }
                        }}
                        onClick={() => { !noSelection && setOpenClock(true) }}
                    />
                }
            </div>

        </>

    )



}

export default TimerSelect;