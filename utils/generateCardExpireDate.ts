const generateCardExpireDate = (): Date => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() + 5, currentDate.getMonth(), currentDate.getDate());

}

export default generateCardExpireDate()