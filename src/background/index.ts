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
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle-pin') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.update(current.id as number, { pinned: !current.pinned })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ message: 'toggle-pin' })
  }

  if (request.action === 'move-tab-left') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, {
        index: current.index === 0 ? current.index : --current.index,
      })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ message: 'move-tab-left' })
  }

  if (request.action === 'move-tab-right') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: ++current.index })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ message: 'move-tab-right' })
  }

  if (request.action === 'move-tab-start') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: 0 })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ message: 'move-tab-start' })
  }

  if (request.action === 'move-tab-end') {
    // Get the currently selected tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Toggle the pinned status
      const current = tabs[0]
      chrome.tabs.move(current.id as number, { index: -1 })
    })

    console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')

    sendResponse({ message: 'move-tab-end' })
  }
})
