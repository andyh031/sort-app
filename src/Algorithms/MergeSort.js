export function getMergeSortAnim(array) {
    if (array.length <= 1) return array;
    const animations = [];
    const tempArray = array.slice();
    msort(array, 0, array.length - 1, tempArray, animations)
    return animations;
}

function msort(array, low, high, tempArray, animations) {
    if (low !== high) {
        const mid = Math.floor((low + high) / 2);
        msort(tempArray, low, mid, array, animations);
        msort(tempArray, mid + 1, high, array, animations);
        merge(array, low, mid, high, tempArray, animations);
    }
}

function merge(array, low, mid, high, tempArray, animations) {
    let k = low;
    let a = low;
    let b = mid + 1;
    while (a <= mid && b <= high) {
        // comparing two bars
        animations.push([a, b]);
        // change the colours back to original
        animations.push([a, b]);

        if (tempArray[a] < tempArray[b]) {
            animations.push([k, tempArray[a]]);
            array[k++] = tempArray[a++];
        } else {
            animations.push([k, tempArray[b]]);
            array[k++] = tempArray[b++];
        }
    }
        
    while (a <= mid) {
        animations.push([a, a]);
        animations.push([a, a]);

        animations.push([k, tempArray[a]]);
        array[k++] = tempArray[a++]
    }

    while (b <= high) {
        animations.push([b, b]);
        animations.push([b, b]);
        animations.push([k, tempArray[b]]);
        array[k++] = tempArray[b++]
    }
}

