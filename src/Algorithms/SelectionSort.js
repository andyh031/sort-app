export function getSelectionSortAnim(array) {
    const animations = [];
    if (array.length <= 1) return;

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            animations.push([1, j, minIndex]);
            animations.push([0, j, minIndex]);
        }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    animations.push([-1, i, minIndex])
    }

    return animations;
}