import { ActivityType } from "../types"

//Types
export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: ActivityType } } |
    { type: 'set-edit-id', payload: { id: number } } |
    { type: 'delete-activity', payload: { id: number } } |
    { type: 'delete-all' } |
    { type: 'asign-id' }

export type ActivityState = {
    activities: ActivityType[]
    editId: ActivityType['id']
    productId: ActivityType['id']
}

//Local Storage
const localStorageActivities = (): ActivityType[] => {
    const localActivities = localStorage.getItem('activities')
    return localActivities ? JSON.parse(localActivities) : []
}

const localStorageID = (): ActivityType['id'] => {
    const localID = localStorage.getItem('currentID')
    return localID ? JSON.parse(localID) : 1
}

//State
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    editId: 0,
    productId: localStorageID()
}

//Reducer
export const ActivityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        let actividadesActualizadas: ActivityType[]

        if (state.editId !== 0) {
            actividadesActualizadas = state.activities.map(act => act.id === state.editId ? action.payload.newActivity : act)
        } else {
            actividadesActualizadas = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: actividadesActualizadas,
            editId: 0
        }
    }
    if (action.type === 'set-edit-id') {

        return {
            ...state,
            editId: action.payload.id
        }
    }
    if (action.type === 'delete-activity') {

        const actividadesActualizadas = state.activities.filter(act => act.id !== action.payload.id)

        return {
            ...state,
            activities: actividadesActualizadas
        }
    }
    if (action.type === 'delete-all') {

        return {
            activities: [],
            editId: 0,
            productId: 1
        }
    }
    if (action.type === 'asign-id') {
        let newId = 0
        if (state.editId === 0) {
            newId = state.productId + 1
        } else {
            newId = state.productId
        }

        return {
            ...state,
            productId: newId
        }
    }

    return state
}