import { BaseService } from "./BaseService"

export class ExchangeRateService extends BaseService {
    
    constructor() {
        super('exchangeRate', 3050);
    }

    async getRateResult(queryParams) {
        return this.get(queryParams);
    }
}