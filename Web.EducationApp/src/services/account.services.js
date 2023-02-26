import axios from "axios";
import { useCookies } from 'react-cookie'

require('dotenv').config();

//const [cookies] = useCookies(['accessToken', 'refreshToken']);
////const { deleteCookie, deleteAllCookies } = useCookies();
//const navigate = useNavigate();


async function GetAccountDetails() {
    const [Cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);
    await axios.post('/AuthenticatedUserInfo', null, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_APIKey
        }
    }).interceptors.request.use(
        request => {
            if (!request.url.includes('AuthenticateUser')) {
                
                console.log(Cookie.accessToken);
                request.headers['Authorization'] = "Bearer " + Cookie.accessToken;
            }
            return request;
        },
        error => {
            return Promise.reject(error);
        }
    ).interceptors.response.use((response) => {
        //console.log('interceptors.response : ' + JSON.stringify(response));
        //if (response.config.parse) {
        //    //perform the manipulation here and change the response object
        //    console.log('interceptors.response : ' + response);
        //}
        return response;
    }, (error) => {
        //const status = error.response ? error.response.status : null
        //console.log(status);
        //if (status === 401) {

        //    return refreshToken().then(_ => {
        //        error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
        //        error.config.baseURL = undefined;
        //        return Axios.request(error.config);
        //    });
        //}
        return Promise.reject(error.message);
    });
   
}



const AccountService = {
    GetAccountDetails
}

export default AccountService;