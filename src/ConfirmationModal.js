import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmationModal.css'

const ConfirmModal = ({ children, description}) => {
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState(null);
  const d = useSelector(state => state.dialog )
  const selection = useSelector(state => state.booking.currentSelection )
  console.log('currsel ', selection)
  const dispatch = useDispatch()
  // useEffect(() => {

  // })

  const show = callback => event => {
    event.preventDefault();
    setOpen(true);

    event = {
      ...event,
      target: { ...event.target, value: event.target.value }
    }
    setCallback({
      run: () =>
        callback(event)
    });
  };

  const hide = () => {
    // if (status == 'canceled') dispatch({ type: 'STATUS_UNBOOKED' , slots: selection})
    setCallback(null);
    setOpen(false);
  };

  const confirm = () => {
    console.log("confirm");
    dispatch({ type: 'STATUS_BOOKED', slots: selection })
    callback.run();
    hide();
  };


  return (
    <div className={d.dialog.className}>
      {children(show)}
      <div className="modal-outer-wrapper">
        <div className="modal-inner-wrapper">
          <div className="modal-container">
            {open && (
              <div class="info-container">
                <p>{description}</p>
                <button className="confirm-btn pure-menu-item" onClick={hide}>Cancel</button>
                <button className="confirm-btn pure-menu-item" onClick={confirm}>Yes</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
