import { socketConnect_util } from "./socketConnect_util";
import { stripJWT } from "./stripJWT_util";

async function fetchData(
    fetchString, 
    reLogModalStateFunc, 
    configObj = {},
    httpStatusHandlers = {},
) {

    try {
        
        const response = await fetch(fetchString, configObj)
        
        const return_bundle = {
            user_data: null,
        }
        
        if (fetchString === '/login' || fetchString === '/signup') {
            
            // grab the temp key
            const tempAKey =  await stripJWT(response.headers.get('Authorization'))
            
            // Return outside of this function to assign in LoginPage Component
            socketConnect_util(tempAKey, response)
                .then(socketInstance => {
                    return_bundle.socketInstance = socketInstance
                })
                .catch(error => {
                    throw new Error(error)
                })
        }

        if (!response.ok) {
            
            if (response.status === 401) {reLogModalStateFunc(true)}
            if (httpStatusHandlers[response.status]) {
                httpStatusHandlers[response.status]()
            }
            
            // if response is not 401 but not ok
            const errorObj = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorObj.error}`);
        }

        // successful status, don't want return value
        if (httpStatusHandlers[response.status]) {
            httpStatusHandlers[response.status]()
            return
        }

        // successful http status, want return value
        return_bundle.user_data = await response.json();

        return return_bundle

    } catch (error) {
        // Auth Issue
        //  Prompt User to Relog
        // If issue Persists
        // Reach out to Admin

        console.error(error);
        alert(error);
    }
}

export default fetchData