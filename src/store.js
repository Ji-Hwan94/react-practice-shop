import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice"

let cart = createSlice({
    name:"cart",
    initialState: [
            {id : 0, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1}
        ],
    reducers: {
        increment(state, actions){
            const result = state.find((element) => {return element.id === actions.payload});
            result.count += 1;
        }, 
        addCart(state, actions){
            const result = state.find((element) => {return element.id === actions.payload.id});
            if(result){
                result.count += 1;
            } else {
                const updatedObject = {
                    ...actions.payload,
                    ["name"]: actions.payload["title"],
                    count: 1
                };
                delete updatedObject.title;
                state.push(updatedObject);
            }
            
        },
        deleteCart(state, actions){
            console.log(actions.payload)
            const result = state.findIndex((element) => {return element.id === actions.payload});
            if (result !== -1) {
                state.splice(result, 1);
            }
        }
    }
});

export let {increment, addCart, deleteCart} = cart.actions;

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    }
});