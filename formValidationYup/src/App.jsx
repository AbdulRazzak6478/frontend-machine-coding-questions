import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import FormValidationWithoutYup from './components/FormValidationWithoutYup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormValidationWithoutYup />
    </>
  )
}

export default App
