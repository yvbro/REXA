import { pending, fulfilled, rejected } from '../../../helpers/promise';
import reducer, { FETCH_USERS, SWITCH_ENABLED_USER, ADD_USER } from './userDuck';

const TEST_USERS = [
    { email: 'admin@test.com', role: ['ADMIN', 'USER'], enabled: true},
    { email: 'user@test.com', role: ['USER'], enabled: true},
    { email: 'disabled@test.com', role: ['USER'], enabled: false},
];

const INITIAL_STATE = {
    data: [],
    loading: false,
};

const REGULAR_STATE = {
    data: TEST_USERS,
    loading: false,
};


describe('User Reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should return be loading when fetching users', () => {
        expect(reducer(INITIAL_STATE, {type: pending(FETCH_USERS)})).toEqual({
            data: [],
            loading: true
        });
    });

    it('should set users after fetching users', () => {
        expect(reducer(INITIAL_STATE, {type: fulfilled(FETCH_USERS), payload: {data: TEST_USERS}})).toEqual({
            data: TEST_USERS,
            loading: false
        });
    });

    it('should unset loading but keep previous state if fetching users is rejected', () => {
        expect(reducer({...REGULAR_STATE, loading: true}, {type: rejected(FETCH_USERS)})).toEqual({
            data: TEST_USERS,
            loading: false
        });
    });

    it('should enable user when sending the request for disabled user', () => {
        expect(reducer(REGULAR_STATE, {type: pending(SWITCH_ENABLED_USER), payload: {userEmail: 'disabled@test.com', enabled: true}})).toEqual({
            data: [
                { email: 'admin@test.com', role: ['ADMIN', 'USER'], enabled: true},
                { email: 'user@test.com', role: ['USER'], enabled: true},
                { email: 'disabled@test.com', role: ['USER'], enabled: true},
            ],
            loading: false
        });
    });

    it('should undo action if request rejected for switching enabled user', () => {
        expect(reducer(REGULAR_STATE, {type: rejected(SWITCH_ENABLED_USER), payload: {userEmail: 'disabled@test.com', enabled: true}})).toEqual({
            data: [
                { email: 'admin@test.com', role: ['ADMIN', 'USER'], enabled: true},
                { email: 'user@test.com', role: ['USER'], enabled: true},
                { email: 'disabled@test.com', role: ['USER'], enabled: false},
            ],
            loading: false
        });
    });

    it('should add user with default roles', () => {
        expect(reducer(REGULAR_STATE, {type: ADD_USER, payload: 'newUser@test.com'})).toEqual({
            data: [
                ...TEST_USERS,
                {email: 'newUser@test.com', roles: ['USER'], enabled: false}
            ],
            loading: false
        });
    });
});
