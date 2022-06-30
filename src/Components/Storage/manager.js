import { getListContainer, updateListId } from "../Main/main";

function testStorageAvailability(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


export function storageAvailable() {
    if (testStorageAvailability('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        localStorage.setItem("main",transformAllToJson());
    }
    else {
        // Too bad, no localStorage for us
        console.log("Storage disabled, can't save lists data.")
    }
}

export function saveToStorage() {
    storageAvailable();
}

export function getFromStorage() {
    if (localStorage.getItem("main")) {
        return recoverAllFromJson(localStorage.getItem("main"));        
    } else {
        return false;
    }    
}

function deleteFromStorage(object) {
    localStorage.removeItem(object);
}

function transformAllToJson() {
    const data = JSON.stringify(getListContainer());
    return data;
}

function recoverAllFromJson(json) {
    const data = JSON.parse(json);
    return data;
}