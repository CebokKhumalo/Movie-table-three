import { createContext } from 'react';

export interface IMovies {
    title: string;
    duration: string;
    staring: string;
    category: string;
    id: string;
    imageLink: string;
    videolink: string;
}

export const INITIAL_STATE: IMovieStateContext = {Movies: []};

export interface IMovieStateContext {
    readonly Movies?: IMovies[];
    readonly OneMovie?: IMovies;
}

export interface IMovieActionContext {
    getMovie?: () => void;
    getMovieId?: (id)
}

export const MovieContext = createContext<IMovieStateContext>(INITIAL_STATE);
export const MovieActionContext = createContext<IMovieActionContext>(undefined);
