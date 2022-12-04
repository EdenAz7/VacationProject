import { useEffect, useState } from "react";
import SavedModel from "../../../model/SavedModel";
import "./MyVacations.css";

function MyVacations(): JSX.Element {
    const [myVacations, setmyVacations] = useState<SavedModel[]>([]);
    useEffect(()=>{
        
    },[]);
    return (
        <div className="MyVacations">
           
        </div>
    );
}
export default MyVacations;
