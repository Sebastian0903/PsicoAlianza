import React, { useState } from 'react'
import logo from '../assets/img/logo.webp'
import ContainerLogin from '../components/containerLogin/containerLogin.component'
const Home = () => {
    const [validGetLn, setvalidGetLn] = useState('')
    
  return (
    <>
    <ContainerLogin
        imageBackground={'https://bsr-sso-services.azurewebsites.net/assets/1/URosario/imageBackground.webp'}
        logoPath={logo}
    />
    </>
  )
}

export default Home