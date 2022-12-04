import { useEffect, useState } from "react";
import SavedModel from "../../../model/SavedModel";
import vacationsService from "../../../utils/VacationService";
import "./MyVacations.css";

function MyVacations(): JSX.Element {
    const [myVacations, setmyVacations] = useState<SavedModel>();
    useEffect(()=>{

    },[]);
    return (
        <div className="MyVacations">
           
        </div>
    );
}
export default MyVacations;
