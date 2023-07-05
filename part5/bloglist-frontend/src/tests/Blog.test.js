import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Teemu testaaja',
  url: 'https://www.testi.fi/testi',
  likes: 0,
  user: {
    username: 'Teemuntesti',
    name: 'Teemu'
  },
}


describe('Basic test on UI', () => { //5.13

  test('Renders title and author', async () => {
    render(<Blog blog={blog} />)
    const title = screen.getByText('Component testing is done with react-testing-library')
    const author = screen.getByText('Teemu testaaja')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('All required info showed', async () => { //5.14
    render(<Blog blog={blog}/>)
    const mockUser = userEvent.setup()
    const button = screen.getByText('Component testing is done with react-testing-library')
    await mockUser.click(button)
    const title = screen.getByText('Component testing is done with react-testing-library')
    const author = screen.getByText('Teemu testaaja')
    const url = screen.getByText('Teemu testaaja')
    const likes = screen.getByText('0')
    const username = screen.getByText('Teemu')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(username).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('Testing like button functionality', async () => {
    const addLike = jest.fn()
    render(<Blog blog={blog} addLike={addLike}/>)
    const mockUser = userEvent.setup()
    const button1 = screen.getByText('Component testing is done with react-testing-library')
    await mockUser.click(button1)
    const button2 = screen.getByText('Like')
    await mockUser.click(button2)
    await mockUser.click(button2)
    expect(addLike.mock.calls).toHaveLength(2)
  })

})