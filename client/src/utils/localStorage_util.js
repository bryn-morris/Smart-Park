
// function handleLocalStorage (key, storageValue, eventName = key) {

//     >> Check if local storage is not stateful, aka will not update state based on changes to local storage. 
// >> If so, any time local storage is accessed or changed, will need to emit an event


//     if (key === 'clearStorage'){
//         localStorage.clear()
//         window.dispatchEvent(new Event(key));
//     }

//     localStorage.setItem(key, storageValue);
//     window.dispatchEvent(new Event(eventName));
    
// }

export function addOrUpdateLocalStorageKey (key, storageValue) {
    localStorage.setItem(key, storageValue);
    window.dispatchEvent(new Event("addOrUpdate"))
}

export function clearLocalStorageKey (key) {
    localStorage.removeItem(key)
    window.dispatchEvent(new Event("clearKey"))
}

export function checkLocalStorage (key, stateValue, setState) {
    // check to see if local storage at [key] == value of state, if not, update state
    if (localStorage[key] !== stateValue) {
        setState(prev => localStorage[key])
    }
    // window.dispatchEvent(new Event("checkKey"))
}

// export default handleLocalStorage