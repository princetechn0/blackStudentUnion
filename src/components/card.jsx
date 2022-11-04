import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../stylesheets/card.css";
import { IconContext } from "react-icons";
import { FaDirections } from "react-icons/fa";

function BasicCard(props) {
  const {
    name,
    description,
    category = "",
    type,
    address,
  } = props.childCardInfo;
  const { cardType } = props.cardType;

  function onDelete(id) {
    props.onDelete(id);
  }

  function displayAddress(address) {
    window.open(`https://maps.google.com?q=${address}`);
  }

  // col-md-3 col-10 m-3 pt-2
  return (
    <Card className="hover-shadow">
      {props.childCardInfo.image && (
        <Card.Img
          className="card-img p-2"
          variant="top"
          src={props.childCardInfo.image}
        />
      )}
      <Card.Body>
        <h3>{name}</h3>
        <Card.Text>{description}</Card.Text>
        {/* If Address exists */}
        {address && (
          <div className="pt-2">
            <Card.Text>{address} </Card.Text>
            <Button
              className=""
              variant="light"
              size="sm"
              onClick={() => displayAddress(address)}
            >
              <IconContext.Provider value={{ size: "1.5em" }}>
                <FaDirections />
              </IconContext.Provider>
            </Button>
          </div>
        )}

        {/* <Button
          className="mx-4"
          variant="danger"
          onClick={() => onDelete(props.childCardInfo)}
        >
          Delete
        </Button> */}
      </Card.Body>

      {/* type and category pills */}
      <Card.Footer>
        <div className="badges d-inline">
          {type &&
            Array.isArray(type) &&
            type.map((item) => (
              <Badge pill bg="success" className="mx-1">
                {item}
              </Badge>
            ))}

          {!Array.isArray(type) && type && (
            <Badge pill bg="success" className="mx-1">
              {type}
            </Badge>
          )}

          {category &&
            Array.isArray(category) &&
            category.map((item) => (
              <Badge pill bg="primary" className="mx-1">
                {item}
              </Badge>
            ))}

          {!Array.isArray(category) && category && (
            <Badge pill bg="success" className="mx-1">
              {category}
            </Badge>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}

export default BasicCard;
