import { CardActions, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import { vacationsStore } from "../../../Redux/Store";
import { updateVacationAction } from "../../../Redux/VacationsState";
import notify from "../../../utils/Notify";
import followService from "../../../utils/FollowService";
import vacationsService from "../../../utils/VacationService";
import groupService from "../../../utils/UserService";

interface FollowProps {
    vacationId: number;
    followers: number;
}

function Follow(props: FollowProps): JSX.Element {

    const [isFollow, setIsFollow] = useState<boolean>(false);
    
    useEffect((async () => {
        try {
            let unsubscribe: Unsubscribe;

            if (groupService.isLoggedIn()) {
                let userFollows = await vacationsService.getAllFollowedVacations();
                const isFollowedVacations = userFollows.find(f => f.id === props.vacationId);
                if (isFollowedVacations) setIsFollow(true);
                else if (!isFollowedVacations) setIsFollow(false);

                // Listen to followed vacations changes
                unsubscribe = vacationsStore.subscribe(() => {
                    userFollows = vacationsStore.getState().followedVacations;
                    const isVacationFollowed = userFollows.find(f => f.id === props.vacationId);
                    if (isVacationFollowed) setIsFollow(!isFollow);
                    else if (!isVacationFollowed) setIsFollow(false);
                });
            }

            return () => {unsubscribe()};
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }) as any, []);

    const addFollow = async () => {
        try {
            // add follow
            await followService.addFollow(props.vacationId);
            // update vacations
            const followedVacation = await vacationsService.getOneVacation(props.vacationId);
            // update store
            vacationsStore.dispatch(updateVacationAction(followedVacation));
            // // update state
            setIsFollow(true);
            // notify
            notify.success("Vacation followed");

        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    const removeFollow = async () => {
        try {
            // remove follow
            await followService.removeFollow(props.vacationId);
            // update vacations
            const unfollowedVacation = await vacationsService.getOneVacation(props.vacationId);
            // update store
            vacationsStore.dispatch(updateVacationAction(unfollowedVacation));
            // update state
            setIsFollow(false);
            // notify
            notify.success("Vacation unFollowed");
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    return (
        <CardActions>
            {isFollow ? <IconButton onClick={removeFollow}><FavoriteIcon /></IconButton> : <IconButton onClick={addFollow}><FavoriteBorderIcon /></IconButton>}
           {props.followers}
        </CardActions>


    );
}

export default Follow;