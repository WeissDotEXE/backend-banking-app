const generateRandomCardNumber = (): number => {
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return Number(result);
}

export default generateRandomCardNumber()