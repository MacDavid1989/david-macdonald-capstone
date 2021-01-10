// returns a random letter for the search query
export function randomLetter() {
    const letterArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    
    return letterArray[Math.floor(Math.random() * letterArray.length)];
};