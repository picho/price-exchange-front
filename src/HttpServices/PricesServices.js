import { BaseService } from "./BaseService"

export class PricesServices extends BaseService {
    
    constructor() {
        super('prices', 3001);
    }

    async getPrices() {
        return this.getAll();
    }
}