import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRef } from "react";

function RestaurantForm(props) {
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);

  const onClose = () => {
    props.onClick.handleClose();
  };

  const onSubmit = (e) => {
    props.onSubmit.onSubmit(e);
    formRef.current.reset();
  };

  return (
    <div className="container">
      <h1 className="text-center"> Suggest a Restaurant</h1>
      <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name..."
            {...register("name", { required: "Enter name" })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ethiopian, Nigerian, etc.."
            {...register("type")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Best soul food ever!"
            {...register("description")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Where is it located?"
            {...register("address")}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Take a picture!</Form.Label>
          <Form.Control
            as="input"
            type="file"
            accept="image/*"
            {...register("image")}
          />
        </Form.Group>
        <div className="d-flex justify-content-end ">
          {" "}
          <Button className="mx-3" onClick={onClose} variant="danger">
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}

export default RestaurantForm;
