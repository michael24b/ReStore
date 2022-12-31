import { Alert } from "react-bootstrap";

interface Props {
  variant: string;
  children: any;
}
const Message = ({ variant, children }: Props) => {
  return (
    <Alert variant={variant}>{children.statusText || children.status}</Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
