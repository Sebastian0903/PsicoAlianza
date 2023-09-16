import React, {useState, useEffect} from 'react'
import { Modal, IconButton } from '@fluentui/react'
import InputFileForm from '../../controls/inputFile/inputFile.component copy';
import SelectFile from '../../controls/selectFile/selectFile.component';

const ModalFluent = ({title, classTitle, onClose, openModal, form, revert, textAcept})=>{
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hideModal = () => {
      setIsModalOpen(false);
      onClose();
  }

  const showModal = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    showModal()
  }, [openModal])
  
  
  const renderForm = (form) =>{
    return(
      <div className="container--flex c--flex-wsb">
        {form.map(lbl=>{
          switch (lbl.type) {
            case 'text':
              return(
                <div className="w45">
                <InputFileForm onChange={()=>{}} placeholder={lbl.placeholder} label={lbl.label} className={lbl.className} style={lbl.style}/>
                </div>
              )
              break;

            case 'select':
              return(
                <div className="w45">
                <SelectFile placeholder={lbl.placeholder} options={lbl.options} label={lbl.label} className={lbl.className} style={lbl.style}/>
                </div>
              )
              break;
          
            default:
              break;
          }
          
        })
        }
      </div>
    )
  }

  return (
    <>
      <Modal
        titleAriaId={'titleId'}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={true}
      >
        <div className={'modal-header'}>
          <span className={classTitle} id="id">{title}</span>
          <IconButton
            iconProps = {{iconName: 'ChromeClose'}}
            ariaLabel="Close popup modal"
            onClick={()=>hideModal()}
            className='icon-modal-close'
          />
        </div>
        <div className="modal--body">
          {form && renderForm(form)}
        </div>
        <div className="modal-footer">
            <div className="w45-resp d--flex c--flex-wse">
              <button onClick={()=>hideModal()} className={`${revert?'button--primary':'button--second'} button--default--none`} >Cancelar</button>
              <button onClick={()=>hideModal()} className={`${revert?'button--second':'button--primary'} button--default--none`} >{textAcept}</button>
            </div>
        </div>
        
      </Modal>
    </>
  );
};
export default ModalFluent