import axios from 'axios';

export default axios.create( {
    // baseURL: 'http://laber-env.eba-65gdmegc.us-east-1.elasticbeanstalk.com'
    baseURL: 'http://localhost:5000'
});