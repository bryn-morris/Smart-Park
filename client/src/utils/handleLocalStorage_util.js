
function handleLocalStorage (key, storageValue, eventName = key) {

    if (key === 'clearStorage'){
        localStorage.clear()
        window.dispatchEvent(new Event(key));
    }

    localStorage.setItem(key, storageValue);
    window.dispatchEvent(new Event(eventName));
    
}

export default handleLocalStorage