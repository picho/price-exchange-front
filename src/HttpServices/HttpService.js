import axios from 'axios';

const SESSION_KEY = "";
const ROOT_URL = "http://localhost:";

export class HttpService {

    headers = {}

    constructor(url_prefix = "", port) {
        this.url_prefix = url_prefix;
        this.port = port;
        this.getHeaders()
    }

    async get(queryParams) {

        try {
            
            const { data } = await axios.get(this.buildUrl(true,queryParams), {
                headers: this.headers
            });

            return data;

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async post(params) {
        
        try {
            
            const response = await axios.post(this.buildUrl(false, null), params, this.headers);

            return response;

        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async put(params) {

        try {

            console.log(ROOT_URL + this.url_prefix);
            
            const response = await axios.put(this.buildUrl(false, null), params, this.headers);
            
            return response;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async remove(params) {
        
        try {

            const response = await axios.delete(this.buildUrl(false, null), { data: params });
            
            return response;

        } catch (error) {
            console.log(error)
            return null
        }
    }

    getHeaders() {
        
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        if (this.checkSession()) {
            
            let apiToken = this.getSession().api_token
            this.headers = {
                ...this.headers,
                "Authorisation": `Bearer ${apiToken}`
            }
        }
    }

    getSession() {
        let session = localStorage.getItem(SESSION_KEY)
        if (session) {
            return JSON.parse(session)
        }
        return session
    }

    checkSession() {
        return localStorage.getItem(SESSION_KEY) !== null
    }

    mapQueryParams(queryParams) {
        
        return (queryParams)
            ? "?" + Object.keys(queryParams).map(function (key) { return key + '=' + queryParams[key] }).join('&')
            : "";
    }

    buildUrl(doesHaveUrlParams, queryParams) {

        return (doesHaveUrlParams) 
            ? ROOT_URL + this.port + "/" + this.url_prefix + this.mapQueryParams(queryParams)
            : ROOT_URL + this.port + "/" + this.url_prefix;

    }
}