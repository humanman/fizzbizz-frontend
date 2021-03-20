import React, { useState } from "react";
// import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
// import { Menu } from "react-data-grid-addons";
// const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;



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