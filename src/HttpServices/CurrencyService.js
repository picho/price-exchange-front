import { BaseService } from "./BaseService"

export class CurrencyService extends BaseService {
    
    constructor() {
        super('currency', 3050);
    }

    async getCurrency(queryParams) {
        return this.getAll(queryParams);
    }
}