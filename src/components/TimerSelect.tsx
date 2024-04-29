import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { TimeView } from "@mui/x-date-pickers/models/views";
import DigitalClockDisplay from "./DigitalClockDisplay";




const TimerSelect = () => {
    const [timerValue, setTimerValue] = React.useState<dayjs.Dayjs | null>(dayjs('2022-04-17T00:00:00'));
    const [openClock, setOpenClock] = useState(false);

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
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div>
                    <PlayCircleIcon
                        color="primary"
                        style={{ width: "50px", height: "50px" }}
                        onClick={() => { setOpenClock(true) }}
                    />
                </div>
            </div>
        )
            : (<DigitalClockDisplay timers={timerValue} />)}

        </>

    )



}

export default TimerSelect;