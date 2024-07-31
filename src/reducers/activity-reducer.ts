import { ActivityType } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: ActivityType } } |
    { type: 'set-edit-id', payload: { id: ActivityType['id'] } } |
    { type: 'delete-activity', payload: { id: ActivityType['id'] } } |
    { type: 'delete-all' }

export type ActivityState = {
    activities: ActivityType[]
    editId: ActivityType['id']
}

const localStorageActivities = () : ActivityType[] => {
    const localActivities = localStorage.getItem('activities')
    return localActivities ? JSON.parse(localActivities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    editId: ''
}

export const ActivityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        let actividadesActualizadas: ActivityType[]

        if (state.editId.length > 0) {
            actividadesActualizadas = state.activities.map(act => act.id === state.editId ? action.payload.newActivity : act)
        } else {
            actividadesActualizadas = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: actividadesActualizadas,
            editId: ''
        }
    }
    if (action.type === 'set-edit-id') {

        return {
            ...state,
            editId: action.payload.id
        }
    }
    if (action.type === 'delete-activity') {
        
        const actividadesActualizadas = state.activities.filter(act => act.id !== action.payload.id )

        return {
            ...state,
            activities: actividadesActualizadas
        }
    }
    if (action.type === 'delete-all') {

        return {
            activities: [],
            editId: ''
        }
    }

    return state
}