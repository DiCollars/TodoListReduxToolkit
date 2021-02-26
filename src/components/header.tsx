import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../components/component.css';
import '../modalWindow/modal.css';
import AddCategoryModal from '../modalWindow/cuCategoryModal';
import AddTaskModal from '../modalWindow/cuTaskModal';
import { Task, Category } from '../interfaces';
import { addTaskAsync } from '../reducers/taskSlice';
import { addCategoryAsync } from '../reducers/categorySlice';

export default function Header() {
  const [showModalCategory, setShowModalCategory] = useState<boolean>(false);
  const [showModalTask, setShowModalTask] = useState<boolean>(false);

  const location = useLocation();
  const dispatch = useDispatch();

  function navlinkCategoryColorToggle(path: string) {
    if (path === '/categories') {
      return 'text-white';
    }
    else {
      return 'text-blue';
    }
  }

  function navlinkTaskColorToggle(path: string) {
    if (path === '/tasks') {
      return 'text-white';
    }
    else {
      return 'text-blue';
    }
  }

  return (
    <div>
      <div className='component-header blue-color'>
        <span className='text-white todo-list-size'>ToDo List</span>
        <NavLink className={`${navlinkTaskColorToggle(location.pathname)} task-navlink`} to='/tasks'> Задачи </NavLink>
        <span className={'text-white task-navlink'}>&nbsp;|&nbsp;</span>
        <NavLink className={`${navlinkCategoryColorToggle(location.pathname)} task-navlink`} to='/categories'> Категории </NavLink>
        {location.pathname === '/categories' && <span className='text-white add-end' onClick={() => setShowModalCategory(true)}>Добавить категорию</span>}
        {location.pathname === '/tasks' && <span className='text-white add-end' onClick={() => setShowModalTask(true)}>Добавить задачу</span>}
      </div>
      {showModalCategory &&
        <AddCategoryModal
          handleSubmit={(category: Category) => {
            dispatch(addCategoryAsync(category));
            setShowModalCategory(false);
          }}
          onCloseButtonClick={() => setShowModalCategory(false)}
          onConfirmButtonClick={() => { }}
          headText={'Создание категории'}
          submitButtonText={'Создать'}
          placeholderDescription={''}
          placeholderName={''}
        />}

      {showModalTask &&
        <AddTaskModal
          defaultCategoryId={'0'}
          handleSubmit={(task: Task) => {
            dispatch(addTaskAsync(task));
            setShowModalTask(false);
          }}
          onCloseButtonClick={() => setShowModalTask(false)}
          onConfirmButtonClick={() => { }}
          headText={'Создание задачи'}
          submitButtonText={'Создать'}
          defaultDescription={''}
          defaultName={''}
        />}

    </div>
  );
}
