import React from "react";
import FarmerForm from "./FarmerForm";

const AddFarmerModal = ({ show, handleClose, handleSubmit, handleOnChange, rest }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button onClick={handleClose}>Close</button>
        <FarmerForm handleSubmit={handleSubmit} handleOnChange={handleOnChange} rest={rest} />
      </section>
    </div>
  );
};

export default AddFarmerModal;