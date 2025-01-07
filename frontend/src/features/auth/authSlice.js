import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Leer el usuario desde el localStorage al iniciar la aplicación
const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
    user: user ? user : null,
    userInfo: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Función para manejar el almacenamiento de usuario en localStorage
const storeUserInLocalStorage = (user) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
};

// Acciones asincrónicas para manejar la autenticación
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await authService.register(userData);
        return response; // No almacenar el usuario
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await authService.login(userData);
        storeUserInLocalStorage(response);

        // Obtener información del usuario después del login exitoso
        const userInfo = await authService.getUserInfo(response.access); 
        return { ...response, userInfo };
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    storeUserInLocalStorage(null);
    return null;
});

export const activate = createAsyncThunk('auth/activate', async (userData, thunkAPI) => {
    try {
        return await authService.activate(userData);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (userData, thunkAPI) => {
    try {
        return await authService.resetPassword(userData);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const resetPasswordConfirm = createAsyncThunk('auth/resetPasswordConfirm', async (userData, thunkAPI) => {
    try {
        return await authService.resetPasswordConfirm(userData);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue({ message });
    }
});

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user?.access;
            if (!accessToken) throw new Error('Token not found');
            return await authService.getUserInfo(accessToken);
        } catch (error) {
            if (error.response?.status === 401) {
                // Maneja el caso en el que el token es inválido
                thunkAPI.dispatch(logout());
            }
            const message =
                error.response?.data?.message || error.message || 'Error desconocido';
            return thunkAPI.rejectWithValue({ message });
        }
    }
);



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        const handleRequest = (state) => {
            state.isLoading = true;
        };

        const handleSuccess = (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.userInfo = action.payload.userInfo; // Actualizar `userInfo` directamente
        };
        

        const handleFailure = (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.message;
            state.user = null;
        };

        builder
            .addCase(register.pending, handleRequest)
            .addCase(register.fulfilled, handleSuccess)
            .addCase(register.rejected, handleFailure)
            .addCase(login.pending, handleRequest)
            .addCase(login.fulfilled, handleSuccess)
            .addCase(login.rejected, handleFailure)
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                storeUserInLocalStorage(null);
            })
            .addCase(activate.pending, handleRequest)
            .addCase(activate.fulfilled, handleSuccess)
            .addCase(activate.rejected, handleFailure)
            .addCase(resetPassword.pending, handleRequest)
            .addCase(resetPassword.fulfilled, handleSuccess)
            .addCase(resetPassword.rejected, handleFailure)
            .addCase(resetPasswordConfirm.pending, handleRequest)
            .addCase(resetPasswordConfirm.fulfilled, handleSuccess)
            .addCase(resetPasswordConfirm.rejected, handleFailure)
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
