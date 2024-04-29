import dayjs, { Dayjs } from "dayjs";
import { ReactNode } from "react";
import objectSupport from "dayjs/plugin/objectSupport";

const DigitalClockDisplay = ({ timers}:any) => {

  
const hour = timers.get('hour');
const minute = timers.get('minute')
const second = timers.get('second')
 const totalTime = `Total ${hour} hour ${minute} minutes ${second} seconds`

dayjs.extend(objectSupport)  
const formattedValue = dayjs({ hour:hour, minute:minute, second:second }).format('HH:mm:ss');
console.log(formattedValue);
console.log(typeof(formattedValue));

    return (<>
        <div>
            {/* <h1>{formatedTime}</h1> */}
            <h1>{formattedValue}</h1>
            <h5>{totalTime}</h5>
        </div>
    </>)
}




export default DigitalClockDisplay;