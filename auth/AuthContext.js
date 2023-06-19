import React from 'react';
import { createContext, useState, useEffect } from "react";
import { B2CClient } from './b2cClient';
import { b2cConfig, b2cScopes as scopes } from './msalConfig';

export const AuthContext = createContext({ authResult: null, signOut: null });

export const AuthContextProvider = ({ children }) => {
    const b2cClient = new B2CClient(b2cConfig);
    const [authResult, setAuthResult] = useState(null);
    const webviewParameters = { ios_prefersEphemeralWebBrowserSession: false };

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            await b2cClient.init();
            const isSignedIn = await b2cClient.isSignedIn();
            if (isSignedIn) {
                setAuthResult(await b2cClient.acquireTokenSilent({ scopes }));
            }
            else {
                const res = await b2cClient.signIn({ scopes, webviewParameters });
                setAuthResult(res);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const signOutHandler = async () => {
        try {
            await b2cClient.signOut();
            setAuthResult(null);
        } catch (error) {
            console.warn(error);
        }
    };

    return <AuthContext.Provider value={{ authResult, signOut: signOutHandler }}>
        {children}
    </AuthContext.Provider>
}