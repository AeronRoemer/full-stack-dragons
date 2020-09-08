import { ACCOUNT } from './types';

//double arrow funciton allows binding 'dispatch' to action creator 
//in mapDispatchToProps
export const fetchFromAccount = (
    endpoint,  
    methodOptions,
    FETCH_TYPE, 
    ERROR_TYPE,
    SUCCESS_TYPE
    ) => dispatch => {
    //object with extra details for POST. default is GET
    return fetch(`http://localhost:3000/account/${endpoint}`, methodOptions).then(response => response.json())
        .then(json => { 
            if (json.type === 'error'){
                dispatch({ type: ERROR_TYPE, message: json.message})
            } else {
                dispatch({ type: SUCCESS_TYPE, ...json })
            }
         })
        .catch(error => dispatch({
            type: ERROR_TYPE, message: error.message
        }));
}


export const signup = ({ username, password }) =>  fetchFromAccount('signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
    },   
    ACCOUNT.FETCH,
    ACCOUNT.FETCH_ERROR,
    ACCOUNT.FETCH_SUCCESS)

export const login = ({ username, password }) =>  fetchFromAccount('login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        },
        ACCOUNT.FETCH,
        ACCOUNT.FETCH_ERROR,
        ACCOUNT.FETCH_SUCCESS)

export const fetchAuthenticated = () =>  fetchFromAccount('authenticated', {
        credentials: 'include'
        }, 
        ACCOUNT.FETCH,
        ACCOUNT.FETCH_ERROR,
        ACCOUNT.FETCH_AUTHENTICATED_SUCCESS)

export const logout = () => fetchFromAccount('logout', 
    {credentials: 'include'}, 
    ACCOUNT.FETCH,
    ACCOUNT.FETCH_ERROR,
    ACCOUNT.FETCH_LOGOUT_SUCCESS)