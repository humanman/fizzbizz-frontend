import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import CellStatus from './CellStatus';
import './Grid.css';
// BY THE HOUR! 

function buildRows(compName, options) {
  let statusObjArr = []
  let outputArr = []
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

    let idx = 0
    while(idx <= 10) {
      // simple 10X10 matrix
      for (let i = 1; i <= 10; i++) {
        let leadingZero = i < 10 ? '0' : ''
        let colKey = `col${i}`
        rowIdxArr[idx] = { ...rowIdxArr[idx], [`${colKey}`]: { status: 'free', colKey: `${colKey}`, rowIdx: `${i}`, dataLookup: `${colKey}-idx${i}`, colName: `${compName}${leadingZero}${i}` } }
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
  const comp = authData.company.charAt(0) || 'P'
  const gridData = buildRows(comp, {status: availability})
  const dialog = useSelector(state => state.dialog)
  const [data, setData] = useState(gridData)
  const dispatch = useDispatch()

  const defaultColumnProperties = {
    // width: 120
    // width: '12%'
  };
  
  // fetch bookings for current day. filter by company
  // compare bookingIds with those returned from user login
  // on booking creation return all bookings to update table

  const AvailabilityFormatter = ({value}) => {
    return <CellStatus {...value}/>
  };


  const cellHelpers = { formatter: AvailabilityFormatter }
  const columns = [
      { name: 'TIME',key: 'col0'},
      { name: 'CO1', key: 'col1' , ...cellHelpers},
      { name: 'CO2', key: 'col2' , ...cellHelpers},
      { name: 'CO3', key: 'col3' , ...cellHelpers},
      { name: 'CO4', key: 'col4' , ...cellHelpers},
      { name: 'CO5', key: 'col5' , ...cellHelpers},
      { name: 'CO6', key: 'col6' , ...cellHelpers},
      { name: 'CO7', key: 'col7' , ...cellHelpers},
      { name: 'CO8', key: 'col8' , ...cellHelpers},
      { name: 'CO9', key: 'col9' , ...cellHelpers},
      { name: 'C10', key: 'col10', ...cellHelpers }
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
    console.log('found', statusArr)
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
    // initial validation
    if (!rangeObj) return false
    setColumn(rangeObj.topLeft.idx)
    let rangeSelected = getRange(rangeObj)
    if (rangeSelected[0].col == 0) return false
    console.log('rangeObj ', rangeObj)
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

    dispatch({ type: 'STATUS_HOLD', slots: filteredRangeByAvailability })
    dispatch({ type: 'DASH_SHOW_DIALOG'})
    dispatch({ type: 'BOOKING_HAS_CURRENT_RANGE', currentSelection: filteredRangeByAvailability })
    
    const newData = buildRows(comp, { status: availability })
    setData(newData)

    return confirmBookingRequest()

  }

  function confirmBookingRequest() {
   
    const newData = buildRows(comp, { status: availability })
    setData(newData)
  }

  return (
    <div style={{ padding: '5%' }}>
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