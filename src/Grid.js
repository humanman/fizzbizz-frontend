import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import CellStatus from './CellStatus';
import './css/Grid.css';

const company = sessionStorage.getItem('fizzbizz-companyname')


function buildRows(compName, options) {
  console.log('running build rows')
  let rowIdxArr = [
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
  ]
  if (options) {
    let idx = 0
    let len = rowIdxArr.length
    while(idx <= len) {
      rowIdxArr[idx] = { ...rowIdxArr[idx], ...options.status[idx]}
      idx++
    }
  } else {
    console.log('no options')
    let idx = 0
    while(idx <= 10) {
      // simple 10X10 matrix
      for (let i = 1; i <= 10; i++) {
        let leadingZero = i < 10 ? '0' : ''
        let colKey = `col${i}`
        rowIdxArr[idx] = { ...rowIdxArr[idx], [`${colKey}`]: { status: 'free', colKey: `${colKey}`, rowIdx: `${i}`, dataLookup: `${colKey}-idx${i}`, colName: `${compName}${leadingZero}${i}` } ,booking:null,bookingTitle:null, organizer:null}
      }
      idx++
    }
  }

  // returns formatted rows object for DataGrid to use
  
  return rowIdxArr

}


function Grid() {
  const [column, setColumn] = useState(0)
  const [startRow, setStartRow] = useState({idx:1,rowIdx:1})
  const [cellRange, setCellRange] = useState([])
  const availability = useSelector(state => state.status)
  const authData = useSelector(state => state.user.data)
  const bookings = useSelector(state => state.booking.currentBookings)
  const comp = authData & authData.company ? authData.company.charAt(0) : sessionStorage.getItem('fizzbizz-companyname') ? sessionStorage.getItem('fizzbizz-companyname').charAt(0) : 'C'
  const currCompany = sessionStorage.getItem('fizzbizz-companyname')
  const currUser = sessionStorage.getItem('fizzbizz-username')
  const [gridData, setGridData] = useState(buildRows(comp, {status: availability}))


  const confirm = useSelector(state => state.dialog.confirm)

  const [data, setData] = useState(gridData)
  const [hide, setHide] = useState(confirm)
  const dispatch = useDispatch()

  const defaultColumnProperties = {
    // width: 120
    // width: '12%'
  };


  // // handle panel selection 
  function selectPanel(e) {
    let currentActivePanel = document.querySelectorAll('.panel-selected');
    [].forEach.call(currentActivePanel, function (el) {
      el.classList.remove('panel-selected');
    });
    let bookingId = e.target.getAttribute('booking')

    // build currentselection that can dispatch to store to update current selection so if use deletes, the selection is available
    console.log('booking ', bookingId)
    let isEditable = e.target.getAttribute('organizer') == currUser
    let panel = document.querySelectorAll( `[booking="${bookingId}"]`);
    // change color
    let panelDetails = []
    panel.forEach((el) => { 
      console.log('element  ',el.getAttribute('row-id'))
      el.classList.add('panel-selected') 
      let row = el.getAttribute('row-id')
      let key = `col${el.getAttribute('col-name')}`
      panelDetails.push(availability[parseInt(row)][key])
    })


    if (isEditable) {

      setTimeout(() => {
        dispatch({ type: 'DASH_SELECT_BOOKING', bookingId})
        dispatch({ type: 'BOOKING_HAS_CURRENT_RANGE', currentSelection: panelDetails })
      })
  
    }

  }

  function unSelectPanel(cell) {
    let bookingId = cell.getAttribute('booking')
    let panel = document.querySelectorAll(`[booking="${bookingId}"]`);
    // change color
    panel.forEach((el) => {
      el.classList.remove('panel-selected')
    })
  }

  useEffect(() => {
    let cells = document.getElementsByClassName('booked-status')
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', selectPanel, false);
    }
  })
  
  const AvailabilityFormatter = ({value, options}) => {
    return <CellStatus {...value} />
  };

  const cellHelpers = { formatter: AvailabilityFormatter }
  const columns = [
      { name: 'TIME',key: 'col0'},
      { name: `${comp}O1`, key: 'col1' , ...cellHelpers},
      { name: `${comp}O2`, key: 'col2' , ...cellHelpers},
      { name: `${comp}O3`, key: 'col3' , ...cellHelpers},
      { name: `${comp}O4`, key: 'col4' , ...cellHelpers},
      { name: `${comp}O5`, key: 'col5' , ...cellHelpers},
      { name: `${comp}O6`, key: 'col6' , ...cellHelpers},
      { name: `${comp}O7`, key: 'col7' , ...cellHelpers},
      { name: `${comp}O8`, key: 'col8' , ...cellHelpers},
      { name: `${comp}O9`, key: 'col9' , ...cellHelpers},
      { name: `${comp}10`, key: 'col10', ...cellHelpers }
  ].map(c => ({ ...c, ...defaultColumnProperties }));


  function selectHandlerStart(start) {
    if (start.idx == 0 ) return false
    setColumn(start.idx)
    setStartRow(start.rowIdx)
  }

  function cellSelected(cell) {
    // check store based on cell.idx-cell.rowIdx
    if (cell.idx == column) {
      return setCellRange([...cellRange, cell])
    }
  }

  function getRange(rangeObj) {
    let rangeKey = rangeObj.topLeft.idx
    let start = rangeObj.topLeft.rowIdx
    let end = rangeObj.bottomRight.rowIdx
    let range = []
    while (start <= end) {
      range.push({col: rangeKey, row: start})
      start++
    }
    return range
  }

  function checkRangeAvailability(range) {
    let statusArr = []

    for (let slot of range) {
      // slot //{col: 5, row: 3, key: 'col5'}
      if (availability[parseInt(slot.row)][slot.key].status == 'free') {
        statusArr.push(availability[parseInt(slot.row)][slot.key])
      }
    }
    return statusArr
  }

  function prepSelectedRange(range) {
    for (let obj of range) {
      obj["key"] = `col${obj.col}`
      obj["id"] = `${obj.row}-${obj.col}`
      obj["who"] = 'user'
    }
    return range
  }

  function selectHandlerComplete(rangeObj) {
    setHide(confirm)
    // initial validation
    if (!rangeObj) return false
    setColumn(rangeObj.topLeft.idx)
    let rangeSelected = getRange(rangeObj)
    if (rangeSelected[0].col == 0) return false

    // range is topLeft -> bottomRight
    // panel will create new panel on first range of available timeslots
    // panel will highlight

    // filter to get earliest available range
    // topLeft -> bottomRight
    if (rangeObj.topLeft.idx == rangeObj.bottomRight.idx && rangeObj.topLeft.rowIdx == rangeObj.bottomRight.rowIdx) {
      // it's a single hour booking
      console.log('attempting to book single hour')

    } 
    // lets create objects for each cell in range and check availability in our store
    rangeSelected = prepSelectedRange(rangeSelected)
    let filteredRangeByAvailability = checkRangeAvailability(rangeSelected)
    if (filteredRangeByAvailability.length) {

      dispatch({ type: 'DASH_SHOW_DIALOG'})
      dispatch({ type: 'BOOKING_HAS_CURRENT_RANGE', currentSelection: filteredRangeByAvailability })

      // return confirmBookingRequest()
    }

  }

  function confirmBookingRequest() {
    setGridData(buildRows(comp, { status: availability }))
    return setData(gridData)
  }

  return (
    <div style={{ paddingTop: '5%' }}>
      <ReactDataGrid
        columns={columns}
        rows={data}
        rowKey={data}
        rowGetter={i => data[i]}
        rowsCount={10}
        minHeight={400}
          cellRangeSelection={{
            onStart: args => selectHandlerStart(args.startCell),
            onComplete: args => selectHandlerComplete(args)
        }}
        />
    </div>
  )
}

export default Grid