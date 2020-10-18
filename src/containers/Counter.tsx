import * as React from 'react'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { IAppState } from '../store'
import { decrement, increment, reset } from '../store/counter'

export const Counter: FC = () => {
  const {
    counter: { clicksMade },
  } = useSelector((state: IAppState) => state)

  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  const handleReset = () => {
    dispatch(reset())
  }

  const handleTogglePin = () => {
    chrome.runtime.sendMessage({ action: 'toggle-pin' }, (response) => {
      console.log(response.message)
    })
  }

  const handleMoveTabLeft = () => {
    chrome.runtime.sendMessage({ action: 'move-tab-left' }, (response) => {
      console.log(response.message)
    })
  }

  const handleMoveTabRight = () => {
    chrome.runtime.sendMessage({ action: 'move-tab-right' }, (response) => {
      console.log(response.message)
    })
  }

  const handleMoveTabStart = () => {
    chrome.runtime.sendMessage({ action: 'move-tab-start' }, (response) => {
      console.log(response.message)
    })
  }

  const handleMoveTabEnd = () => {
    chrome.runtime.sendMessage({ action: 'move-tab-end' }, (response) => {
      console.log(response.message)
    })
  }

  return (
    <CounterContainer>
      <Display>{clicksMade}</Display>
      <Controls>
        <Button onClick={handleIncrement}>{'+'}</Button>
        <Button onClick={handleDecrement}>{'-'}</Button>
      </Controls>
      <button onClick={handleTogglePin}>{'toggle-pin'}</button>
      <button onClick={handleMoveTabLeft}>{'move-tab-left'}</button>
      <button onClick={handleMoveTabRight}>{'move-tab-right'}</button>
      <button onClick={handleMoveTabStart}>{'move-tab-start'}</button>
      <button onClick={handleMoveTabEnd}>{'move-tab-end'}</button>
      <Button onClick={handleReset}>{'Reset'}</Button>
    </CounterContainer>
  )
}

const CounterContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  padding: 5px;
  margin: 5px;
  background-color: ${(p) => p.theme.backgroundColor};
`

const Display = styled('div')`
  font-size: 48px;
  justify-self: center;
`

const Controls = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-width: 200px;
`

// Thanks to: https://codepen.io/FelipeMarcos/pen/tfhEg?editors=1100
const Button = styled('button')`
  display: inline-block;
  position: relative;
  padding: 10px 30px;
  border: 1px solid transparent;
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  background: linear-gradient(rgba(27, 188, 194, 1) 0%, rgba(24, 163, 168, 1) 100%);

  color: white;
  font-size: 22px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  text-decoration: none;

  cursor: pointer;
  outline: none;
  user-select: none;

  &:active {
    background: #169499;
  }
`
