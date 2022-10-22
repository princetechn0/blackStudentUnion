import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function BasicCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.childCardInfo.imageURL} />
      <Card.Body>
        <Card.Title>{props.childCardInfo.name}</Card.Title>
        <Card.Text>{props.childCardInfo.description}</Card.Text>
        <Button variant="primary">Visit</Button>
        {props.cardType === "restaurant" && <h2>You have a restautnat</h2>}
      </Card.Body>
    </Card>
  );
}

export default BasicCard;
