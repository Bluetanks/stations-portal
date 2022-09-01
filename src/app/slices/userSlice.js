import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";





const initialState = {
    status: false,
    isAuthenticated: false,
    responseState: false,
    responseMessage: '',
    responseType: '',
    token:"",
    station: {
        bidirectional: true,
        buyRate: 30,
        createdAt: "",
        email: "",
        location: {type: '', coordinates: Array(2), address: ''},
        name: "",
        phone: "",
        ports: [],
reviews: [],
sellRate: 30,
source: "AC",
status: "",
_id: "",
    },
    tickers: []
};

export const signUpUSer = createAsyncThunk(
    'user/signUp',
    async (user) => {
        // const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return user;
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (user) => {
        // const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return user;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.station = action.payload
        },
        setUserImage: (state, action) => {
            state.userData.photoURL = action.payload
        },
        updateInfo: (state, action) => {
            state.userData.phone = action.payload.phone
            state.userData.firstName = action.payload.firstName
            state.userData.lastName = action.payload.lastName
            state.userData.country = action.payload.country
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setResponse: (state, action) => {
            state.responseState = action.payload.responseState
            state.responseType = action.payload.responseType
            state.responseMessage = action.payload.responseMessage
        },
        setRider: (state, action) => {
            state.ride = action.payload
        },
        unSetResponse: (state) => {
            state.responseState = false
            state.responseType = ''
            state.responseMessage = ''
        },

        logoutUser: () => initialState
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.status = false;
            state.userData = action.payload;
        })
        builder.addCase(signUpUSer.pending, (state) => {
            state.status = true;
        })
            .addCase(signUpUSer.fulfilled, (state, action) => {
                state.status = false;
                state.userData = action.payload;
            });

    }

})


export const {
    setAuthenticated,
    unSetResponse,
    setResponse,
    updateInfo,
    setUser,
    setUserImage,
    logoutUser,
    setRider
} = userSlice.actions
export default userSlice.reducer;
