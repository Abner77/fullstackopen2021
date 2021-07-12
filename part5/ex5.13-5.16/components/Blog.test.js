/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


describe('exercise 5.13', () => {
  test('renders initial content (title, author showing, url and likes, hidden)', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'http://www.google.es',
      likes: 3
    }
    const author = {
      name:'David'
    }

    const component = render(
      <Blog blog={blog} author={author} />
    )

    // method 1
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.getByTestId('divcontraido')).not.toHaveStyle('display: none')
    expect(component.getByTestId('divexpandido')).toHaveStyle('display: none')
  })
})


describe ('exercise 5.14', () => {
  test('checks the url and likes are displayed when button view is clicked', () => {

    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'http://www.google.es',
      likes: 3
    }
    const author = {
      name:'David'
    }

    const component = render(
      <Blog blog={blog} author={author} />
    )

    const buttonview = component.getByText('view')
    fireEvent.click(buttonview)
    expect(component.getByTestId('divexpandido')).not.toHaveStyle('display: none')
  })
})

describe ('exercise 5.15', () => {
  test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', () => {

    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'http://www.google.es',
      likes: 3
    }
    const author = {
      name:'David'
    }

    const mockfn = jest.fn()

    const component = render(
      <Blog blog={blog} author={author} updateHandler={mockfn} />
    )

    const buttlike = component.getByText('like')
    fireEvent.click(buttlike)
    fireEvent.click(buttlike)

    expect(mockfn.mock.calls).toHaveLength(2)
  })
})
