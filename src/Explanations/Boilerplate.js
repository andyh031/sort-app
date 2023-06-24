function Boilerplate({name, best, average, worst}) {
    return (
        <>
            <h2>{name}</h2>
            <table>
                <tr>
                    <th>Best</th>
                    <th>Average</th>
                    <th>Worst</th>
                </tr>
                <tr>
                    <th>{best}</th>
                    <th>{average}</th>
                    <th>{worst}</th>
                </tr>
            </table>
        </>
    )
}

export default Boilerplate;