import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

const testUser = {
  username: 'Teemu testaaja',
  name: 'Teemu',
}

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Teemu testaaja',
  url: 'https://www.testi.fi/testi',
  likes: 0,
  user: testUser,
}

beforeEach(() => {
  render(<Blog blog={blog} user={testUser} />)
})

describe('Basic test', () => {
  test('renders title', () => {
    const title = screen.getByText('Component testing is done with react-testing-library')
    const author = screen.getByText('Teemu testaaja')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })
})