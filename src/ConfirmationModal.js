import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmationModal.css';

const ConfirmationModal = (props) => {

  const {username, companyname, meetingname,  message , isLoginPage, onCancel, onConfirm} = props
  const [userName, setUserName ] = useState("")
  const [companyName, setCompanyName ] = useState("")
  const [meetingName, setMeetingName ] = useState("")
  const [checkedStatus, setCheckedStatus] = useState(true)

  function settingHelper(name, val, callback) {
    callback(val)
    return sessionStorage.setItem(`fizzbizz-${name}`, val)
  }

  function companyHelper(e) {
    setCompanyName(e.target.value)
    setCheckedStatus(!checkedStatus)
    return sessionStorage.setItem(`fizzbizz-companyname`, e.target.value)
  }

  return (
    <div className="modal-overlay" >
      <div className="modal-container">
        <p>{message}</p>
        { companyname && 
          <> 
            <p className="checkbox-header">Please Choose A Company</p>
            <div className="checkbox-container">
              <label htmlFor="companyname" className="container">
                <p>COKE</p>
              <input onChange={e => companyHelper(e)} type="radio" className="checkbox" name="companyname" value="COKE" checked={checkedStatus}/>
                <span className="checkmark"></span>
              </label>
              <br/>
              <label htmlFor="companyname" className="container">
                <p>PEPSI</p>
              <input onChange={e => companyHelper(e)} type="radio" className="checkbox" name="companyname" value="PEPSI" checked={!checkedStatus} />
                <span className="checkmark"></span>
              </label>
              <br/>
            </div>
          </>
        }
        { username && 
          <div className="input-container">
            <label htmlFor="username">
              <p>Your Name</p>
            <input type="text" name="username" value={userName} onChange={e => settingHelper('username', e.target.value, setUserName)} />
            </label>
            <br/>
          </div>
        }
        { meetingname &&
          <div>
            <label htmlFor="meeting">
              <p>Meeting Name</p>
            <input type="text" name="meeting" value={meetingName} onChange={e => settingHelper('meetingname', e.target.value, setMeetingName)} />
            </label>
            <br />
          </div>
        }
        { isLoginPage ?  
          props.children
          :
          <div className="btn-wrapper" >
            <button className="confirm-btn" onClick={onCancel}>
              Cancel 
            </button>
            <button className="confirm-btn" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        }
      </div>
    </div>
  )
}


export default ConfirmationModal