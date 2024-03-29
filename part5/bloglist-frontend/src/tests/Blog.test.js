import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

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

const testBlog = {
  title: 'Testiblogi',
  author: 'Testaaja testi',
  url: 'https://www.testiblogi.fi/testi'
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
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler}/>)
    const mockUser = userEvent.setup()
    const button1 = screen.getByText('Component testing is done with react-testing-library')
    await mockUser.click(button1)
    const button2 = screen.getByText('Like')
    await mockUser.click(button2)
    await mockUser.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('Testing Blogform', () => {

  test('Testing add new blog form', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm addNewBlog={mockHandler}/>)
    const inputs = screen.getAllByRole('textbox')
    const createButton = screen.getByText('create')

    await user.type(inputs[0], testBlog.title)
    await user.type(inputs[1], testBlog.author)
    await user.type(inputs[2], testBlog.url)
    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler).toHaveBeenCalledWith({
      title: testBlog.title,
      author: testBlog.author,
      url: testBlog.url,
    })

  })
})