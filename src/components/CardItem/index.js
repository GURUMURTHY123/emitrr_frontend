import { FaCat, FaBomb } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoMan } from "react-icons/io5";
import "./index.css";

const CardItem = (props) => {
  const { cardDetails, isGameStarted, updateCardProperties } = props;
  const { id, imageIcon, isClicked } = cardDetails;

  const renderImageIcon = () => {
    switch (imageIcon) {
      case "cat":
        return <FaCat size={100} color="#31363F" />;
      case "defuse":
        return <IoMan size={100} color="#31363F" />;
      case "shuffle":
        return <FaShuffle size={100} color="#31363F" />;
      case "exploding":
        return <FaBomb size={100} color="#31363F" />;
      default:
        return null;
    }
  };

  const onClickCard = async () => {
    isGameStarted && (await updateCardProperties(id));
  };

  return (
    <li className="card-item" onClick={onClickCard}>
      {isClicked && isGameStarted && renderImageIcon()}
    </li>
  );
};

export default CardItem;
