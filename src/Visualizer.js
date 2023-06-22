import React, { useState, useRef } from 'react'
import { getMergeSortAnim } from './Algorithms/MergeSort';
import { getSelectionSortAnim } from './Algorithms/SelectionSort';
import { getInsertionSortAnim } from './Algorithms/InsertionSort';

function Visualizer() {
    const ANIMATION_SPEED = 2;
    const sortingTypes = {
        selection: "selection",
        insertion: "insertion",
        bubble: "bubble",
        merge: "merge",
        heap: "heap",
    }
    const [array, setArray] = useState(() => generateNewArray(100));
    const [sortType, setSortType] = useState(sortingTypes.selection);

    function generateNewArray(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 300) + 1);
        }
        return arr;
    }

    function mergeSort() {
        const animations = getMergeSortAnim(array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const shouldChangeColor = (i % 3) !== 2;
            if (shouldChangeColor) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = i % 3 === 0 ? "red" : "black";
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    function selectionSort() {
        const animations = getSelectionSortAnim(array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const [type, barCurrentIdx, barMinIdx] = animations[i];
            const barCurrentStyle = bars[barCurrentIdx].style;
            const barMinStyle = bars[barMinIdx].style;
            if (type !== -1) {  
                if (type === 1) {
                    setTimeout(() => {
                        barCurrentStyle.backgroundColor = "red";
                    }, i * ANIMATION_SPEED);
                } else {
                    setTimeout(() => {
                        barCurrentStyle.backgroundColor = "black";
                    }, i * ANIMATION_SPEED);
                }
            } else {
                setTimeout(() => {
                    let temp = barCurrentStyle.height;
                    barCurrentStyle.height = barMinStyle.height;
                    barMinStyle.height = temp;
                }, i * ANIMATION_SPEED)
            }
        }
    }

    function insertionSort() {
        const animations = getInsertionSortAnim(array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
        if (animations[i][0] === 1) {
                const [type, prev, curr] = animations[i];
                const prevStyle = bars[prev].style;
                const currStyle = bars[curr].style;
                setTimeout(() => {
                    let temp = currStyle.height;
                    currStyle.height = prevStyle.height;
                    prevStyle.height = temp;
                    prevStyle.backgroundColor = "red"
                    currStyle.backgroundColor = "black";
                }, i * ANIMATION_SPEED)
            } else {
                const [type, hole, hole2] = animations[i];
                setTimeout(() => {
                    bars[hole].style.backgroundColor = "black";
                }, i * ANIMATION_SPEED)
            }
        } 
    }

    return (
        <>
            <h1>Sorting Visualizer</h1>
            <label htmlFor="sortType">Sorting Type:  </label>
                <select name="sortType">
                <option value = {sortingTypes.selection}>Selection Sort</option>
                <option value = {sortingTypes.insertion}>Insertion Sort</option>
                <option value = {sortingTypes.bubble}>Bubble Sort</option>
                <option value = {sortingTypes.merge}>Merge Sort</option>
                <option value = {sortingTypes.heap}>Heap Sort</option>
                </select>
            <button onClick={() => mergeSort()}>Merge Sort</button>
            <button onClick={() => selectionSort()}>Selection Sort</button>
            <button onClick={() =>insertionSort()}>Insertion Sort</button>
            <button onClick={() => setArray(generateNewArray(100))}>Generate Array</button>
            <div className="bar-container">
                {array.map( (value, idx) => (
                    <div className="bar" key={idx} style={{height: `${value}px`}}></div>
                ))}
            </div>
        </>
    )

}

export default Visualizer;