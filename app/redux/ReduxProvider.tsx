"use client"
import React from 'react'
import store from './store'
import { Provider } from 'react-redux'
type ReduxProviderProps={
    children:React.ReactNode
}
const ReduxProvider:React.FC<ReduxProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider
