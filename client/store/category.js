import axios from 'axios'

const initialState = []

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

export const deleteCategory = categoryId => ({
  type: DELETE_CATEGORY,
  categoryId
})

export const fetchCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories')
    const data = res.data
    dispatch(setCategories(data))
  } catch (err) {
    console.error(err)
  }
}

export const postCategory = category => async dispatch => {
  try {
    const res = await axios.post(`/api/categories/create`, {category})
    const newCategory = res.data
    dispatch(addCategory(newCategory))
  } catch (err) {
    console.error(err)
  }
}

export const destroyCategory = categoryId => async dispatch => {
  try {
    await axios.delete(`/api/categories/delete`, {params: {categoryId}})
    dispatch(deleteCategory(categoryId))
  } catch (err) {
    console.error(err)
  }
}

export const getCategories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    case ADD_CATEGORY:
      return [...state, action.category]
    case DELETE_CATEGORY:
      return state.filter(category => category.id !== action.categoryId)
    default:
      return state
  }
}
