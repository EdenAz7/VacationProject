import FollowModel from "../model/SavedModel";

//  Follow AppState
export class FollowState {
    public follows: FollowModel[] = [];
}


// Follow ActionType
export enum FollowActionType {
    addFollow = "addFollow",
    deleteFollow = "deleteFollow",
    userFollows = "userFollows",

}

export interface FollowAction {
    type: FollowActionType;
    payload?: any;
}

// Follow Action Creators
export function addFollowAction(followToAdd: FollowModel): FollowAction {
    return { type: FollowActionType.addFollow, payload: followToAdd };
}


export function deleteFollowAction(followToDelete: FollowModel): FollowAction {
    return { type: FollowActionType.deleteFollow, payload: followToDelete };
}


export function userFollowsAction(follows: FollowModel[]): FollowAction {
    return { type: FollowActionType.userFollows, payload: follows };
}


// Follow Reducer
export function followReducer(currentFollowState: FollowState = new FollowState(), action: FollowAction): FollowState {
    const newFollowState = { ...currentFollowState };

    switch (action.type) {
        case FollowActionType.addFollow:
            newFollowState.follows.push(action.payload);
            break;

        case FollowActionType.deleteFollow:
            const followIndex = newFollowState.follows.findIndex(follow => follow.user_ID === action.payload.id && follow.vacation_ID === action.payload.vacationId);
            newFollowState.follows.splice(followIndex, 1);
            break;

        case FollowActionType.userFollows:
            newFollowState.follows = action.payload;
            break;
    }

    return newFollowState;
}

