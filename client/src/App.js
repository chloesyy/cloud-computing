import React, { useState } from 'react'
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';

export default function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}


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
