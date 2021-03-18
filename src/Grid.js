import { useTable } from 'react-table'
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
} from 'react-datasheet-grid'
import React from 'react'


function Grid() {
  const data = React.useMemo(
    () => [
      {
        col0: '9:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '10:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '11:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '12:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '1:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '2:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '3:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '4:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '5:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },
      {
        col0: '6:00',
        col1: ' ',
        col2: ' ',
        col3: ' ',
        col4: ' ',
        col5: ' ',
        col6: ' ',
        col7: ' ',
        col8: ' ',
        col9: ' ',
        col10: ' ',
      },

    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        accessor: 'col0',
      },
      {
        Header: 'C01',
        accessor: 'col1',
      },
      {
        Header: 'C02',
        accessor: 'col2',
      },
      {
        Header: 'C03',
        accessor: 'col3',
      },
      {
        Header: 'C04',
        accessor: 'col4',
      },
      {
        Header: 'C05',
        accessor: 'col5',
      },
      {
        Header: 'C06',
        accessor: 'col6',
      },
      {
        Header: 'C07',
        accessor: 'col7',
      },
      {
        Header: 'C08',
        accessor: 'col8',
      },
      {
        Header: 'C09',
        accessor: 'col9',
      },
      {
        Header: 'C10',
        accessor: 'col10',
      },
    ],
    []
  )
  

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data})

  return (
    <table {...getTableProps()} style={{
      border: 'solid 1px #eee',
      borderSpacing: '3px 1px',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)',
    }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}
              style={{
                minWidth: '5vw',
                borderSpacing: '5px 1px',
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>  
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px #ccc',
                    background: '#ccc',
                  }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Grid