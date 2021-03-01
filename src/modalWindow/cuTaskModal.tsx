import React from 'react';
import { useSelector } from 'react-redux';
import '../modalWindow/modal.css';
import { Formik, Field, Form } from "formik";
import { CUTaskModalProps, Category, State } from '../interfaces';
import { ImCross } from 'react-icons/im';
import * as yup from 'yup';

function CUTaskModal(props: CUTaskModalProps) {
    const list: Array<Category> = useSelector((state: State) => state.Categories);
    const validationsSchema = yup.object().shape({
        name: yup.string().required('Поле обязательно.')
    });

    return (
        <div className='modal-overlay'>
            <div className='modal-create-update'>
                <ImCross className='logo-img-path cross-size paddingRightTop ' onClick={props.onCloseButtonClick} />
                <div className='head-text'>{props.headText}</div>
                <Formik
                    initialValues={{ name: props.defaultName, description: props.defaultDescription, categoryId: props.defaultCategoryId }}
                    onSubmit={(values) => {
                        props.handleSubmit(values);
                    }}
                    validationSchema={validationsSchema}
                >
                    {({ errors, touched }) => (
                        <Form className='form-padding'>
                            <div >
                                <div className='form-group' style={{ display: 'inline-block', position: 'relative' }}>
                                    <label>Имя
                                {errors.name && touched.name ? (<span style={{ color: 'red', marginLeft: '+2px' }}>*</span>) : null}
                                    </label>
                                    <Field name='name' type='text' maxLength='255' placeholder='Введите имя задания' className='field-name' />
                                </div>
                                <div className='form-group' style={{ display: 'inline-block', position: 'relative', marginLeft: '+16px', marginBottom: '-18px' }}>
                                    <label>Категория</label>
                                    <Field name="categoryId" as="select" className='field-category-task'>
                                        <option value='0' className='font-color-gray' >Выберите категорию</option>
                                        {list?.map((category: Category) =>
                                            <option key={category.id} value={category.id} >{category.name}</option>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className='form-group' style={{ display: 'inline-block', position: 'relative', marginTop: '+24px' }}>
                                <label>Описание</label>
                                <Field className='field-desc-task' name='description' type='text' maxLength='1536' placeholder='Введите описание задания' />
                            </div>

                            <div>
                                <button className='create-task-button' type='submit'>{props.submitButtonText}</button>
                                <button className='close-task-button' onClick={props.onCloseButtonClick}>Закрыть</button>
                            </div>
                        </Form>)}
                </Formik>
            </div>
        </div >);
}

export default CUTaskModal;
