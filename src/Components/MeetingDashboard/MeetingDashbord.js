import { useState } from 'react'
import "./MeetingDashboard.css"
// import { useNavigate } from 'react-router-dom'
import Bookings from '../Bookings/Bookings'
import FutureMeeting from "../FutureMeeting/FutureMeeting"
// import { useNavigate } from 'react-router-dom'

function MeetingDashbord() {
    const [showHistory, setShowHistory] = useState(false)
    // const navigate = useNavigate()

    const handleClick = (e) => {
        if (!e.target.className.includes("border")) {

            setShowHistory(!showHistory)
        }
    }

    let future = "future";
    let previous = "previous";

    return (
        <>
            <div className="meeting-dashboard" >
                <div onClick={handleClick} className={showHistory ? "" : "border"}>
                    פגישות עתידיות
                </div>
                <div onClick={handleClick} className={showHistory ? "border" : ""}>
                    היסטוריית פגישות
                </div>
            </div>
            {!showHistory ?
                <div>
                    <FutureMeeting />
                    <Bookings timeOfBookings={future} />
                </div> :
                <div>
                    <Bookings timeOfBookings={previous} />
                </div>
            }
        </>
    )
}

export default MeetingDashbord