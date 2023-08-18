function numberArraysHaveSameElements(arr1, arr2) {
    const sortedArr1 = arr1.slice().sort((a, b) => a - b);
    const sortedArr2 = arr2.slice().sort((a, b) => a - b);

    console.log(sortedArr1, sortedArr2)
  
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}

module.exports = {
    numberArraysHaveSameElements
}