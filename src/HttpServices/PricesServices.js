import { BaseService } from "./BaseService"

export class PricesServices extends BaseService {
    
    constructor() {
        super('prices');
    }

    async getPrices() {
        return this.getAll();
    }
}