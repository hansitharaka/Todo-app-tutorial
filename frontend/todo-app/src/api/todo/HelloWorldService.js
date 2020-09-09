import axios from 'axios';
import {API_URL} from '../../Constants';

class HelloWorldService {
    executeHelloWorldService() {
        //console.log('executed service');
        return axios.get(`${API_URL}/hello-world`)

    }

    executeHelloWorldBeanService() {
        //console.log('executed service');
        return axios.get(`${API_URL}/hello-world-bean`)

    }

    executeHelloWorldPathVariableService(name) {
        // let username = 'in28min'
        // let password = 'dummy'
        //
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        //console.log('executed service');
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`
         // ,{
         //        headers : {
         //            authorization: basicAuthHeader
         //        }
         //    }
        );

    }
}

//ggggg
export default new HelloWorldService()