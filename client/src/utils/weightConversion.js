// converts weight to grams or kilograms and returns a string
export const weightConversion = (weight) => {
    const roundedWeight = Math.ceil(weight);

    if ((roundedWeight / 1000) >= 1){
        return (roundedWeight / 1000) + ' kg';
    } else {
        return roundedWeight + ' g';
    };
};