import React from 'react'
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { sellBookReducer,addCartReducer, authorsReducer,popularBookReducer, categoryReducer, allUserReducer, allPublisherReducer, allAuthorReducer, allOrdersReducer, myorderReducer, myProfileReducer, orderHistoryReducer, selectedBooksReducer, cartBooksReducer, allBooksReducer } from '../Features/bookReducers';
import logger from 'redux-logger'



const store = configureStore({
    reducer: {
        sellBooks : sellBookReducer,
        allBooks : allBooksReducer,
        addCart : addCartReducer,
        author: authorsReducer ,
        popularBooks : popularBookReducer,
        category : categoryReducer,
        allUser : allUserReducer,
        allPublishers : allPublisherReducer,
        allAuthors : allAuthorReducer,
        allOrders : allOrdersReducer,
        myOrder : myorderReducer,
        myProfile : myProfileReducer,
        OrderHistory : orderHistoryReducer,
        cartBooks : cartBooksReducer,
        selectedBooks : selectedBooksReducer

    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
}

)

export default store