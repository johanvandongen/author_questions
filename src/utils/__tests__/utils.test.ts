import { getIdFromUrl, parseTitle } from '../utils';

describe('parse title', () => {
    test('author Jayin', () => {
        expect(parseTitle('2023 - Jayin Vragen')).toBe('Jayin');
    });
    test('author Johan', () => {
        expect(parseTitle('2024 - Johan Vragen')).toBe('Johan');
    });
});

describe('get id from url', () => {
    test('doc 1', () => {
        expect(
            getIdFromUrl(
                'https://docs.google.com/document/d/1RNVhvjIhom2_Fx85Qx9zqtUY4iBnSXbWh3XOaXlYDGU/edit'
            )?.toString()
        ).toBe('1RNVhvjIhom2_Fx85Qx9zqtUY4iBnSXbWh3XOaXlYDGU');
    });
    test('doc 2', () => {
        expect(
            getIdFromUrl(
                'https://drive.google.com/file/d/0B3tB9BU9FRnpcTJmS2FoaktsQzA/view'
            )?.toString()
        ).toBe('0B3tB9BU9FRnpcTJmS2FoaktsQzA');
    });
    test('invalid doc url', () => {
        expect(getIdFromUrl('Test this google doc link')).toBe(null);
    });
});
