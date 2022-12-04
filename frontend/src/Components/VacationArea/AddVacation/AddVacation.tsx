import { Person, Password } from "@mui/icons-material";
import { Typography, TextField, Checkbox, ButtonGroup, Button, createTheme, ThemeProvider, Container, CssBaseline, Box } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import groupService from "../../../utils/UserService";
import notify from "../../../utils/Notify";
import { VacationModel } from "../../../model/vacationModel";
import vacationsService from "../../../utils/VacationService";

const theme = createTheme();

function AddVacation(): JSX.Element {

    const [account,setAccount] = useState<VacationModel[]>([]);
    //to use useFrom write this line
    const {register , handleSubmit, formState: {errors}}= useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');
    //hook form....
    async function send(vacation:VacationModel){
        try{
            await vacationsService.addVacation(vacation);
            notify.success(`Vacation ${vacation.destination} was added`);
            navigate("/home");
        } catch (err:any){
            notify.error(err.message);
        }
    }

    useEffect(()=>{
        if (id>0){
            
        }
        vacationsService.getAllVacations()
        .then (user => setAccount(user))
        .catch(err=>alert(err.message));
    },[]);


    return (
        <div className="Vacation">
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'rgba(255,255,255, 0.9);',
                        padding: 2,
                        borderRadius: 3
                    }}
                >
            <form onSubmit={handleSubmit(send)} method={"post"} action="/" encType={"multipart/form-data"}>
            <Typography component="h1" variant="h5">
                        Add Vacation
                    </Typography>
                    <br />
                <TextField fullWidth
                            variant="standard"
                            margin='normal'
                            type="text"
                            helperText="Description"
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Name is required",
                        },
                    })}
                /><br />
                <span>{errors.description?.message}</span>
                <br /><br />
                <TextField variant="standard"
                            fullWidth
                            helperText="Destination"
                            margin="normal"
                            type="text"
                    {...register("destination", {
                        required: {
                            value: true,
                            message: "Destination is required",
                        },
                    })}
                /><br />
                <span>{errors.destination?.message}</span>
                <br /><br />
                <TextField
                           fullWidth
                           margin='normal'
                           variant='standard'
                           helperText="Image"
                           type="file"
                           inputProps={{ accept: "image/*" }}
                            {...register("image", {
                                required: { value: true, message: "Missing image" }
                            })}
                        /><br />
                <span>{errors.image?.message}</span>
                <br /><br />
                <TextField 
                        margin='normal'
                        variant='standard'
                        fullWidth
                        type="date"
                        helperText="From Date"
                    {...register("from_date", {
                        required: {
                            value: true,
                            message: "Missing date",
                        },
                    })} />
                <br />
                <span>{errors.from_date?.message}</span>
                <br /><br />
                <TextField 
                    fullWidth
                    margin='normal'
                    variant='standard'
                    helperText="To Date"
                    type="date"
                    {...register("to_date", {
                        required: {
                            value: true,
                            message: "Missing date",
                        },
                    })} />
                <br />
                <span>{errors.to_date?.message}</span>
                <br /><br />
                <TextField
                    fullWidth
                    margin='normal'
                    type="number"
                    helperText="Price"
                    variant='standard'
                    {...register("price", {
                        required: {
                            value: true,
                            message: "Price is required",
                        },
                    })} />
                <br />
                <span>{errors.price?.message}</span>
                <br /><br />
                <Button variant="contained" type="submit">Add Vacation</Button>
            </form>
                </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default AddVacation;
