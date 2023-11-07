

const cacheAliveTime = 60 * 1000;
export const setSessionCache = (key,value) =>{

    sessionStorage.setItem(key,JSON.stringify(value));
}

export const getSessionCache = (key) =>{
    console.log({key})
    const cache = JSON.parse(sessionStorage.getItem(key));
    if(cache){
        console.log(cache)
        if(cache.timestamp + cacheAliveTime < Date.now()){
            return cache;
        }
    else{
        removeSessionCache(key)
        return null;
    }
    }else{
        return null
    }
}

export const removeSessionCache = (key) =>{
    console.log(key)
    sessionStorage.removeItem(key);
}
