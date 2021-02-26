import React, { useState } from 'react';
import './component.css';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmModal from '../modalWindow/confirmModal';
import UpdateModal from '../modalWindow/cuCategoryModal';
import '../modalWindow/modal.css';
import { Category, State } from '../interfaces';
import { deleteCategoryAsync, updateCategoryAsync } from '../reducers/categorySlice';

export default function CategoryList() {
    const dispatch = useDispatch();

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

    const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
    const [currentCategory, setCurrentCategory] = useState<Category>({ name: '', description: '', id: 0 });

    let categoryList = useSelector((state: State) => state.Categories);

    return (
        <div key='CATEGORY_LIST' className='list-size-centre'>
            { showDeleteModal &&
                <ConfirmModal
                    text={'Удаление категории'}
                    onConfirmButtonClick={() => {
                        setShowDeleteModal(false);
                        dispatch(deleteCategoryAsync(currentCategoryId));

                    }}
                    onCloseButtonClick={() => setShowDeleteModal(false)}
                    subText={`Вы уверены, что хотите удалить категорию "${currentCategory.name}"?`}
                    onCloseButtonStyle={'modal-confirm-no'}
                    onOpenButtonStyle={'modal-confirm-yes'}
                    textStyle={'modal-confirm-text'}
                />}

            { showUpdateModal &&
                <UpdateModal
                    placeholderDescription={currentCategory.description}
                    placeholderName={currentCategory.name}
                    handleSubmit={(category: Category) => {
                        setShowUpdateModal(false);
                        dispatch(updateCategoryAsync({categoryId: currentCategory.id, category: category}));
                    }}
                    onCloseButtonClick={() => setShowUpdateModal(false)}
                    onConfirmButtonClick={() => { }}
                    headText={'Редактирование категории'}
                    submitButtonText={'Сохранить'}
                />}

            {
                categoryList.map((category: Category) =>
                    <div key={category.id} className='list-item-size'>
                        <div className='div-in-one-line'>
                            <div className='div-left'>
                                <span className='item-name'>{category.name}</span>
                                <div className='font-roboto description-style'>{category.description}</div>
                            </div>
                            <div className='div-right'>
                                <MdModeEdit className='logo-img-path icon-size' onClick={() => {
                                    setShowUpdateModal(true);
                                    setCurrentCategory(category);
                                }} />
                                <MdDelete className='logo-img-path icon-size' onClick={() => {
                                    setShowDeleteModal(true)
                                    setCurrentCategory(category);
                                    setCurrentCategoryId(category.id);
                                }} />
                            </div>
                        </div>
                        <hr className='hr-style' style={{marginBottom: '-3px'}}/>
                    </div>)
            }
        </div>)

} 
