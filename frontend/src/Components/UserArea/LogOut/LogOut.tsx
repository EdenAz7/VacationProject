import { useEffect } from "react";
import { useNavigate } from "react-router";
import { logoutAction } from "../../../Redux/AuthState";
import { store } from "../../../Redux/Store";
import notify from "../../../utils/Notify";
import "./LogOut.css";

function LogOut(): JSX.Element {

    const navigate = useNavigate();

    useEffect(()=>{
        store.dispatch(logoutAction());
        notify.success("Logout successfully");
        navigate("/")
    },[])
    return (
        <div className="LogOut">
			
        </div>
    );
}

export default LogOut;
