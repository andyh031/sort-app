import Boilerplate from './Boilerplate'

function BubbleText() {
    const _name = 'Bubble Sort';
    const _best = 'O(n)';
    const _average = 'O(n^2)';
    const _worst = 'O(n^2)';

    return (
    <Boilerplate name={_name} best={_best} average={_average} worst={_worst}/>
    )
}

export default BubbleText;