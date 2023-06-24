import React, { useState } from 'react'
import { getMergeSortAnim } from './Algorithms/MergeSort';
import { getSelectionSortAnim } from './Algorithms/SelectionSort';
import { getInsertionSortAnim } from './Algorithms/InsertionSort';
import { getHeapSortAnim } from './Algorithms/HeapSort';
import { getBubbleSortAnims } from './Algorithms/BubbleSort';
import SelectionText from './Explanations/SelectionText';
import InsertionText from './Explanations/InsertionText';
import HeapText from './Explanations/HeapText';
import MergeText from './Explanations/MergeText';
import BubbleText from './Explanations/BubbleText';

function Visualizer() {
    const BAR_COLOR = '#0a0a23';
    const sortingTypes = {
        selection: "selection",
        insertion: "insertion",
        bubble: "bubble",
        merge: "merge",
        heap: "heap",
    }
    const [array, setArray] = useState(() => generateNewArray(100));
    const [sortType, setSortType] = useState(() => {
        return sortingTypes.insertion;
    })
    const [speed, setSpeed] = useState(5);

    function generateNewArray(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 300) + 1);
        }
        return arr;
    }

    function mergeSort() {
        const animations = getMergeSortAnim(array);
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < animations.length; i++) {
            const shouldChangeColor = (i % 3) !== 2;
            if (shouldChangeColor) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = i % 3 === 0 ? "red" : BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * speed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * speed);
            }
        }
    }

    function selectionSort() {
        const animations = getSelectionSortAnim(array);
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < animations.length; i++) {
            const [type, barCurrentIdx, barMinIdx] = animations[i];
            const barCurrentStyle = bars[barCurrentIdx].style;
            const barMinStyle = bars[barMinIdx].style;
            if (type !== -1) {  
                if (type === 1) {
                    setTimeout(() => {
                        barCurrentStyle.backgroundColor = "red";
                    }, i * speed);
                } else {
                    setTimeout(() => {
                        barCurrentStyle.backgroundColor = BAR_COLOR;
                    }, i * speed);
                }
            } else {
                setTimeout(() => {
                    let temp = barCurrentStyle.height;
                    barCurrentStyle.height = barMinStyle.height;
                    barMinStyle.height = temp;
                }, i * speed)
            }
        }
    }

    function insertionSort() {
        const animations = getInsertionSortAnim(array);
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === 1) {
                const [type, prev, curr] = animations[i];
                const prevStyle = bars[prev].style;
                const currStyle = bars[curr].style;
                setTimeout(() => {
                    let temp = currStyle.height;
                    currStyle.height = prevStyle.height;
                    prevStyle.height = temp;
                    prevStyle.backgroundColor = "red"
                    currStyle.backgroundColor = BAR_COLOR;
                }, i * speed)
            } else {
                const [type, hole, hole2] = animations[i];
                setTimeout(() => {
                    bars[hole].style.backgroundColor = BAR_COLOR;
                }, i * speed)
            }
        } 
    }

    function heapSort() {
        const animations = getHeapSortAnim(array);
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < animations.length; i++) {
            const [type, currIdx, childIdx] = animations[i];
            const currIdxStyle = bars[currIdx].style;
            const childIdxStyle = bars[childIdx].style;
            if (type === 0) {
                setTimeout(() => {
                    currIdxStyle.backgroundColor = BAR_COLOR;
                    childIdxStyle.backgroundColor = BAR_COLOR;
                    let temp = currIdxStyle.height;
                    currIdxStyle.height = childIdxStyle.height;
                    childIdxStyle.height = temp;
                }, i * speed)
            } else if (type === 1) {
                setTimeout(() => {
                    currIdxStyle.backgroundColor = "red";
                    childIdxStyle.backgroundColor = "red";
                }, i * speed)
            } else {
                setTimeout(() => {
                    currIdxStyle.backgroundColor = BAR_COLOR;
                }, i * speed)
            }
            
        }
    }

    function bubbleSort() {
        const animations = getBubbleSortAnims(array);
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < animations.length; i++) {
            const [type, curr, next] = animations[i];
            const currStyle = bars[curr].style;
            const nextStyle = bars[next].style;
            
            if (type === 0) {
                setTimeout(() => {
                    currStyle.backgroundColor = "red";
                }, i * speed)
            } else if (type === 1) {
                setTimeout(() => {
                    currStyle.backgroundColor = BAR_COLOR;
                }, i * speed)
            } else {
                setTimeout(() => {
                    let temp = currStyle.height;
                    currStyle.height = nextStyle.height;
                    nextStyle.height = temp;
                }, i * speed)
            }
        }
    }

    function Sort() {
        if (sortType === sortingTypes.bubble) {
            bubbleSort();
        } else if (sortType === sortingTypes.heap) {
            heapSort();
        } else if (sortType === sortingTypes.insertion) {
            insertionSort();
        } else if (sortType === sortingTypes.merge) {
            mergeSort();
        } else if (sortType === sortingTypes.selection) {
            selectionSort();
        }
    }

    const handleChange = (e) => {
        setSortType(e.target.value);
    };

    const speedChange = (e) => {
        setSpeed(e.target.value);
    }

    return (
        <>
            <h1>Sorting Visualizer</h1>
            <label htmlFor="sortType">Sorting Type:  </label>
                <select name="sortType" defaultValue={sortingTypes.insertion} onChange={handleChange}>
                <option value = {sortingTypes.selection}>Selection Sort</option>
                <option value = {sortingTypes.insertion}>Insertion Sort</option>
                <option value = {sortingTypes.bubble}>Bubble Sort</option>
                <option value = {sortingTypes.merge}>Merge Sort</option>
                <option value = {sortingTypes.heap}>Heap Sort</option>
                </select>
            <label htmlFor="slider">Speed: </label>
            <input name="slider" type="range" min={2} defaultValue={5} max={8} class="slider" onChange={speedChange}/>
            <br></br>
            <button onClick={() => Sort()}>Sort</button>
            <button onClick={() => setArray(generateNewArray(100))}>Generate Array</button>
            <div className="bar-container">
                {array.map( (value, idx) => (
                    <div className="bar" key={idx} style={{height: `${value}px`}}></div>
                ))}
            </div>
            <div>
                {sortType === sortingTypes.selection && <SelectionText/>}
                {sortType === sortingTypes.selection && 
                <div>
                    In selection sort, it is necessary to iterate throughout the array to find the index
                    of the lowest element, and swap it with the element at the current iteration's
                    index. As such, regardless of the initial configuration, it is necessary 
                    to scan the entire array starting from the current index until the end,
                    resulting in a runtime of O(n^2) in all cases.
                </div>}

                {sortType === sortingTypes.insertion && <InsertionText/>}
                {sortType === sortingTypes.insertion && 
                <div>
                    In insertion sort, you iterate throughout the array, placing each element in its 
                    sorted position in the array on the left side of the current index. In the worst case,
                    the current index's element must be shuffled all the way to the left, resulting 
                    in O(n^2) time complexity. However, if the array is already sorted, one pass is enough to finish
                    the insertion sort algorithm in O(n) time. 
                </div>}

                {sortType === sortingTypes.heap && <HeapText/>}
                {sortType === sortingTypes.heap && 
                <div>
                    In heap sort, the array must first be sorted in accordance to the partial order property, 
                    which can be done in O(n) time using Floyd's method. After the heap is in partial order, 
                    we can continously call the removeMax function to get the highest element in the heap so far,
                    and then heapifyDown afterwards to ensure the partial order property is maintained. Each call 
                    to heapify down an element will require O(logn) time, and since we call it n times, we achieve 
                    a final time complexity of O(nlogn), which dominates over the cost of building the heap.
                </div>}

                {sortType === sortingTypes.merge && <MergeText/>}
                {sortType === sortingTypes.merge && 
                <div>
                    In merge sort, we continously split the array in half, and then merge the two sorted arrays 
                    together into sorted order. The total amount of times an array can be split amounts to a tree height 
                    of O(logn), and at each level, we perform O(n) work to merge the two halves into a sorted array. As such,
                    merge sort results in a time complexity of O(nlogn).
                </div>}

                {sortType === sortingTypes.bubble && <BubbleText/>}
                {sortType === sortingTypes.bubble && 
                <div>
                    In bubble sort, we repeatedly shuffle the elements one by one as we iterate through the array, such that 
                    the highest element gets shuffled to the right side of the array at each iteration. Unfortunately, this results 
                    in a time complexity of O(n^2) to fully sort the array. If the array is already in sorted order, 
                    we could return early, however, resulting in a best case time complexity of O(n).
                </div>}

                
                
            </div>
            
        </>
    )

}

export default Visualizer;