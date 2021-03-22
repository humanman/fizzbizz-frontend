import React, { useState, useEffect } from "react";


function CellStatus(props) {
  const [bookedStatus, setBookedStatus] = useState(props.status)
  const [mouseDown, setMouseDown] = useState(false);
  // const bookingId = useState(state => state.booking)

  const { status, id, col, row, who='other' } = props
  // set a booked status to useSelector so it's tied to a global state
  
  // group selected cell to other bookingIds and select the bookingID
  // which is reflected in the DOM as a panel - selecting a cell in a panel selects the entire
  // panel
  
  
  // USE STATE TO UPDATE STATUS
  
  const mouseDownHandler = (event) => {
    
  }
  
  // useState(() => {
    
    //   const mouseDownHandler = (event) => {
      //     console.log('event ',event)
      
      //   }
      // })

  let colName = parseInt(col) < 10 ? `col0${col}` : `col${col}`

  return (
      <div 
        booking-id="null"
        data-info={`${status}`} 
        className={`status-${status}-${who}` }
        data-lookup={id} 
        col-name={col}
        row-id={row} 

        // onChange={setBookedStatus}
        // onMouseDown={e => console.log('e', e)}
      />
  )
}

export default CellStatus