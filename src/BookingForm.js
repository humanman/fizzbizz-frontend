import React from 'react';
import TimeField from 'react-simple-timefield';


function BookingForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate
    // pass to booking create endpoint with other details
  }

  return (
    <form onSubmit={e => { handleSubmit(e) }}>
      <label>Meeting Name</label>
      <br />
      <input
        name='userName'
        type='text'
      />
      <br />
      <label>Start Time</label>
      <br />
      <TimeField
        value={props.startTime}                     
        onChange={(value) => { console.log(value)}}      
        input={<input name="dt" />}
        colon=":" 
      />
      <br />
      <label>End Time</label>
      <br />
      <TimeField
        value={props.endTime}
        onChange={(value) => { console.log(value) }}
        input={<input name="dt" />}
        colon=":"
      />
      <br />
      <input
        className='submitButton'
        type='submit'
        value='Log Chore'
      />
    </form>
  )
}

export default BookingForm;