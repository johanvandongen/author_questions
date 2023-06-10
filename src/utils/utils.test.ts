import { parseTitle } from './utils';

describe('uitls', () => {
    test('author Jayin', () => {
        expect(parseTitle('2023 - Jayin Vragen')).toBe('Jayin');
    });
    test('author Johan', () => {
        expect(parseTitle('2024 - Johan Vragen')).toBe('Johan');
    });
});
