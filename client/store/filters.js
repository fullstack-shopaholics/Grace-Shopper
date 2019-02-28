import axios from 'axios'

const initialState = {
  categories: [],
  filteredBooks: []
}

const CHANGE_CATEGORIES = 'CHANGE_CATEGORIES'
const GET_FILTERED_BOOKS = 'GET_FILTERED_BOOKS'
const CLEAR_CATEGORY = 'CLEAR_CATEGORY'

export const changeCategories = (category, display) => ({
  type: CHANGE_CATEGORIES,
  category,
  display
})

export const clearCategories = () => ({type: CLEAR_CATEGORY})

export const getFilteredBooks = books => ({type: GET_FILTERED_BOOKS, books})

export const fetchFilteredBooks = filters => {
  return async dispatch => {
    try {
      const result = await axios.put(`api/books/filter`, {filters})
      const books = result.data
      dispatch(getFilteredBooks(books))
    } catch (err) {
      console.error(err)
    }
  }
}

function filterCategories(allCategories, category, display) {
  let newArray = []
  if (display) {
    newArray = [...allCategories, category]
  } else {
    newArray = allCategories.filter(
      currentCategory => currentCategory !== category
    )
  }

  return newArray
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORIES:
      return {
        ...state,
        categories: filterCategories(
          state.categories,
          action.category,
          action.display
        )
      }
    case GET_FILTERED_BOOKS:
      return {...state, filteredBooks: action.books}
    case CLEAR_CATEGORY:
      return {...state, categories: []}
    default:
      return state
  }
}

export default filterReducer
