import axios from 'axios';

const baseURL = 'http://192.168.1.41:8080/api';

const coffeApi = axios.create({ baseURL });

export default coffeApi;
