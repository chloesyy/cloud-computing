import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Form from "./pages/Form";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    {/* TODO: prevent self-navigating to /form page */}
                    <Route path="/form" element={<Form />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}

// export default function App() {

//   const [data, setData] = React.useState([{}])
//   React.useEffect(() => {
//     fetch("/data").then(
//       res => res.json()
//     ).then(
//       data => {
//         setData(data)
//         console.log(data)
//       }
//     )
//   }, [])

//   return (
//     <div>
//       {(typeof data.data === 'undefined') ? (
//         <p>Loading...</p>
//       ) : (
//         data.data.map((data, i) => (
//           <p key={i}>{data}</p>
//         ))
//       )}
//     </div>
//   )
// }
