import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function ModalPopup(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    props.onSubmit(e);
    handleClose();
  };

  return (
    <>
      <Button
        className="d-flex mx-auto mt-3"
        variant="outline-light"
        size="lg"
        onClick={handleShow}
      >
        Suggest!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {React.cloneElement(props.children, {
            onSubmit: { onSubmit },
            onClick: { handleClose },
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPopup;
