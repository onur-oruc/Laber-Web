import axios from 'axios';

export default axios.create( {
    // baseURL: 'http://laber-env.eba-65gdmegc.us-east-1.elasticbeanstalk.com'
    baseURL: 'http://192.168.1.171:5000'
});