export interface Action<T, P> {
    type: T;
    payload: P;
}

export interface CategoryAndNumber {
    categoryId: number;
    category: Category;
}

export interface TaskAndNumber {
    taskId: number;
    task: Task;
}

export interface Task {
    name: string;
    description: string;
    categoryId: string;
    id: number;
}

export interface Category {
    name: string;
    description: string;
    id: number;
}

export interface State {
    Tasks: Array<Task>;
    Categories: Array<Category>;
}

export interface Modal<T> {
    showModal: T;
}

export interface ConfirmModalProps {
    textStyle: string;
    text: string;
    subText: string;
    onOpenButtonStyle: string;
    onConfirmButtonClick: any;
    onCloseButtonStyle: string;
    onCloseButtonClick: any;
}

export interface CUCategoryModalProps {
    onCloseButtonClick: any;
    onConfirmButtonClick: any;
    headText: string;
    submitButtonText: string;
    handleSubmit: any,
    placeholderName: string,
    placeholderDescription: string | undefined
}

export interface CUTaskModalProps {
    onCloseButtonClick: any;
    onConfirmButtonClick: any;
    headText: string;
    submitButtonText: string;
    handleSubmit: any,
    defaultName: string,
    defaultDescription: string | undefined,
    defaultCategoryId: string | undefined
}
