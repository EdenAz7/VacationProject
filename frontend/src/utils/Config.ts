class Config{
    //backend routes
    public baseURL = "http://localhost:3001";
    public addVacation = this.baseURL+"/api/addVacation";
    public addFollow = this.baseURL+"/api/addfollow/";
    public deleteFollow = this.baseURL+"/api/remove/";
    public getFollowers = this.baseURL+"/api/getFollowedVacations";
    public deleteVacation = this.baseURL+"/api/deleteVacation/";
    public getAllVacation = this.baseURL+"/api/vacation";
    public getOneVacation = this.baseURL+"/api/vacation/";
    public updateVacation = this.baseURL+"/api/updateVacation/"
    public addUser = this.baseURL+"/api/register/";
    public users = this.baseURL+"/api/user"
    public loginUser = this.baseURL+"/api/login/";
}

const appUrl = new Config();
export default appUrl;