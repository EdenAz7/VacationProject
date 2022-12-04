import { VacationModel } from "../model/vacationModel";

// Vacations AppState 
export class VacationsState {
    public vacations: VacationModel[] = [];
    public followedVacations: VacationModel[] = [];

}

// Vacations ActionType
export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    FetchFollowedVacations = "FetchFollowedVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

// Vacations Action
export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

// Vacations Action Creators
export function fetchVacationsAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.FetchVacations, payload: vacations };
}

export function fetchFollowedVacationsAction(followedVacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.FetchFollowedVacations, payload: followedVacations };
}

export function addVacationAction(vacationToAdd: VacationModel): VacationsAction {
    return { type: VacationsActionType.AddVacation, payload: vacationToAdd };
}

export function updateVacationAction(vacationToUpdate: VacationModel): VacationsAction {
    return { type: VacationsActionType.UpdateVacation, payload: vacationToUpdate };
}

export function deleteVacationAction(idToDelete: number): VacationsAction {
    return { type: VacationsActionType.DeleteVacation, payload: idToDelete };
}

// Vacations Reducer
export function vacationsReducer(currentVacationsState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate the current vacations state int a new one:
    const newVacationsState = { ...currentVacationsState };

    switch (action.type) {
        case VacationsActionType.FetchVacations:
            newVacationsState.vacations = action.payload;
            break;

        case VacationsActionType.FetchFollowedVacations:
            newVacationsState.followedVacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newVacationsState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newVacationsState.vacations.findIndex(v => v.id === action.payload.vacationId);
            newVacationsState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newVacationsState.vacations.findIndex(v => v.id === action.payload);
            newVacationsState.vacations.splice(indexToDelete, 1);
            break;
    }
    return newVacationsState;
}