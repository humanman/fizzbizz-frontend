import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import './css/CellStatus.css';

function CellStatus(props) {
  const [bookedStatus, setBookedStatus] = useState(props.status)
  const [mouseDown, setMouseDown] = useState(false);
  const metaData = useSelector(state => state.booking.metaData)
  // const bookingId = useState(state => state.booking)

  const { status, id, col, row, who='other', booking , organizer, bookingtitle, time} = props

  // set a booked status to useSelector so it's tied to a global state
  
  // group selected cell to other bookingIds and select the bookingID
  // which is reflected in the DOM as a panel - selecting a cell in a panel selects the entire
  // panel
  
  
  // USE STATE TO UPDATE STATUS


  let colName = parseInt(col) < 10 ? `col0${col}` : `col${col}`

  return (
      <div 
        booking={booking}
        data-info={`${status}`} 
        className={`booked-status status-${status}-${who}` }
        data-lookup={id} 
        col-name={col}
        row-id={row} 
        organizer={organizer}
        bookingtitle={bookingtitle}
        time={time}
      >
        {/* {organizer} */}
        {bookingtitle}
      </div>
  )
}

export default CellStatus