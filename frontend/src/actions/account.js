import { ACCOUNT } from './types';

//double arrow funciton allows binding 'dispatch' to action creator 
//in mapDispatchToProps
const fetchFromAccount = (endpoint,  methodOptions, actionType) => dispatch => {
    //object with extra details for POST. default is GET
    console.log('clicked')
    return fetch(`http://localhost:3000/account/${endpoint}`, methodOptions).then(response => response.json())
        .then(json => { 
            if (json.type === 'error'){
                dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message})
            } else {
                dispatch({ type: actionType, ...json })
            }
         })
        .catch(error => dispatch({
            type: ACCOUNT.FETCH_ERROR, message: error.message
        }));
}


export const signup = ({ username, password }) =>  fetchFromAccount('signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
    }, ACCOUNT.FETCH_SUCCESS)

export const login = ({ username, password }) =>  fetchFromAccount('login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        }, ACCOUNT.FETCH_SUCCESS)

export const logout = () => fetchFromAccount('logout', 
    {credentials: 'include'}, ACCOUNT.FETCH_LOGOUT_SUCCESS)