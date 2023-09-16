import React, { useState } from 'react'
import logo from '../assets/img/logo.webp'
import fond from '../assets/img/fondo-gafas.jfif'
import ContainerLogin from '../components/containerLogin/containerLogin.component'
const Home = () => {
    const [validGetLn, setvalidGetLn] = useState('')
    
  return (
    <>
    <ContainerLogin
        imageBackground={fond}
        logoPath={logo}
    />
    </>
  )
}

export default Home