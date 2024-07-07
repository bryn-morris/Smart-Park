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

        switch (response.status) {

            case (401):
                reLogModalStateFunc(true)
                // pass some or all of error data into message in relog modal
                break

            case (httpStatusHandlers[response.status]):
                httpStatusHandlers[response.status]()
                // pass some or all of error data into message in relog modal
                break

            default:
                // some kind of popup // display error message in user friendly way
                const errorObj = await response.json();
                console.error(`HTTP Error: ${response.status} - ${errorObj.error}`);
                break
        }
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
            console.error('JWT Handshake Error')
        }
    }

    return await response.json();
}

export default fetchData