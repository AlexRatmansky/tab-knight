import { createStore } from 'redux'
import { wrapStore } from 'webext-redux'
import reducers, { loadState } from '../store'
import { configureApp } from './AppConfig'

const preloadedState = loadState()
const store = createStore(reducers, preloadedState)

configureApp(store)
wrapStore(store)

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-pin') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.update(current.id as number, { pinned: !current.pinned })
    })
  }

  if (command === 'move-tab-left') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, {
        index: current.index === 0 ? current.index : --current.index,
      })
    })
  }

  if (command === 'move-tab-right') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: ++current.index })
    })
  }

  if (command === 'move-tab-start') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: 0 })
    })
  }

  if (command === 'move-tab-end') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: -1 })
    })
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.greeting === 'hello') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current: chrome.tabs.Tab = tabs[0]
      chrome.tabs.update(current.id as number, { pinned: !current.pinned })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ farewell: 'goodbye' })
  }

  if (request.greeting === 'toggle-pin') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.update(current.id as number, { pinned: !current.pinned })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ farewell: 'toggle-pin' })
  }

  if (request.greeting === 'move-tab-left') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, {
        index: current.index === 0 ? current.index : --current.index,
      })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ farewell: 'move-tab-left' })
  }

  if (request.greeting === 'move-tab-right') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: ++current.index })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ farewell: 'move-tab-right' })
  }

  if (request.greeting === 'move-tab-start') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: 0 })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ farewell: 'move-tab-start' })
  }

  if (request.greeting === 'move-tab-end') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: -1 })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ farewell: 'move-tab-end' })
  }
})
