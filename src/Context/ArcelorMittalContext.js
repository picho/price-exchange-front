import React, { useState, useMemo} from 'react';
import { ArcelorMittalContextService } from '../HttpServices/ArcelorMittalContextService';

const ArcelorMittalContext = React.createContext();

export const ArcelorMittalProvider = (props) => {
   
    const [user, setUser] = useState(null);
    
    const userLogin = async () => {

        console.log("hola");
        const response = await new ArcelorMittalContextService().logUser();

        if(response) 
            setUser(response);
        else 
            console.log("User log error");
    }
 
    const value = useMemo(() => {
        return ({
            user,
            userLogin
        });
    }, [user]);

    return <ArcelorMittalContext.Provider value={value} {...props} />
}

export const useArcelorMittal = () => {
    
    const context = React.useContext(ArcelorMittalContext);

    if(!context)
        throw new Error("Component wrapper must be done (ArcelorMittalContext) ");

    return context;
}