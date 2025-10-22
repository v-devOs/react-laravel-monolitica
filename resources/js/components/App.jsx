import React, { useState } from "react";

const App = () => {
    const [counter, setcounter] = useState(0);
    return (
        <div>
            <h1>Counter</h1>
            <p>{counter}</p>
            <button onClick={() => setcounter((c) => c + 1)}>
                Incrementar
            </button>
        </div>
    );
};

export default App;
