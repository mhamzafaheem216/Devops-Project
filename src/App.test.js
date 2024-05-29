
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the to-do list title', () => {
  render(<App />);
  const linkElement = screen.getByText(/To-Do List/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders input box', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new to-do/i);
  expect(inputElement).toBeInTheDocument();
});

test('adds a new to-do item', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new to-do/i);
  const addButton = screen.getByText(/Add/i);

  fireEvent.change(inputElement, { target: { value: 'Test To-Do' } });
  fireEvent.click(addButton);

  const todoElement = screen.getByText(/Test To-Do/i);
  expect(todoElement).toBeInTheDocument();
});

test('clears input box after adding a to-do', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new to-do/i);
  const addButton = screen.getByText(/Add/i);

  fireEvent.change(inputElement, { target: { value: 'Test To-Do' } });
  fireEvent.click(addButton);

  expect(inputElement.value).toBe('');
});

test('does not add an empty to-do', () => {
  render(<App />);
  const addButton = screen.getByText(/Add/i);

  fireEvent.click(addButton);

  const todoElements = screen.queryAllByRole('listitem');
  expect(todoElements.length).toBe(0);
});
