import React, { useState } from 'react';
import './component.css';
import { FaFolder } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../modalWindow/confirmModal';
import '../modalWindow/modal.css';
import { Category, State, Task } from '../interfaces';
import { deleteTaskAsync, updateTaskAsync } from '../reducers/taskSlice';
import UpdateModal from '../modalWindow/cuTaskModal';

export default function TaskList() {
    const dispatch = useDispatch();

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

    const [currentTaskId, setCurrentTaskId] = useState<number>(0);
    const [currentTask, setCurrentTask] = useState<Task>({ name: '', description: '', categoryId: '', id: 0 });

    let state = useSelector((state: State) => state);
    let allTasks = state.Tasks;
    let allCategories = state.Categories;

    console.log('Render task list');

    function hideFolderIcon(categoryId: string, categories: Array<Category>) {

        let foundCategory = categories.filter(category => category.id == +categoryId);

        if (categoryId === '0' || foundCategory.length === 0) {

            return false;
        }
        else {

            return true;
        }
    }

    function getCategoryNameById(categoryId: string, categories: Array<Category>) {
        let foundCategory = categories.filter(category => category.id == +categoryId);

        if (foundCategory.length === 0) {

            return '';
        }
        else {

            return foundCategory[0].name;
        }
    }

    return (
        <div key='TASK_LIST'>
            {showDeleteModal &&
                <ConfirmModal
                    text={'Удаление задачи'}
                    onConfirmButtonClick={() => {
                        dispatch(deleteTaskAsync(currentTaskId));
                        setShowDeleteModal(false);
                    }}
                    onCloseButtonClick={() => setShowDeleteModal(false)}
                    subText={`Вы уверены, что хотите удалить задачу "${currentTask.name}"?`}
                    onCloseButtonStyle={'modal-confirm-no'}
                    onOpenButtonStyle={'modal-confirm-yes'}
                    textStyle={'modal-confirm-text'}
                />}
            { showUpdateModal &&
                <UpdateModal
                    defaultCategoryId={currentTask.categoryId}
                    defaultDescription={currentTask.description}
                    defaultName={currentTask.name}
                    handleSubmit={(task: Task) => {
                        dispatch(updateTaskAsync({taskId: currentTask.id, task: task}));
                        setShowUpdateModal(false);
                    }}
                    onCloseButtonClick={() => setShowUpdateModal(false)}
                    onConfirmButtonClick={() => { }}
                    headText={'Редактирование задачи'}
                    submitButtonText={'Сохранить'}
                />}
            {
                allTasks.map((task: Task) =>
                    <div key={task.id} className='list-item-size'>
                        <div className='div-in-one-line'>
                            <div className='div-left'>
                                <div className='item-name in-line'>{task.name}</div>

                                {hideFolderIcon(task.categoryId, allCategories) &&
                                    <div className='in-line'>
                                        <FaFolder className='logo-img-path folder-icon-size'></FaFolder>
                                        <div className='category-text-item in-line font-roboto'>{getCategoryNameById(task.categoryId, allCategories)}</div>
                                    </div>
                                }
                                <div className='description-style font-roboto'>{task.description}</div>
                            </div>
                            <div className='div-right'>
                                <MdModeEdit className='logo-img-path icon-size' onClick={() => {
                                    setShowUpdateModal(true);
                                    setCurrentTask(task);
                                }} />
                                <MdDelete className='logo-img-path icon-size' onClick={() => {
                                    setShowDeleteModal(true);
                                    setCurrentTaskId(task.id);
                                    setCurrentTask(task);
                                }} />
                            </div>
                        </div>
                        <hr className='hr-style' style={{marginBottom: '-3px'}}/>
                    </div>)
            }
        </div>)

} 
