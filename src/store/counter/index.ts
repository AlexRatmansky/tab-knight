import { Action, Reducer } from 'redux'

enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
}

export type Payload = number

export type CounterActions = Action<ActionType, Payload>

export const increment = (payload: Payload = 1) => ({
  type: 'INCREMENT',
  payload,
})
export const decrement = (payload: Payload = 1) => ({
  type: 'DECREMENT',
  payload,
})
export const reset = () => ({
  type: 'RESET',
})

export interface ICounter {
  clicksMade: number
}

const initialState: ICounter = {
  clicksMade: 0,
}

const counter: Reducer<ICounter, CounterActions> = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case ActionType.INCREMENT:
      return { ...state, clicksMade: state.clicksMade + (payload || 1) }

    case ActionType.DECREMENT:
      return { ...state, clicksMade: state.clicksMade - (payload || 1) }

    case ActionType.RESET:
      return { ...state, clicksMade: 0 }

    default:
      return state
  }
}

export default counter
