export function getHeapSortAnim(array) {
    const animations = [];

    let n = array.length;

    buildHeap(array, animations);

    for (let i = n - 1; i > 0; i--) {  // here, i represents the index of the element to be sorted. At 0, it's just that one element, and so is therefore already 'sorted' in its 'heap portion' of the array
        [array[i], array[0]] = [array[0], array[i]];
        animations.push([0, i, 0]);
        animations.push([1, i, 0]);
        heapifyDown(array, i, 0, animations);
        animations.push([2, i, i]);
    }
    animations.push([2, 0, 0]);

    return animations;
}

function heapifyDown(array, n, i, animations) {
    let left = 2*i + 1;
    let right = 2*i + 2;
    let largest = i;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        animations.push([0, i, largest]);
        animations.push([1, i, largest]);
        [array[i], array[largest]] = [array[largest], array[i]];
        heapifyDown(array, n, largest, animations);
    }
}

function buildHeap(array, animations) {
    let n = array.length;

    for (let i = n/2 - 1; i >= 0; i--) {
        heapifyDown(array, n, i, animations);
    }
}