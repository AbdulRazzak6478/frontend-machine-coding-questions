import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import FormValidationWithoutYup from './components/FormValidationWithoutYup'
import FormValidationWithYup from './components/FormValidationWithYup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <FormValidationWithoutYup /> */}
      <FormValidationWithYup />
    </>
  )
}

export default App
