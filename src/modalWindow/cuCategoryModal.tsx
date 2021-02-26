import React from 'react';
import '../modalWindow/modal.css';
import { Formik, Field, Form } from "formik";
import { CUCategoryModalProps } from '../interfaces';
import { ImCross } from 'react-icons/im';

function CUCategoryModal(props: CUCategoryModalProps) {

    return (
        <div className='modal-overlay'>
            <div className='modal-create-update'>
                <ImCross className='logo-img-path cross-size paddingRightTop' onClick={props.onCloseButtonClick} />
                <div className='head-text'>{props.headText}</div>
                <Formik
                    initialValues={{ name: props.placeholderName, description: props.placeholderDescription }}
                    onSubmit={(values: any) => {
                        props.handleSubmit(values);
                    }}
                >
                    <Form>
                        <div className='form-group' style={{ display: 'inline-block', position: 'relative', marginLeft: '24px', marginTop: '42px', marginBottom: '34px' }}>
                            <label>Имя<span style={{ color: 'red', marginLeft: '+2px' }}>*</span></label>
                            <Field className='field-name-category' name='name' type='text' maxLength='255' placeholder='Введите имя категории' />
                        </div>

                        <div className='form-group' style={{ display: 'inline-block', position: 'relative', marginLeft: '24px'}}>
                            <label>Описание</label>
                            <Field className='field-desc-category' name='description' type='text' maxLength='512' placeholder='Введите описание категории' />
                        </div>

                        <div>
                            <button className='create-category-button' type='submit'>{props.submitButtonText}</button>
                            <button className='close-category-button' onClick={props.onCloseButtonClick}>Закрыть</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >);
}

export default CUCategoryModal;
