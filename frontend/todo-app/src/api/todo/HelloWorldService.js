import axios from 'axios';

class HelloWorldService {
    executeHelloWorldService() {
        //console.log('executed service');
        return axios.get('http://localhost:8080/hello-world')

    }

    executeHelloWorldBeanService() {
        //console.log('executed service');
        return axios.get('http://localhost:8080/hello-world-bean')

    }

    executeHelloWorldPathVariableService(name) {
        let username = 'in28min'
        let password = 'dummy'

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        //console.log('executed service');
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`,
         {
            headers : {
                authorization: basicAuthHeader
            }
        });

    }
}

export default new HelloWorldService()