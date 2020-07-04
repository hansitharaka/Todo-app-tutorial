import axios from 'axios';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get('http://localhost:8080/basicauth', {
                headers: {
                    authorization: this.createBasicAuthToken(username, password)
                }
            }
        )
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', {username, password}
        )
    }

    createBasicAuthToken(username, password) {
        //the space after the word basics is necessary
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createJwtAuthToken(token) {
        //the space after the word bearer is necessary
        return 'Bearer ' + token
    }

    registerSuccessfulLogin(username, password) {

        console.log('registerSuccessfulLogin');
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginForJwt(username, token) {

        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createJwtAuthToken(token));
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');

        if(user === null)
            return false
        else
            return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser');

        if(user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) =>{
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }


}

export default new AuthenticationService();