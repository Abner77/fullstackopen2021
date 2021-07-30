/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe ('exercise 5.16', () => {
  test('check, that the form calls the event handler it received as props with the right details when a new blog is created.', () => {
    const mockcreateeBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={mockcreateeBlog} />
    )

    const inputtitle = component.getByTestId('title')
    const inputurl = component.getByTestId('url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputtitle, {
      target: { value: 'blog title' }
    })
    fireEvent.change(inputurl, {
      target: { value: 'www.google.es' }
    })
    fireEvent.submit(form)

    expect(mockcreateeBlog.mock.calls).toHaveLength(1)

    const objRef = { title: 'blog title', url: 'www.google.es' }
    expect(mockcreateeBlog.mock.calls[0][0]).toEqual( objRef)
  })
})