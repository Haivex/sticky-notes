/**
 * @jest-environment jsdom
 */
import { getAllByRole, getByText } from '@testing-library/dom';
import Title from '../value_objects/title';
import StickyNoteHeader from './sticky-note-header';

describe('render', () => {
  let header: StickyNoteHeader;
  let headerElement: HTMLElement;
  const title = Title.create('My title');
  const buttons: HTMLButtonElement[] = [];

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  buttons.push(editButton, removeButton);

  beforeEach(() => {
    header = StickyNoteHeader.create(title, buttons);
    headerElement = header.render();
  });

  test('should render title', () => {
    expect(getByText(headerElement, 'My title')).toBeTruthy();
  });

  test('should render two action buttons', () => {
    expect(getAllByRole(headerElement, 'button').length).toBe(2);
  });

  test('should render edit button', () => {
    expect(getByText(headerElement, 'Edit')).toBeTruthy();
  });

  test('should render remove button', () => {
    expect(getByText(headerElement, 'Remove')).toBeTruthy();
  });
});
