export const weightConversion = (weight) => {
    const roundedWeight = Math.ceil(weight);

    if ((roundedWeight / 1000) >= 1){
        return (roundedWeight / 1000) + ' kilograms'
    } else {
        return roundedWeight + ' grams'
    }
}