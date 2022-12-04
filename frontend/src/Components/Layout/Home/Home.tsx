import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Home.css";
import { VacationModel } from '../../../model/vacationModel';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import Role from '../../../model/Role';
import UserModel from '../../../model/userModel';
import { vacationsStore } from '../../../Redux/Store';
import { deleteVacationAction } from '../../../Redux/VacationsState';
import vacationsService from '../../../utils/VacationService';
import notify from '../../../utils/Notify';
import Follow from '../../VacationArea/Follow/Follow';

    interface VacationCardProps {
        vacation: VacationModel;
        user: UserModel;
    }
    function Home(props: VacationCardProps): JSX.Element {
        const navigator = useNavigate();
        // Delete vacation
        async function handleDelete(vacationId: number) {
            try {
                // ask the user if he really wants to delete the vacation
                const answer: boolean = window.confirm('Are you sure you want to delete this vacation?');
                if (!answer) return;
                // // delete vacation from the server
                await vacationsService.deleteVacation(vacationId);
                // // delete vacation from redux
                vacationsStore.dispatch(deleteVacationAction(vacationId));
                notify.success("Vacation deleted");
            }
            catch (err: any) {
                notify.error(err.message);
            }
        }
    
        return (
            <Card sx={{
                maxWidth: 445,
                maxHeight: 450,
                height: 440,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.9)",
    
            }} >
                {props.user?.is_admin === Role.Admin &&
                    <Typography variant="body1" color="dark">
                        Follows: {props.vacation?.followers}
                    </Typography>}
                <CardMedia
                    component="img"
                    height="200"
                    src={props.vacation.image}
                    alt={props.vacation.destination}
                />
                <CardContent>
                    <Typography variant="subtitle1" color="dark">
                        {props.vacation.destination}
                    </Typography>
                    <Typography variant="subtitle2" color="dark">
    
                        {props.vacation.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {props.vacation.price}$
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        From: {props.vacation.from_date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        To: {props.vacation.to_date}
                    </Typography>
                </CardContent>
                {props.user?.is_admin === Role.Admin ?
                    <CardActions disableSpacing>
                        <IconButton aria-label="edit"
                            aria-haspopup="true"
                            onClick={() => navigator("/updateVacation/" + props.vacation?.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => { handleDelete(props.vacation?.id) }}>
                            <ClearIcon />
                        </IconButton>
    
                    </CardActions>
                    :
                    <>
                       
                        <Follow vacationId={props.vacation?.id} followers={props.vacation?.followers}/>
                    </>
    
                }
            </Card>
        );
    }
    

export default Home;
