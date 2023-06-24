import Boilerplate from './Boilerplate'

function SelectionText() {
    const _name = 'Selection Sort';
    const _best = 'O(n^2)';
    const _average = 'O(n^2)';
    const _worst = 'O(n^2)';

    return (
    <Boilerplate name={_name} best={_best} average={_average} worst={_worst}/>
    )
}

export default SelectionText;