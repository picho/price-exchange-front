import React, { useState, useMemo} from 'react';
import { ArcelorMittalContextService } from '../HttpServices/ArcelorMittalContextService';

const ArcelorMittalContext = React.createContext();

export const ArcelorMittalProvider = (props) => {
   
    const [userLogged, setUser] = useState(null);
    
    const userLogin = async (user) => {

        const {data} = await new ArcelorMittalContextService().logUser(user);

        if(data) 
            setUser(data);
        else 
            console.log("User log error");
    }
 
    const value = useMemo(() => {
        return ({
            userLogged,
            userLogin
        });
    }, [userLogged]);

    return <ArcelorMittalContext.Provider value={value} {...props} />
}

export const useArcelorMittal = () => {
    
    const context = React.useContext(ArcelorMittalContext);

    if(!context)
        throw new Error("Component wrapper must be done (ArcelorMittalContext) ");

    return context;
}