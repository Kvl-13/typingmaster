import React from 'react'

export default function Details(props) {

    const { time, wordCount, letterCount, errorCount, handleRestart } = props;

    return (
        <div className="d-flex align-items-center justify-content-between w-100 mb-2" style={{ height: "7%" }}>
            <p className="mb-0" style={{ width: "20%" }}>Time: {time}sec</p>
            {
                time === 0 ?
                    <div className="d-flex justify-content-center align-items-center h-100 w-100 gap-4">
                        <p className="mb-0">WPM: {wordCount}wpm</p>

                        <p className="mb-0">Accuracy: {
                            isNaN(Math.round(((letterCount - errorCount) / letterCount) * 100)) ? "0" :
                                Math.round(((letterCount - errorCount) / letterCount) * 100)
                        }%
                        </p>

                        <p className="mb-0">Error: {errorCount}</p>
                    </div>
                    : <p style={{color: "#f8961e"}}>Score show here after time over</p>
            }

            <div className="d" style={{ width: "20%" }}>
                <button className="btn btn-success" onClick={handleRestart} style={{ float: "right" }} >Restart</button>
            </div>
        </div>
    )
}
