import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useEffect, useState } from "react";
import objectSupport from "dayjs/plugin/objectSupport";
import duration from "dayjs/plugin/duration";

const DigitalClockDisplay = ({ timers }: any) => {
    const [timeUpdate, setTimeUpdate] = useState({
        hours: timers.get('hour'),
        minutes: timers.get('minute'),
        seconds: timers.get('second')
    });


    // dayjs.extend(objectSupport)
    // const formattedValue = dayjs(selectedTime).format('HH:mm:ss');

    dayjs.extend(duration)
    const totalDuration = dayjs.duration(timeUpdate);
    // console.log(totalDuration)
    let newTotalAfterSubraction = totalDuration;
    console.log(newTotalAfterSubraction);


    let timerIntervalId = setInterval(() => {
        if (newTotalAfterSubraction.asSeconds() > 0) {
            let reduceTime = newTotalAfterSubraction.subtract({ seconds: 1 });
            setTimeUpdate(({
                hours: reduceTime.get('hour'),
                minutes: reduceTime.get('minute'),
                seconds: reduceTime.get('second')
            }))
            newTotalAfterSubraction = reduceTime;
        } else {
            alert("Time's Up")
            clearInterval(timerIntervalId);

        }
    }, 1000)

    console.log(timeUpdate)

    return (<>
        <div>
            <h1>{dayjs.duration(timeUpdate).format('HH:mm:ss')}</h1>
        </div>
    </>)
}




export default DigitalClockDisplay;