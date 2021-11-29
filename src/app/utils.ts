const NAME = 'token';

export function setToken(data: any, name: string = NAME) {
    window.localStorage.setItem(name, JSON.stringify(data));
}

export function getToken(name: string = NAME) {
    return JSON.parse(window.localStorage.getItem(name));
}

export function clearStorage() {
    window.localStorage.clear();
}
