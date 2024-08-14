import { TestBed } from '@angular/core/testing';

import { ClienteApiAuthService } from './cliente-api-auth.service';

describe('ClienteApiAuthService', () => {
    let service: ClienteApiAuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClienteApiAuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});