class SavedModel {
    public user_ID: number;
    public vacation_ID: number;


    public constructor(user_ID:number,vacation_ID:number){
        this.user_ID = user_ID;
        this.vacation_ID = vacation_ID;
    }
};

export default SavedModel;