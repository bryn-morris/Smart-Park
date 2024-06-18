import { socketConnect_util } from "./socketConnect_util";
import { stripJWT } from "./stripJWT_util";

async function fetchData(
    fetchString, 
    reLogModalStateFunc, 
    configObj = {},
    httpStatusHandlers = {},
) {
        
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

    // Handle Websocket Connection & Auth
    if (fetchString === '/login' || fetchString === '/signup') {

        try{
            const tempAKey =  await stripJWT(response.headers.get('Authorization'))
            const socketInstance = await socketConnect_util(tempAKey)
            const userData = await response.json()
            return {userData, socketInstance}
        }
        catch {
            console.log('testerror')
        }


    }

    return await response.json();
}

export default fetchData