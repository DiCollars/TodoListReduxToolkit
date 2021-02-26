import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, getTasks, updateTask } from "../database/db";
import { Action, Task, TaskAndNumber } from "../interfaces";

export const getAllTasksAsync = createAsyncThunk(
    'task_slice/getAllTasksAsync', async () => {
        return await getTasks();
    }
);
export const addTaskAsync = createAsyncThunk(
    'task_slice/addTaskAsync', async (newCategory: Task) => {
        const newCategoryId = await addTask(newCategory);                    
        return { ...newCategory, id: newCategoryId };
    }
);
export const updateTaskAsync = createAsyncThunk(
    'task_slice/updateTaskAsync', async (categoryIdAndfixedcategory: TaskAndNumber) => {
        return await updateTask(categoryIdAndfixedcategory.taskId, categoryIdAndfixedcategory.task);
    }
);
export const deleteTaskAsync = createAsyncThunk(
    'task_slice/deleteTaskAsync', async (categoryId: number) => {
        return await deleteTask(categoryId);
    }
);

const taskSlice = createSlice({
    name: 'task_slice',

    initialState: [{
        name: '',
        description: '',
        categoryId: '',
        id: 0
    }],

    reducers: {},
    extraReducers: builder => {
        builder.addCase(addTaskAsync.fulfilled, (state: Array<Task>, action:  Action<string, Task>) => {
          const tasks = [...state];
          tasks.push(action.payload);

          return tasks;
        });
        builder.addCase(getAllTasksAsync.fulfilled, (state: Array<Task>, action: Action<string, Array<Task>>) => {
          return action.payload;
        });
        builder.addCase(updateTaskAsync.fulfilled, (state: Array<Task>, action: Action<string, Task>) => {
            const tasksUpdate = [...state];
            const newTasksUpdate = tasksUpdate.map(task => {
                if (task.id === action.payload.id) {

                    return action.payload;
                }

                return task;
            });

            return newTasksUpdate;
        });
        builder.addCase(deleteTaskAsync.fulfilled, (state: Array<Task>, action: Action<string, number>) => {
            const newTasks = [...state].filter(category => category.id !== action.payload);

            return newTasks;
        });
    }
});

export const taskReducer = taskSlice.reducer;
