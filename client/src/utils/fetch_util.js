

async function fetchData(fetchString, reLogModalStateFunc) {

    try {
        const response = fetch(fetchString)

        if (!response.ok) {
            if (response.status === 401) {
                reLogModalStateFunc(true)
            }
            // if response is not 401 but not ok
            const errorObj = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorObj.error}`);
        }
        return (await response).json();
    } catch (error) {
        console.error(error);
    }
}

export default fetchData