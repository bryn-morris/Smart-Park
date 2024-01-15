
export function stripJWT(AuthString) {
    const regEx = /^Bearer\s(.+)$/;
    return AuthString.match(regEx)[1]
}