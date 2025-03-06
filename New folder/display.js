import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://backend-service/crd-data") // Use the backend service URL
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching CRD data:", error));
    }, []);

    return (
        <div>
            <h1>CRD Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default App;
