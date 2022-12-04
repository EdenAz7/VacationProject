
import jwtDecode from "jwt-decode";
import UserModel from "../model/userModel";


export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            const decodedData = jwtDecode(this.token); //Decode the token
            this.user = (decodedData as any).user;
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: string; //Token
}

export function registerAction(token: string): AuthAction {
    return { type: AuthActionType.Register, payload: token };
}

export function loginAction(token: string): AuthAction {
    return { type: AuthActionType.Login, payload: token };
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

export function AuthReducer(currentAuthState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newAuthState = { ...currentAuthState };

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newAuthState.token = action.payload;
            const decodedData = jwtDecode(newAuthState.token);
            newAuthState.user = (decodedData as any).user;
            localStorage.setItem("token", newAuthState.token);
            break;

        case AuthActionType.Logout:
            newAuthState.token = null;
            newAuthState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newAuthState;
}