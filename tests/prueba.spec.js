function sumar(num1, num2) {
    return num1 + num2;
}

describe('Pruebas para la funcion sumar', () => {

    it('deberia devolver la suma de los dos numeros', () => {
        const result = sumar(4, 5);
        expect(result).toBe(9);
        expect(sumar(3, 4)).toBe(7)
    })
})