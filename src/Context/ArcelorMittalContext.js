import React, { useState, useMemo} from 'react';
import { ArcelorMittalContextService } from '../HttpServices/ArcelorMittalContextService';

const ArcelorMittalContext = React.createContext();

export const ArcelorMittalProvider = (props) => {
   
    const [userLogged, setUser] = useState(null);
    const [isUserAuth, setIsUserAuth] = useState(null);
    
    const userLogin = async (user) => {

        try{
            const {data} = await new ArcelorMittalContextService().logUser(user);

            if(data) {
                localStorage.setItem('TOKEN', data.BearerToken);  
                setUser(data);
                setIsUserAuth(true);

                return data;
            }
        }
        catch(err){
            setIsUserAuth(false);
            return null;
        }
    }

    const userLogout = () => {
        setUser(null);
        localStorage.setItem('TOKEN', "");  
        setIsUserAuth(null);
    }
 
    const value = useMemo(() => {
        return ({
            userLogged,
            isUserAuth,
            userLogin,
            userLogout
        });
    }, [userLogged, isUserAuth]);

    return <ArcelorMittalContext.Provider value={value} {...props} />
}

export const useArcelorMittal = () => {
    
    const context = React.useContext(ArcelorMittalContext);

    if(!context)
        throw new Error("Component wrapper must be done (ArcelorMittalContext) ");

    return context;
}