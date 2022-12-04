import { Logout } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Unsubscribe } from "redux";
import { store } from "../../../Redux/Store";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import Login from "../../UserArea/Login/Login";
import LogOut from "../../UserArea/LogOut/LogOut";
import Register from "../../UserArea/Register/Register";
import Header from "../Header/Header";
import Home from "../Home/Home";
import HomePage from "../HomePage/HomePage";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import Role from "../../../model/Role";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";
import { VacationModel } from "../../../model/vacationModel";
import UserModel from "../../../model/userModel";
import VacationsList from "../../VacationArea/VacationList/VacationList";

function Routing(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    const unsubscribeMe: Unsubscribe = store.subscribe(() => {
        
        const user = store.getState().user;
        if (!user) {
            setIsLoggedIn(false);
            setIsAdmin(false);
        } else {
            setIsLoggedIn(true);
            const role = user?.is_admin;
            if (role === Role.Admin) setIsAdmin(true);
            if (role !== Role.Admin) setIsAdmin(false);
        }
    });

    useEffect(() => {

        let user = store.getState().user;
        if (!user) {
            setIsLoggedIn(false);
            setIsAdmin(false);
        } else {
            const role = user?.is_admin;
            if (role !== Role.Admin) setIsAdmin(false);
        }
    }, []);

    useEffect( () => {
        return () => {
            unsubscribeMe();   
        };
    },  []);
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={isLoggedIn ? <VacationsList/> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/addVacation" element={isAdmin ? <AddVacation/> : <Navigate to="*"/>}/>
                <Route path="/updateVacation/:id" element={isAdmin ? <UpdateVacation/> : <Navigate to="*"/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/VacationProject" element={<HomePage/>}/>
                <Route path="*" element={<PageNotFound/>}/>

            </Routes>
        </div>
    );
}

export default Routing;
