import { Person, Password } from "@mui/icons-material";
import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import UserModel from "../../../model/userModel";
import groupService from "../../../utils/UserService";
import "./Register.css";
import notify from "../../../utils/Notify";
function Register(): JSX.Element {

    const [account,setAccount] = useState<UserModel[]>([]);
    //to use useFrom write this line
    const {register , handleSubmit, formState: {errors}}= useForm<UserModel>();
    const [userData,setData] = useState<UserModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');
    //hook form....
    async function send(user:UserModel){
        try{
            await groupService.addUser(user);
            notify.success("register is successful");
            navigate("/home")
            //manual routing....
        } catch (err:any){
            notify.error("This Username Already exists!");
        }
    }

    useEffect(()=>{
        if (id>0){
            //load data from data base :)
            
        }
        groupService.getAllUsers()
        .then (user => setAccount(user))
        .catch(err=>alert(err.message));
    },[]);


    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Register</Typography><br />
                <ArrowForwardIcon style={{ fontSize: 40, margin: 10 }} />
                <TextField label="First Name" variant="outlined"
                    inputProps={{ sx: { color: "black", backgroundColor: "white" } }}
                    InputLabelProps={{ style: { color: "black", backgroundColor: "white" } }}
                    {...register("first_name", {
                        required: {
                            value: true,
                            message: "Please input your First Name",
                        },
                    })}
                /><br />
                <span>{errors.first_name?.message}</span>
                <br /><br />
                <ArrowForwardIcon style={{ fontSize: 40, margin: 10 }} />
                <TextField label="Last Name" variant="outlined"
                    inputProps={{ sx: { color: "black", backgroundColor: "white" } }}
                    InputLabelProps={{ style: { color: "black", backgroundColor: "white" } }}
                    {...register("last_name", {
                        required: {
                            value: true,
                            message: "Please input your Last Name",
                        },
                    })}
                /><br />
                <span>{errors.last_name?.message}</span>
                <br /><br />
                <Person style={{ fontSize: 40, margin: 10 }} />
                <TextField label="User Name" variant="outlined"
                    inputProps={{ sx: { color: "black", backgroundColor: "white" } }}
                    InputLabelProps={{ style: { color: "black", backgroundColor: "white" } }}
                    {...register("user_name", {
                        required: {
                            value: true,
                            message: "Please input your User Name",
                        },
                    })}
                /><br />
                <span>{errors.user_name?.message}</span>
                <br /><br />
                <Password style={{ fontSize: 40, margin: 10 }} />
                <TextField label="User Password" type={"password"} variant="outlined"
                    inputProps={{ sx: { color: "black", backgroundColor: "white" } }}
                    InputLabelProps={{ style: { color: "black", backgroundColor: "white" } }}
                    {...register("user_password", {
                        required: {
                            value: true,
                            message: "Please input your Password",
                        },
                    })} />
                <br />
                <span>{errors.user_password?.message}</span>
                <br /><br />
                <Button variant="contained" type="submit">Register</Button>
            </form>
        </div>
    );
}

export default Register;
