import { Person, Password } from "@mui/icons-material";
import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import { group } from "console";
import { config, send } from "process";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import UserModel from "../../../model/userModel";
import notify from "../../../utils/Notify";
import groupService from "../../../utils/UserService";
import "./Login.css";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const [users, setData] = useState("");
    const send = async (userData: UserModel) => {
        try{
            await groupService.LoginUser(userData);
            notify.success("you are logged in");
            navigate("/home");
        }catch(err:any){
            notify.error("Incorrect Username or Password")
        }

    }
    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Login</Typography><br />
                <Person style={{ fontSize: 40, margin: 10 }} />
                <TextField label="User Name" variant="outlined"
                    inputProps={{ sx: { color: "black", backgroundColor: "white" } }}
                    InputLabelProps={{ style: { color: "black", backgroundColor: "white" } }}
                    {...register("user_name", {
                        required: {
                            value: true,
                            message: "Please input your name",
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
                            message: "Please input your password",
                        },
                    })} />
                <br />
                <span>{errors.user_password?.message}</span>
                <br /><br />
                <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                    <Button color="primary" type="submit">Login</Button>
                    <Button color="warning" onClick={() => {
                        navigate("/register");
                    }}>Register</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default Login;
