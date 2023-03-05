import React from 'react'

export default function App() {

  const [data, setData] = React.useState([{}])
  React.useEffect(() => {
    fetch("/data").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.data === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.data.map((data, i) => (
          <p key={i}>{data}</p>
        ))
      )}
    </div>
  )
}
