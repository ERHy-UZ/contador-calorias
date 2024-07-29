import { ActivityType } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: ActivityType } }

export type ActivityState = {
    activities: ActivityType[]
}

export const initialState: ActivityState = {
    activities: []
}

export const ActivityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        
        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    return state
}