import React, { useEffect, useState } from 'react';

const DataTable = (props) => {
    const [numbers, setNumbers] = useState(props.numbers);
    const [addedNumber, setAddedNumber] = useState('');
    const [index, setIndex] = useState(0);

    const [mean, setMean] = useState(0);
    const [median, setMedian] = useState(0);
    const [std, setStd] = useState(0);
    const [mode, setMode] = useState(0);

    function generateRandomNumber() {
        setIndex(Math.floor(Math.random() * (props.numbers.length)));
    }

    function addNumber() {
        let copy = [...numbers];
        copy[index].data.push(Number(addedNumber));
        setNumbers(copy);
        setAddedNumber('');
    }

    useEffect(() => {
        setMean(numbers[index]?.data?.reduce((a, b) => a + b) / numbers[index]?.data.length);
        setStd(() => {
            let mm = numbers[index]?.data.reduce((a, b) => a + b) / numbers[index]?.data.length;
            return Math.sqrt(numbers[index]?.data.map(x => Math.pow(x - mm, 2)).reduce((a, b) => a + b) / numbers[index]?.data.length);
        });
        setMedian(() => {
            const mid = Math.floor(numbers[index]?.data.length / 2), nums = [...numbers[index]?.data].sort((a, b) => a - b);
            return numbers[index]?.data.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        }
        );
        setMode(() => {
            const mode = {};
            let max = 0, count = 0;

            for (let i = 0; i < numbers[index]?.data.length; i++) {
                const item = numbers[index]?.data[i];
                if (mode[item]) {
                    mode[item]++;
                } else {
                    mode[item] = 1;
                }
                if (count < mode[item]) {
                    max = item;
                    count = mode[item];
                }
            }
            return max;
        });
    }, [numbers, numbers[index]?.data]);

    const myStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '20px'
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', marginLeft: '90px' }}>
                <div style={{ width: '80%', border: '1px solid black', margin: '40px', height: '500px' }}>
                    <h2 style={{ textAlign: 'center' }}>Data Table</h2>
                    <div style={{ textAlign: 'center', margin: '20px' }}>
                        <button onClick={generateRandomNumber}>Generate new dataset</button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <input type='number' value={addedNumber} onChange={(e) => setAddedNumber(e.target.value)} />
                        <button onClick={addNumber}>Add</button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {numbers[index]?.data?.map(num => (
                            <p>{num}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h1 style={{ marginLeft: '80px' }}>Calculated Data</h1>
                <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '40px', }}>
                    <tr>
                        <td style={myStyle}>Mean</td>
                        <td style={myStyle}>{mean}</td>
                    </tr>
                    <tr>
                        <td style={myStyle}>Median</td>
                        <td style={myStyle}>{median}</td>
                    </tr>
                    <tr>
                        <td style={myStyle}>Standard Deviation</td>
                        <td style={myStyle}>{std}</td>
                    </tr>
                    <tr>
                        <td style={myStyle}>Mode</td>
                        <td style={myStyle}>{mode}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default DataTable;