import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const testUser = {
  username: 'Teemuntesti',
  name: 'Teemu',
}

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


describe('Basic test', () => { //5.13
  test('renders title', async () => {
    render(<Blog blog={blog} user={testUser} />)
    const title = screen.getByText('Component testing is done with react-testing-library')
    const author = screen.getByText('Teemu testaaja')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('All info showed', async () => { //5.14
    render(<Blog blog={blog} user={testUser} />)
    const us = userEvent.setup()
    const button = screen.getByText('Component testing is done with react-testing-library')
    await us.click(button)
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

})