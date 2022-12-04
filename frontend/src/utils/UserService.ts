import axios from "axios";
import Role from "../model/Role";
import UserModel from "../model/userModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import { store } from "../Redux/Store";
import appUrl from "./Config";

class GroupService{
    public isAdmin(): boolean {
        const user = store.getState().user;
        if (user) {
            const role = user.is_admin;
            if (role === Role.Admin) return true;
            if (role === Role.User) return false;
        }
        return false;
    }

    public isLoggedIn(): boolean {
        return store.getState().user !== null;
    }

    public logout(): void {
        store.dispatch(logoutAction());
    }

    public async LoginUser(user:UserModel){
        const response = await axios.post<string>(appUrl.loginUser,user);
        const users = response.data;
        store.dispatch(loginAction(users));
    }
    
    public async addUser(user:UserModel):Promise<void>{
        const response = await axios.post<string>(appUrl.addUser,user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    public async getAllUsers():Promise<UserModel[]>{
        const response = await axios.get<UserModel[]>(appUrl.users);
        return response.data;
    }

}

const groupService = new GroupService();
export default groupService;