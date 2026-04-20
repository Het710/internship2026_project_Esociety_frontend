import React, { useEffect, useState } from 'react'

const UseEffectDemo = () => {

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("use effect called...")
  }, [count])
  // runs whenever count changes

  return (
    <div style={{ textAlign: "center" }}>
      <h1>UseEffectDemo</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <p>Count: {count}</p>
    </div>
  )
}

export default UseEffectDemo