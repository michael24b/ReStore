import { useNavigate } from "react-router";
import { Col, Table, Row, Button } from "react-bootstrap";
import { currencyFormat } from "../util/util";
import { useAppSelector } from "../store/configureStore";

const BasketSummary = () => {
  const navigate = useNavigate();
  const { basket } = useAppSelector((state) => state.basket);
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;
  return (
    <Col md={6}>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td className="text-start ps-5">Subtotal</td>
            <td className="text-end pe-5 ">{currencyFormat(subtotal)}</td>
          </tr>
          <tr>
            <td className="text-start ps-5">Delivery fee*</td>
            <td className="text-end pe-5 ">{currencyFormat(deliveryFee)}</td>
          </tr>
          <tr>
            <td className="text-start ps-5">Total</td>
            <td className="text-end pe-5 ">
              {currencyFormat(subtotal + deliveryFee)}
            </td>
          </tr>
          <tr>
            <td className="text-center" colSpan={2}>
              *Orders over $100 quantity for free delivery
            </td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Button className="btn-block" onClick={() => navigate("/checkout")}>
          CHECKOUT
        </Button>
      </Row>
    </Col>
  );
};

export default BasketSummary;
