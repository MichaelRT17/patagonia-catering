import axios from 'axios';

const initialState = {
    user: {},
    total: ''
}

const GET_USER_DATA = 'GET_USER_DATA';
const TOTAL = 'TOTAL'

export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data)
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getTotal(total) {
    return {
        type: TOTAL,
        payload: total 
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case TOTAL:
            return Object.assign({}, state, { total: action.payload })
        default:
            return state;
    }
}