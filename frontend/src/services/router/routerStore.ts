import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface RouterState {
  currentRoute?: Route;
  routes: Route[];
	data?: object;
}

export interface Route {
  name: string;
  path: string;
  loader: () => Promise<any>;
  data?: Object;
}

const initialState: RouterState = {
	currentRoute: undefined,
	routes: [],
};

export interface RouteToAction {
  name: string;
  data?: Object;
}

export const routerSlice = createSlice({
	name: 'router',
	initialState,
	reducers: {
		registerRoute: (state, action: PayloadAction<Route>) => {
			state.routes = [...state.routes, action.payload];
		},
		routeToData: (state, action: PayloadAction<RouteToAction>) => {
			const targetRoute = state.routes.find(r => action.payload.name === r.name) as Route;
			state.data = action.payload.data;
			state.currentRoute = targetRoute;
		},
		routeTo: (state, action: PayloadAction<string>) => {
			const targetRoute = state.routes.find(r => action.payload === r.name) as Route;
			state.currentRoute = targetRoute;
		},
	},
});

export const store = configureStore({
	reducer: {router: routerSlice.reducer},
	middleware: defaults => defaults({
		serializableCheck: false,
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const {registerRoute, routeTo} = routerSlice.actions;
export const {dispatch: router} = store;

