export const isFibonacciNumber = (number: number): boolean => {
    let a = 0;
    let b = 1;
    let i = 2;
    while (b <= number) {
        if(i>1000) {
            return false;
        }
        if (b === number) {
            return true;
        }
        const temp = a + b;
        a = b;
        b = temp;
        i++;
    }
    return false;
}