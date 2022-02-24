import React from "react";

const Footer = (props) => {
  const { total, DeleteAll } = props;
  return (
    <div className="d-flex justify-content-between mt-4">
      
      <span>You have {total} todo not completed.</span>
      <button className="btn btn-sm btn-danger" onClick={DeleteAll}>
        Delete all
      </button>
    </div>
  );
};

export default Footer;
