export function get(key){
    let string = localStorage.getItem(key);

    try{
        return JSON.parse(string);
    }
    catch{
        return null;
    }
}


export function set(key, value){
    let string = JSON.stringify(value);

    localStorage.setItem(key,string);
}