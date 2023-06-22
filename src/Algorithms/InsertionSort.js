export function getInsertionSortAnim(array) {
    const animations = [];
    if (array.length <= 1) return;

    for (let i = 1; i < array.length; i++) {
        let hole = i;
        let value = array[i];
        while(hole > 0 && array[hole - 1] > value) {
            array[hole] = array[hole - 1];
            array[hole - 1] = value;
            animations.push([1, hole - 1, hole]);
            hole--;
        }
        animations.push([2, hole, hole]);
    }
    return animations;
}
