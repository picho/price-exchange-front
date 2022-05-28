import { HttpService } from "./HttpService";

export class BaseService {

    constructor(url_prefix = "", port) {
        this.http = (new HttpService(url_prefix, port))
    }

    async getAll() {
        return await this.http.get(``)
    }

    async get(queryParams) {
        return await this.http.get(queryParams)
    }

    async create(body) {
        return await this.http.post(body)
    }

    async update(body) {
        return await this.http.put(body)
    }

    async delete(queryParams) {
        return await this.http.remove(queryParams)
    }
}