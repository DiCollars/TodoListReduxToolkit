import Dexie from 'dexie';
import { Task, Category } from '../interfaces';

class DB extends Dexie {

    tasks: Dexie.Table<Task, number>; 
    categories: Dexie.Table<Category, number>; 

    constructor () {
        super("todolistdb");
        this.version(2).stores({
            tasks: '++id, name, description, categoryId',
            categories: '++id, name, description',
        });

        this.tasks = this.table("tasks");
        this.categories = this.table("categories");
    }
}

const todoDB = () => {
    const db = new DB();

    db.version(2).stores({
        tasks: '++id, name, description, categoryId',
        categories: '++id, name, description',
    });

    return db;
}

export const addTask = async (data: Task) => {
    const db = todoDB();
    return await db.tasks.bulkAdd([data]);
}

export const addCategory = async (data: Category) => {
    const db = todoDB();
    return await db.categories.bulkAdd([data]);
}

export const getTasks = async () => {
    const db = todoDB();

    return db.open().then(async function (db: any) {
        return await db.tasks.toArray();
    }).catch(console.error);
}

export const getCategories = async () => {
    const db = todoDB();

    return db.open().then(async function (db: any) {
        return await db.categories.toArray();
    }).catch(console.error);
}

export async function updateTask(id: number, obj: Task) {
    const db = todoDB();
    await db.tasks.update(id, obj);
    return {...obj, id: id};
}

export async function updateCategory(id: number, obj: Category) {
    const db = todoDB();
    await db.categories.update(id, obj);
    return {...obj, id: id};
}

export async function deleteTask(id: number) {
    const db = todoDB();
    await db.tasks.delete(id);
    return id;
}

export async function deleteCategory(id: number) {
    const db = todoDB();
    await db.categories.delete(id);
    return id;
}

export default todoDB;
