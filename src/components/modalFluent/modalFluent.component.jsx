import { Modal } from '@fluentui/react';
import React, { useState } from 'react'
import InputFile from '../../controls/inputFile/inputFile.component';

const ModalFluent = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <Modal
     titleAriaId="id"
     isOpen={isModalOpen}
     onDismiss={()=>hideModal}
     isBlocking={true}
    >
        <div className="header-modal">{props.title}</div>
        {props.component?
        props.component:
        <form>
            <InputFile label='Contraseña' onChange={()=>{}} type='text'/>
            <button 
                className='button--primary button--default--none w10 button-login'
                type='submit'
                onClick={()=>setIsModalOpen(false)}
                >
                Guardar
            </button>
        </form>
        }

    </Modal>
    </>
  )
}

export default ModalFluent