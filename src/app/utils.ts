const NAME = 'token';

export function setItem(data: any, name: string = NAME) {
    window.localStorage.setItem(name, JSON.stringify(data));
}

export function getItem(name: string = NAME) {
    return JSON.parse(window.localStorage.getItem(name));
}

export function clear() {
    window.localStorage.clear();
}
