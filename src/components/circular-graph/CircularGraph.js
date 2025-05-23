import './circularGraph.css'

const CircularGraph = (props) => {
    const {percentClosedTests} = props;
    const graphPropsValue = `conic-gradient(#4caf50 0% ${percentClosedTests}%, #e0e0e0 0% 0%)`
    return(
        <div className="circular__graph__block">
            <div className="graph" style={{
                    background: graphPropsValue
            }}></div>
        </div>
    )
}

export default CircularGraph;