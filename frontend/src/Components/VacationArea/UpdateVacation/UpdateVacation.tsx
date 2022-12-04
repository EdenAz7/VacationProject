import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { VacationModel } from '../../../model/vacationModel';
import groupService from '../../../utils/UserService';
import notify from '../../../utils/Notify';
import vacationsService from '../../../utils/VacationService';


// MUI theme
const theme = createTheme();

function UpdateVacation(): JSX.Element {
    const params = useParams();

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<VacationModel>();

   
    //  On submit update the vacation
    async function submit(vacation: VacationModel) {
        try {
            //  get the vacation id from the url
            const id = +params.id;
            vacation.id = id;
            await vacationsService.updateVacation(vacation);
            notify.success(`Vacation ${vacation.destination} was updated`);
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }


    return (
        <form onSubmit={handleSubmit(submit)} method={"post"} action="/" encType={"multipart/form-data"}>
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
                    <Typography component="h1" variant="h5">
                        Update Vacation
                    </Typography>

                        <TextField
                            variant="standard"
                            fullWidth
                            helperText="Destination"
                            margin="normal"
                            type="text"
                            {...register("destination", {
                                required: "Name is required",
                                minLength: { value: 3, message: "Name must be minimum 3 chars" },
                                maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                            })}
                            {...formState.errors.destination && {
                                helperText: formState.errors.destination.message,
                                error: true
                            }}
                        />

                        <TextField
                            fullWidth
                            variant="standard"
                            margin='normal'
                            type="text"
                            helperText="Description"
                            {...register("description", {
                                required: { value: true, message: "Description is required" },
                                minLength: { value: 3, message: "Name must be minimum 3 chars" },
                                maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                            })}
                            {...formState.errors.description && {
                                helperText: formState.errors.description.message,
                                error: true
                            }}
                        />

                        <TextField
                            fullWidth
                            margin='normal'
                            type="number"
                            helperText="Price"
                            variant='standard'
                            {...register("price", {
                                required: { value: true, message: "Price is required" },
                                min: { value: 0, message: "Price can't be negative" },
                                max: { value: 1000, message: "Price can't exceed $1000" }
                            })}
                            {...formState.errors.price && {
                                helperText: formState.errors.price.message,
                                error: true
                            }}
                        />

                        <TextField
                            margin='normal'
                            variant='standard'
                            fullWidth
                            type="date"
                            helperText="From Date"
                            {...register("from_date", {
                                required: { value: true, message: "From date is required" },
                                validate: (value) => {
                                    const today = new Date();
                                    const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
                                    const date = new Date(value);
                                    if (date < yesterday) {
                                        return "From date can't be past today";
                                    }
                                    return true;
                                }

                            })}
                            {...formState.errors.from_date && {
                                helperText: formState.errors.from_date.message,
                                error: true
                            }}
                        />

                        <TextField
                            fullWidth
                            margin='normal'
                            variant='standard'
                            helperText="To Date"
                            type="date"
                            {...register("to_date", {
                                required: { value: true, message: "Missing date" },

                            })}
                            {...formState.errors.to_date && {
                                helperText: formState.errors.to_date.message,
                                error: true
                            }}
                        />

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
                            {...formState.errors.image && {
                                helperText: formState.errors.image.message,
                                error: true
                            }}

                        />
                        <Button variant="contained" type="submit">UpdateVacation</Button>
                        <Button><NavLink to="/home">Back</NavLink></Button>

                    </Box>
            </Container>
        </ThemeProvider>
        </form>
    );
}

export default UpdateVacation;
