
function handleLocalStorage (key, storageValue, eventName = key) {

//     >> Check if local storage is not stateful, aka will not update state based on changes to local storage. 
// >> If so, any time local storage is accessed or changed, will need to emit an event


    if (key === 'clearStorage'){
        localStorage.clear()
        window.dispatchEvent(new Event(key));
    }

    localStorage.setItem(key, storageValue);
    window.dispatchEvent(new Event(eventName));
    
}

export default handleLocalStorage