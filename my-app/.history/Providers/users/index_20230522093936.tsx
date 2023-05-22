import React, {
    FC,
    PropsWithChildren,
    useReducer,
    useContext,
    useState,
} from 'react';
import { UserReducer } from './reducer';
import {
    ILogin,
    INITIAL_STATE,
    IUser,
    IUserStateContext,
    UserActionContext,
    UserContext,
} from './context';
import {
    loginUserRequestAction,
    createUserRequestAction,
    logOutUserRequestAction,
    setCurrentUserRequestAction,
    getUserDetailsRequestAction,
} from './action';

import { message, notification } from 'antd';
import { Action } from 'redux-actions';
import { useGet } from 'restful-react';
// import { useRouter } from 'next/router';

const UserProvider = ({ }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    // const{ push} = useRouter();
try{
    const loginUser = async (payload: ILogin) => {
        const { data: loginData, refetch: getMoviesHttp } = useGet({
            path: 'api/TokenAuth/Authenticate',
        });
       /* useEffect(() => {
            moviesData && dispatch(getMoviesRequestAction(moviesData.result));
        }, [moviesData, dispatch]);
        const getMovie = () => getMoviesHttp();*/

            if (loginData.ok) {
                const data = await loginData.json();

                notification.success({
                    message: 'Success',
                    description: 'Login successful',
                });
                dispatch(loginUserRequestAction(data));
                localStorage.setItem('token', data.result.accessToken);
                window.location.href = '/MoviesTable';
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Invalid username or password',
                });
            }}
        } catch (error) {
            // Remove token from local storage
            notification.error({
                message: 'Error',
                description: 'Login failed',
            });
        }
    };

    const createUser = async (userRegInfo: IUser) => {
        const token = localStorage.getItem('token');
        await fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer  ${token}`,
            },
            body: JSON.stringify(userRegInfo),
        }).then((res) => {
            res.json().then((data) => {
                dispatch(createUserRequestAction(userRegInfo));
                message.success('user registration successfull');
                window.location.href = '/login';
            });
        });
    };
    const getUserDetails = async (id: number) => {
        const token = localStorage.getItem('token');
        await fetch(
            `https://localhost:44311/api/services/app/Person/Get?id=${id}`,
            {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer  ${token}`,
                },
            }
        ).then((res) => {
            res.json().then((data) => {
                dispatch(getUserDetailsRequestAction(id));
                dispatch(setCurrentUserRequestAction(data.result));
            });
        });
    };
    const logOutUser = () => {
        dispatch(logOutUserRequestAction());
        localStorage.removeItem('token');
    };
    return (
        <UserContext.Provider value={state}>
            <UserActionContext.Provider
                value={{
                    
                    createUser,
                    logOutUser,
                    getUserDetails,
                }}
            >
                
            </UserActionContext.Provider>
        </UserContext.Provider>
    );
};
function useLoginState() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }
    return context;
}
function useLoginActions() {
    const context = useContext(UserActionContext);
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider');
    }
    return context;
}
function useUser() {
    return {
        ...useLoginActions(),
        ...useLoginState(),
    };
}
export { UserProvider, useUser };
    function dispatch(arg0: Action<IUserStateContext>) {
        throw new Error('Function not implemented.');
    }

