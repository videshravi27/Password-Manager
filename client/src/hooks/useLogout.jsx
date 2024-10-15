import { useAuthContext } from './useAuthContext'
import { useDetailsContext } from './useDetailsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: detailsDispatch } = useDetailsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        detailsDispatch({type: 'SET_DETAILS', payload: null})
        
    }
    return { logout }
}