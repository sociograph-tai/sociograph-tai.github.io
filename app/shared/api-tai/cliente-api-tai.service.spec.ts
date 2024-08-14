import { TestBed } from '@angular/core/testing';

import { ClienteApiOrdersService } from './cliente-api-tai.service';

describe('ClienteApiOrdersService', () => {
    let service: ClienteApiOrdersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClienteApiOrdersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});