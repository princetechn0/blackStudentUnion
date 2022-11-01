import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../stylesheets/card.css";

function BasicCard(props) {
  function onDelete(id) {
    props.onDelete(id);
  }

  return (
    <Card className="hover-shadow col-md-3 col-10 m-3 pt-2">
      {props.childCardInfo.image && (
        <Card.Img
          className="card-img"
          variant="top"
          src={props.childCardInfo.image}
        />
      )}
      <Card.Body>
        <h4>{props.childCardInfo.name}</h4>
        <h5>{props.childCardInfo.type}</h5>
        <Card.Text>{props.childCardInfo.description}</Card.Text>
        <Card.Text>{props.childCardInfo.address}</Card.Text>
        {/* <Button
          className="mx-4"
          variant="danger"
          onClick={() => onDelete(props.childCardInfo)}
        >
          Delete
        </Button> */}
        <div className="">
          <Button
            className="mx-4"
            variant="primary"
            onClick={() => console.log(props.childCardInfo.address)}
          >
            Visit
          </Button>
          <Button
            variant="primary"
            onClick={() => console.log(props.childCardInfo.address)}
          >
            Directions
          </Button>
        </div>
        {props.cardType === "restaurant"}
      </Card.Body>
    </Card>
  );
}

export default BasicCard;
