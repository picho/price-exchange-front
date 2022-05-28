import { BaseService } from "./BaseService"

export class ArcelorMittalContextService extends BaseService {
    
    constructor() {
        super('user/login', 3001);
    }

    async logUser(params) {
        return this.create(params);
    }
}