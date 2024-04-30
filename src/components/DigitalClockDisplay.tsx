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
            } else if (newTotalAfterSubraction.asSeconds() === 0) {
                alert("Times's Up")
            }
        }, 1000)

        return () => {
            clearInterval(timerIntervalId);
        }

    }, [timeUpdate.seconds])

    //  console.log(timeUpdate)

    return (<>
        <div>
            <h1>{dayjs.duration(timeUpdate).format('HH:mm:ss')}</h1>
        </div>
    </>)
}




export default DigitalClockDisplay;