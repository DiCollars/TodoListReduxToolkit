import '../modalWindow/modal.css';
import { ImCross } from 'react-icons/im';
import { ConfirmModalProps } from '../interfaces';

function Modal(props: ConfirmModalProps) {
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <ImCross className='logo-img-path cross-size' onClick={props.onCloseButtonClick} />
                <div className={props.textStyle}>{props.text}</div>
                <div className='subtext-style'>{props.subText}</div>
                <div className='paddingTop'>
                    <button className={props.onCloseButtonStyle} onClick={props.onCloseButtonClick}>
                        Нет
                    </button>
                    <button className={props.onOpenButtonStyle} onClick={props.onConfirmButtonClick}>
                        Да
                    </button>
                </div>
            </div>
        </div>);
}

export default Modal;
