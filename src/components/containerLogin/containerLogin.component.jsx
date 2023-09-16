import { Checkbox, TextField } from '@fluentui/react'
import React, { useCallback, useState } from 'react'
import InputFile from '../../controls/inputFile/inputFile.component';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ContainerLogin = (props) => {
  const [isChecked, setIsChecked] = useState(true)
  const [user, setUser] = useState('')
  const navigate = useNavigate();

  const onChange = useCallback((item,e)=>{
    setIsChecked(!!e);
  });

  const _supportHistoryFooter = useCallback(
    (e) => (
      setUser(e)
    ),
    [user],
  );

  const submitUser = () =>{
    Cookies.set('user',user)
    navigate(`/inbox`);
  }
  return (
    <>
    <div className="main__container">
    <div className="container--login degradado estile-computer">

<img
  className="main__container-img"
  src={props.imageBackground}
  alt=""
/>
</div>
{/* <div className="container--curve estile-computer">
        <IconLogo className='estile-computer' style={estilo} />
    </div> */}
<div className="login--fond-degrade">
<div className="login--fond-base">

  <div className="sub-zero w8">
    <div className="login-container-center w10">
      <div className="mrg-1">
      <img
        src={props.logoPath}
        alt="LOGO"
        className="pos-sta logo-client"
      />
      </div>
      <form onSubmit={submitUser}>
      <div className="login--container-main w10">
      <InputFile label='Usuario' onChange={(e)=>{_supportHistoryFooter(e)}}/>
      <InputFile label='Contraseña' onChange={()=>{}} type='password'/>
      <Checkbox label="Recordar contraseña" checked={isChecked} onChange={onChange} />
      </div>
      <button 
        className='button--primary button--default--none w10 button-login'
        type='submit'
        >
          Iniciar sesión
      </button>
      </form>
      
    </div>
  </div>
  <div id="abajo" className="login--container-footer">
    <div className="c--flex-wsb d--flex w10 button-tyc mg10-h">
      <a
        href="#"
        className="hipertext-base hipertext--second"
      >
        ¿Olvidaste tu usuario?
      </a>

      <a
        href="#"
        className="hipertext-base hipertext--second"
      >
        ¿Olvidaste tu contraseña?
      </a>
    </div>
  </div>
</div>
</div>
    </div>
    </>
  )
}

export default ContainerLogin