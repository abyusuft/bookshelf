import React from "react";
import { useDispatch } from 'react-redux'
import { quickView } from "../Redux/actions/bookActions";

const Modal = ({ modal, children }) => {
  const dispatch = useDispatch()
  const removeItem = () => {
    dispatch(quickView({}))
  }
  return (
    <>
      <input type="checkbox" id={modal} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={modal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={removeItem}
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
