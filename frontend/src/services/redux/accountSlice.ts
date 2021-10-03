import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AccountState {
  address?: string;
  authenticated: boolean;
}

const initialState: AccountState = {
	authenticated: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		setAccount: (state, action: PayloadAction<AccountState['address']>) => {
			state.address = action.payload;
			if (!action.payload) {
				state.authenticated = false;
			}
		},
		setAuthenticated: (state, action: PayloadAction<AccountState['authenticated']>) => {
			state.authenticated = action.payload;
			if (!action.payload) {
				Cookies.remove('auth');
			}
		},
	},
});

export const {setAccount, setAuthenticated} = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
export {dispatch} from './store';
