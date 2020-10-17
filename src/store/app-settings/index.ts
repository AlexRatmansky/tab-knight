import { Action, Reducer } from 'redux'
import { ThemeTypes } from '../../components/styles/themes'

enum ActionType {
  DARK_THEME = 'DARK_THEME',
  LIGHT_THEME = 'LIGHT_THEME',
}

export type Actions = Action<ActionType>

export const setDarkTheme = () => ({ type: 'DARK_THEME' })

export const setLightTheme = () => ({ type: 'LIGHT_THEME' })

export interface IAppSettings {
  theme: ThemeTypes
}

const initialState: IAppSettings = {
  theme: 'light',
}

const settings: Reducer<IAppSettings, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case 'DARK_THEME':
      return { ...state, theme: 'dark' }

    case 'LIGHT_THEME':
      return { ...state, theme: 'light' }

    default:
      return state
  }
}

export default settings
