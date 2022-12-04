import { useNavigate } from "react-router-dom";
import "./HomePage.css";


function HomePage(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="HomePage">
			<h1>Welcome to my Vacation-Project</h1>
            <h4>Here you can find a lot deals for your vacation</h4>

            <h5>New here ?</h5>
            <h3>For Register Click <span className="color" onClick={()=>{
                navigate("/register");
            }}>Here</span> or Click SingIn</h3>
        </div>
    );
}

export default HomePage;

