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

        // Unsuccessful Status Code Response
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

        if (fetchString === '/login' || fetchString === '/signup') {

            // grab the temp key
            const tempAKey =  await stripJWT(response.headers.get('Authorization'))
            
            // Establish Websocket Connection
            socketConnect_util(tempAKey)
                .then(socketInstance => {
                    return({
                        socketInstance : socketInstance,
                        userData : response.json()
                    })
                })
                .catch(error => {
                    throw new Error(error)
                })
        }

        return await response.json();

    } catch (error) {
        throw new Error (error)
    }
}

export default fetchData