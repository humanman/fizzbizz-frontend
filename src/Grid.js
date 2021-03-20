import React, { useState } from "react";
// import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
// import { Menu } from "react-data-grid-addons";
// const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

// BY THE HOUR! 


var qrData


const defaultColumnProperties = {
  sortable: true,
  width: 120
};

function Grid() {
  const [data, setData] = useState([
    { col0: '9:00' },
    { col0: '10:00'},
    { col0: '11:00'},
    { col0: '12:00'},
    { col0: '1:00' },
    { col0: '2:00' },
    { col0: '3:00' },
    { col0: '4:00' },
    { col0: '5:00' },
    { col0: '6:00' },
  ])

  const [qr, setQr] = useState(qrData)

  const defaultColumnProperties = {
    width: 120
  };
  
  // fetch bookings for current day. filter by company
  // compare bookingIds with those returned from user login
  // on booking creation return all bookings to update table

  const columns = [
      { name: 'TIME',key: 'col0' },
      { name: 'CO1', key: 'col1' },
      { name: 'CO2', key: 'col2' },
      { name: 'CO3', key: 'col3' },
      { name: 'CO4', key: 'col4' },
      { name: 'CO5', key: 'col5' },
      { name: 'CO6', key: 'col6' },
      { name: 'CO7', key: 'col7' },
      { name: 'CO8', key: 'col8' },
      { name: 'CO9', key: 'col9' },
      { name: 'C10', key: 'col10'},
  ].map(c => ({ ...c, ...defaultColumnProperties }));

  function selectionHandler() {
    // on start
      // set current col state based on key -> col3
      // if selection is mostly on a booked panel open info about meeting
    // on complete
   
      // if panel overlaps existing panel round up/down until clean
      // confirm panel is a new booking
      // filter data to match current col
      // style selected panel as active-edit
      // confirm booking start/end
      // execute create booking 
    
    
    // disallow x-axis selection
       // check that keys are the same -> col3

    
  }

  return (
    <div style={{ padding: '50px' }}>
      <ReactDataGrid
        columns={columns}
        rows={data}
        rowGetter={i => data[i]}
        rowsCount={10}
        minHeight={500}
        cellRangeSelection={{
          onStart: args => console.log(data),
          onUpdate: args => console.log(data),
          onComplete: args => console.log(data)
        }}
      />
      <div><img src={qr} /></div>
    </div>
  )
}

export default Grid