import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { useDispatch, useSelector } from 'react-redux';
// import store from './store';
import CellStatus from './CellStatus';
import selectAvailableSlots from './reducers/statusReducer';
// import { Menu } from "react-data-grid-addons";
// const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

// BY THE HOUR! 

var qrData


const defaultColumnProperties = {
  sortable: true,
  width: 120
};

let rowDataArr = []

let count = 1
let statusObj


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
    console.log('populationg from store')

    let idx = 0
    let len = rowIdxArr.length
    while(idx <= len) {
      rowIdxArr[idx] = { ...rowIdxArr[idx], ...options.status[idx]}
      idx++
    }
    console.log('initialState', rowIdxArr)
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

  // TODO SET VALUE FOR EACH CELL IN ROW IN LIEU OF METADATA
  const [qr, setQr] = useState(qrData)
  const [column, setColumn] = useState(0)
  const [startRow, setStartRow] = useState({idx:1,rowIdx:1})
  const [cellRange, setCellRange] = useState([])
  const availability = useSelector(state => state.status)
  const gridData = buildRows('C', {status: availability})
  const [data, setData] = useState(gridData)
  // console.log('setData ',data)
  const dispatch = useDispatch()

  const defaultColumnProperties = {
    width: 120
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
 
  // const cellActions = [
  //   {
  //     callback: (e) => {
  //       console.log('e ', e)
  //     }
  //   }
  // ]

  // useEffect(() => {
    
  // });


  function getCellActions(column, row) {
    // const colActions  = {
    //   col1: cellActions
    // }

    return document.querySelector(`[data-lookup=${column.key}-${row.idx}]`)
  }

  function selectHandlerStart(start) {
    console.log('start ', start)
    if (start.idx == 0 ) return false
    setColumn(start.idx)
  
    setStartRow(start.rowIdx)
    // setCellRange([])
    
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



  function selectHandlerUpdate(rangeObj) {
    if (column == 0) return false
    
  }

 
  // useEffect(() => {
  //   $('.slider').slider({
  //     // ...
  //   })
  // }, [])
  // TODO: map selected cells to their DOM classes
  // function mapCellsToClasses {

  // }
  
  function cellSelected(cell) {
    // check store based on cell.idx-cell.rowIdx
    if (cell.idx == column) {
      console.log('cellRange now ', cellRange)
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
      statusArr.push(availability[parseInt(slot.row)][slot.key])
    }
    console.log('found', statusArr)
    return statusArr
  }

  function prepSelectedRange(range) {
    for (let obj of range) {
      obj["key"] = `col${obj.col}`
    }
    return range
  }

  function selectHandlerComplete(rangeObj) {
    setColumn(rangeObj.topLeft.idx)
    let rangeSelected = getRange(rangeObj)
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
    console.log('attempting to find valid new booking in selected range', rangeSelected)
    rangeSelected = prepSelectedRange(rangeSelected)
    console.log(checkRangeAvailability(rangeSelected))
      

      // dispatch({ type: 'CHECK_AVAILABLE', ...rangeSelected})

      // console.log('state res', selectedCellsFromState)
    



  }


  return (
    <div style={{ padding: '50px' }}>
      <ReactDataGrid
        // getCellActions={getCellActions}
        columns={columns}
        rows={data}
        rowKey={data}
        rowGetter={i => data[i]}
        rowsCount={10}
        minHeight={500}
        // onCellSelected={ setCellRange(prevStatev => [...prevStatev, this])}
        // onCellSelected={args => cellSelected(args)}
        // rowClass={row => row.id.includes(column) ? highlightClassname : undefined}
        cellRangeSelection={{
          onStart: args => selectHandlerStart(args.startCell),
          onUpdate: args => selectHandlerUpdate(args),
          onComplete: args => selectHandlerComplete(args)
        }}
      />
      <div><img src={qr} /></div>
    </div>
  )
}

export default Grid