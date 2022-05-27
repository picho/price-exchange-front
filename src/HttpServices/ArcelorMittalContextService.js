import { BaseService } from "./BaseService"

export class ArcelorMittalContextService extends BaseService {
    
    constructor() {
        super('Filter/GetAll');
    }

    async logUser(params) {
        return this.create(params);
    }
}