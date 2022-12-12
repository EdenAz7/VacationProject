import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Unsubscribe } from "redux";
import { store } from "../../../Redux/Store";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import Login from "../../UserArea/Login/Login";
import LogOut from "../../UserArea/LogOut/LogOut";
import Register from "../../UserArea/Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import Role from "../../../model/Role";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationArea/VacationList/VacationList";

function Routing(): JSX.Element {
    const [isLogged, setIsLogged] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    const unsubscribeMe: Unsubscribe = store.subscribe(() => {
        
        const user = store.getState().user;
        if (!user) {
            setIsLogged(false);
            setIsAdmin(false);
        } else {
            setIsLogged(true);
            const role = user?.is_admin;
            if (role === Role.Admin) setIsAdmin(true);
            if (role !== Role.Admin) setIsAdmin(false);
        }
    });

    useEffect(() => {

        let user = store.getState().user;
        if (!user) {
            setIsLogged(false);
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
                <Route path="/home" element={isLogged ? <VacationsList/> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/VacationProject" element={<Login/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/addVacation" element={isAdmin ? <AddVacation/> : <Navigate to="*"/>}/>
                <Route path="/updateVacation/:id" element={isAdmin ? <UpdateVacation/> : <Navigate to="*"/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="*" element={<PageNotFound/>}/>

            </Routes>
        </div>
    );
}

export default Routing;
