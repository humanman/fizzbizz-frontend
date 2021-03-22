const CELL_STATUS = 'CELL_STATUS'

export function cellReducer(status) {
  return {
    type: CELL_STATUS,
    status
  }
}

const defaultStatus = [
  {
    status: 'free',
    bookingId: null
  }
]

function cellStatus(state=defaultStatus, actions) {
  switch(actions.type) {
    case CELL_STATUS: 
      return [
        ...state,
        {
          status: actions.cellStatus,
          bookingId: ""
        }
      ]
    default: 
      return state
  }

}