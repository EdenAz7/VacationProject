import axios from "axios";
import SavedModel from "../model/SavedModel";
import appUrl from "./Config";

class FollowService{

    public async addFollow(id:number):Promise<SavedModel>{
        const response = await axios.post<SavedModel>(appUrl.addFollow + id);
        const followedVacation = response.data;
        return followedVacation;
    }
    public async removeFollow(id: number): Promise<void> {
        const response = await axios.delete(appUrl.deleteFollow + id);
    }
}
const followService = new FollowService();

export default followService