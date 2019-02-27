import axios from 'axios'

const initialState = {
  categories: [],
  filteredBooks: []
}

const CHANGE_CATEGORIES = 'CHANGE_CATEGORIES'

export const changeCategories = (category, display) => ({
  type: CHANGE_CATEGORIES,
  category,
  display
})

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
    default:
      return state
  }
}

export default filterReducer
