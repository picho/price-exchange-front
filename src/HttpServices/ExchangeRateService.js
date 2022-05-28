import { BaseService } from "./BaseService"

export class ExchangeRateService extends BaseService {
    
    constructor() {
        super('currency', 3050);
    }

    async getCurrency() {
        return this.getAll();
    }
}