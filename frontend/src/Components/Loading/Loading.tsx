import "./Loading.css";
import { Spinner } from "react-bootstrap";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
            <Spinner animation="border" variant="info" />
        </div>
    );
}

export default Loading;