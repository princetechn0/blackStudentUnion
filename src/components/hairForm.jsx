import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function HairForm(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (e) => {
    props.onSubmit(e);
  };

  return (
    <div className="container col-md-6">
      <h1 className="text-center"> Suggest a Salon / Barbershop!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          type="text"
          placeholder="Restaurant Name"
          {...register("name", {
            required: "Required",
          })}
        />
        <input
          name="type"
          type="text"
          placeholder="Restaurant Type"
          {...register("type")}
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          {...register("address")}
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          {...register("image")}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default HairForm;
