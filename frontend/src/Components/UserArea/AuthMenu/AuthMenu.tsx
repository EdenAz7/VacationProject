import "./AuthMenu.css";
import { Button } from "@mui/material";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../model/userModel";
import { store } from "../../../Redux/Store";


interface AuthMenuState{
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState>{

    private unsubscribeMe: Unsubscribe;

    public componentDidMount() {
    this.setState({user:store.getState().user});
    this.unsubscribeMe = store.subscribe(()=>{
        const user = store.getState().user
        this.setState({user});
    })
}

public render(): JSX.Element {




    return (
        <div className="AuthMenu">
                {!this.state?.user &&
                    <>
                        <span>Hello Guest</span>
                        <NavLink to="/login">
                            <Button variant="contained" color="inherit">
                                Sign In
                            </Button>
                        </NavLink>

                    </>
                }
                {this.state?.user &&
                    <>
                        <span>Hello {this.state.user.first_name}</span>
                        <NavLink to="/logout">
                            <Button variant="contained" color="error">
                                Logout
                            </Button>
                        </NavLink>
                    </>
                }

            </div>
    );
}

public componentWillUnmount(): void {
    this.unsubscribeMe();
}

}

export default AuthMenu;
