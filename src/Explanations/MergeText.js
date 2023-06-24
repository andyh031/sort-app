import Boilerplate from './Boilerplate'

function MergeText() {
    const _name = 'Merge Sort';
    const _best = 'O(nlogn)';
    const _average = 'O(nlogn)';
    const _worst = 'O(nlogn)';

    return (
    <Boilerplate name={_name} best={_best} average={_average} worst={_worst}/>
    )
}

export default MergeText;