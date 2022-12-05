import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import UserModel from "../../../model/userModel";
import { VacationModel } from "../../../model/vacationModel";
import { store, vacationsStore } from "../../../Redux/Store";
import { fetchFollowedVacationsAction, fetchVacationsAction } from "../../../Redux/VacationsState";
import notify from "../../../utils/Notify";
import vacationsService from "../../../utils/VacationService";
import Home from "../../Layout/Home/Home";
import Loading from "../../Loading/Loading";
import "./MyVacations.css";

function MyVacations(): JSX.Element {
    const [myVacations, setmyVacations] = useState<UserModel[]>([]);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [pageNum, setPageNum] = useState(0);
    const user = store.getState().user;

    const PER_PAGE = 10;
    const pagesVisited = pageNum * PER_PAGE;
    const pageCount = Math.ceil(vacations.length / PER_PAGE);
    const changePage = ({selected}:any)=>{
        setPageNum(selected);
    }

    useEffect((async () => {
        try {
            // get vacations from redux
            let vacations = vacationsStore.getState().vacations;
            // if redux vacations is empty, get them from the server
            if (vacations.length === 0) {
                vacations = await vacationsService.getAllVacations();
                vacationsStore.dispatch(fetchVacationsAction(vacations));
            }

            // get user follows from redux
            let userFollows = vacationsStore.getState().followedVacations;
            // if redux follows is empty, get them from the server
            if (userFollows.length === 0) {
                userFollows = await vacationsService.getAllFollowedVacations();
                vacationsStore.dispatch(fetchFollowedVacationsAction(userFollows));
            }

            vacations.sort(v => userFollows.find(f => f.id === v.id) ? -1 : 1);
            // Change the state
            setVacations(vacations);

            // Listen to vacations changes
            const unsubscribe = vacationsStore.subscribe(async () => {
                vacations = await vacationsService.getAllFollowedVacations();
                userFollows = vacationsStore.getState().followedVacations;
                vacations.sort(v => userFollows.find(f => f.id === v.id) ? -1 : 1);
                setVacations(vacations);
            });

            return unsubscribe;

        }
        catch (err: any) {
            notify.error(err.message);
        }
    }) as any, [])

   
    return (
        <div className="MyVacations">
             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {vacations ? vacations.slice(pagesVisited, pagesVisited + PER_PAGE).map(v =>
                    <Grid item xs={2} sm={4} md={3} key={v.id}>
                        <Home key={v.id} vacation={v} user={user} />
                    </Grid>) : <Loading/>}
            </Grid>
            <br />
            <ReactPaginate
                previousLabel={"⬅️Previous"}
                nextLabel={"Next➡️"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"PrevBtn"}
                nextLinkClassName={"NextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
}
export default MyVacations;
