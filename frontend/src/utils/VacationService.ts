import axios from "axios";
import { VacationModel } from "../model/vacationModel";
import { vacationsStore } from "../Redux/Store";
import appUrl from "./Config";
import { addVacationAction, deleteVacationAction, fetchFollowedVacationsAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState";
class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appUrl.getAllVacation);
        const vacations = response.data;
        return vacations;
    }

    public async getAllFollowedVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appUrl.getFollowers);
        const followedVacations = response.data;
        return followedVacations;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appUrl.getOneVacation + id);
        const vacation = response.data;
        vacationsStore.dispatch(addVacationAction(vacation));
        return vacation;
    }
    
    public async addVacation(vacation:VacationModel):Promise<void>{
        return new Promise((resolve, reject) => {
        const file = vacation.image[0] as unknown as File;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            const image = reader.result;
            await axios.post<VacationModel>(appUrl.addVacation,{...vacation, image}).then(() => resolve());
            vacationsStore.dispatch(addVacationAction(vacation));
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    });
}

    public async updateVacation(vacation:VacationModel):Promise<void>{
        return new Promise((resolve, reject) => {
            const file = vacation.image[0] as unknown as File;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const image = reader.result;
                axios.put<VacationModel>(appUrl.updateVacation + vacation.id,{...vacation, image}).then(()=>resolve());
                vacationsStore.dispatch(updateVacationAction(vacation));
            };
            reader.onerror = function(error){
                console.log('Error: ',error);
            };
        });
    }


    // Delete vacation from API
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appUrl.deleteVacation + id);
        vacationsStore.dispatch(deleteVacationAction(id));
    }
}

const vacationsService = new VacationService();

export default vacationsService;