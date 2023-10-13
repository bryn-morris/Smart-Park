

async function fetchData(
    fetchString, 
    reLogModalStateFunc, 
    configObj = {},
    httpStatusHandlers = {},

) {

    try {
        const response = await fetch(fetchString, configObj)

        if (!response.ok) {
            if (response.status === 401) {
                reLogModalStateFunc(true)
            }
            if (httpStatusHandlers[response.status]){
                httpStatusHandlers[response.status]()
            }
            // if response is not 401 but not ok
            const errorObj = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorObj.error}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

export default fetchData