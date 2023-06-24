export function getBubbleSortAnims(array) {
    const animations = [];

    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([0, j, j]);
            animations.push([1, j, j]);
            if (array[j] > array[j + 1]) {
                animations.push([2, j, j+1]);
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }

    return animations;
}