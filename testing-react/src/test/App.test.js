import React from 'react'
import { render } from '@testing-library/react'
import App from '../App';
import axios from 'jest-mock-axios';


test('renders App component without crashing', () => {
  render(<App />)
})

test('initial state of memes is an empty array', () => {
  const { result } = renderHook(() => App())
  expect(result.current.memes).toEqual([])
})

test('fetch request updates memes state variable', async () => {
  const { result, waitForNextUpdate } = renderHook(() => App())
  await waitForNextUpdate()
  expect(result.current.memes.length).toBeGreaterThan(0)
})

test('renders all meme templates from the API', async () => {
  const { getByAltText } = render(<App />)
  const response = await axios.get('https://api.imgflip.com/get_memes')
  const memes = response.data.data.memes
  memes.forEach(meme => {
    expect(getByAltText(meme.name)).toBeInTheDocument()
  })
})

test('displays the correct title', () => {
  const { getByText } = render(<App />)
  expect(getByText('Meme Templates')).toBeInTheDocument()
})
