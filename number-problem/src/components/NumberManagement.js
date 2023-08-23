import React, { useState, useEffect } from 'react';

function NumberManagement() {
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNumbers = async () => {
        setLoading(true);


        const apiUrl = 'http://20.244.56.144/numbers/odd';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.numbers && Array.isArray(data.numbers)) {
                const uniqueSortedNumbers = [...new Set(data.numbers)].sort((a, b) => a - b);
                setNumbers(uniqueSortedNumbers);
                console.log(numbers);
            } else {
                console.error('Invalid response format');
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNumbers();
    }, []); 

    return (
        <div>
            <h1>Number Management Service</h1>
            <button onClick={fetchNumbers} disabled={loading}>
                {loading ? 'Fetching Numbers...' : 'Fetch Numbers'}
            </button>
            <div>
                <h3>Result:</h3>
                <ul>
                    {numbers.map((number) => (
                        <li key={number}>{number}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NumberManagement;
