import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


// blog: PropTypes.object.isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired


describe('<Blog />', () => {
  test('only blog title and author are displayed by default', () => {
    const blog = {
      title: 'This is a title',
      author: 'Eric Blair',
      url: 'www.aol.com',
      likes: 84,
      
    }

    const mockUser = {
      username: 'username',
      name: 'name'
    }

    const component = render(
      <Blog
        blog={blog}
        user={mockUser}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    )

    const infoDiv = component.container.querySelector(".blog-title");
    expect(infoDiv).toBeVisible;
  
    fireEvent.click(component.container);
  
    const blogInfo = component.container.querySelector(".blog-info");
  
    expect(blogInfo).toBeVisible;
  }) //end of test

  test('like button is clicked twice, the event handler the component received as props is called twice', () => {
    const blog = {
      title: 'This is a title',
      author: 'Eric Blair',
      url: 'www.aol.com',
      likes: 84,
      
    }

    const mockUser = {
      username: 'username',
      name: 'name'
    }

    const clickMock = jest.fn()

    const component = render(
      <Blog
        blog={blog}
        user={mockUser}
        handleLike={clickMock}
        handleDelete={() => {}}
      />
    )

  const button = component.container.querySelector(".blog-like")

  fireEvent.click(button)
  fireEvent.click(button)

  expect(clickMock.mock.calls.length).toBe(2)
  }) //end of test
}) //end of desc