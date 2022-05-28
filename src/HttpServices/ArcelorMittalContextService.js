import { BaseService } from "./BaseService"

export class ArcelorMittalContextService extends BaseService {
    
    constructor() {
        super('user/login');
    }

    async logUser(params) {
        return this.create(params);
    }
}