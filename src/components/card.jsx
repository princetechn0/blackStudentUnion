import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../stylesheets/card.css";
import { IconContext } from "react-icons";
import { FaDirections } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

function displayAddress(address) {
  window.open(`https://maps.google.com?q=${address}`);
}

function BasicCard({ childCardInfo, description, onDelete, onVote }) {
  const { image, name, address, votes, category, type } = childCardInfo;
  return (
    <div className="BasicCard text-center">
      <Card className="hover-shadow">
        {image && (
          <Card.Img className="card-img p-1" variant="top" src={image} />
        )}

        <Card.Body>
          <div className="d-flex justify-content-center align-middle">
            <h3>{name}</h3>
          </div>
          <Card.Text>{description}</Card.Text>
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
        </Card.Body>
        {/* type and category pills */}
        {(type || category) && (
          <Card.Footer>
            <div className="badges d-inline-flex">
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
        )}

        {/* voting heart and counter */}
        <div className="voteBlock">
          <p>{votes}</p>
          <div className="voteHeart" onClick={() => onVote(childCardInfo)}>
            <IconContext.Provider value={{ size: "1em" }}>
              <AiOutlineHeart />
            </IconContext.Provider>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BasicCard;
