import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../database/db";
import { Action, Category, CategoryAndNumber } from "../interfaces";

export const getAllCategoriesAsync = createAsyncThunk(
    'category_slice/getAllCategoriesAsync', async () => {
        return await getCategories();
    }
);

export const addCategoryAsync = createAsyncThunk(
    'category_slice/addCategoryAsync', async (newCategory: Category) => {
        const newCategoryId = await addCategory(newCategory);                    
        return { ...newCategory, id: newCategoryId };
    }
);

export const updateCategoryAsync = createAsyncThunk(
    'category_slice/updateCategoryAsync', async (categoryIdAndfixedcategory: CategoryAndNumber) => {
        return await updateCategory(categoryIdAndfixedcategory.categoryId, categoryIdAndfixedcategory.category);
    }
);

export const deleteCategoryAsync = createAsyncThunk(
    'category_slice/deleteCategoryAsync', async (categoryId: number) => {
        return await deleteCategory(categoryId);
    }
);

const categorySlice = createSlice({
    name: 'category_slice',
    initialState: [{
        name: '',
        description: '',
        id: 0
    }],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addCategoryAsync.fulfilled, (state: Array<Category>, action: Action<string, Category>) => {
          const categories = [...state];
          categories.push(action.payload);

          return categories;
        });
        builder.addCase(getAllCategoriesAsync.fulfilled, (state: Array<Category>, action: Action<string, Array<Category>>) => {
          return action.payload;
        });
        builder.addCase(updateCategoryAsync.fulfilled, (state: Array<Category>, action: Action<string, Category>) => {
            const categoriesUpdate = [...state];
            const newcategoriesUpdate = categoriesUpdate.map(category => {
                if (category.id === action.payload.id) {

                    return action.payload;
                }

                return category;
            });

            return newcategoriesUpdate;
        });
        builder.addCase(deleteCategoryAsync.fulfilled, (state: Array<Category>, action: Action<string, number>) => {
            const newСategories = [...state].filter(category => category.id !== action.payload);

            return newСategories;
        });
    }
});

export const categoryReducer = categorySlice.reducer;
