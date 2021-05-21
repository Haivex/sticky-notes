/**
 * @jest-environment jsdom
 */
import { getAllByRole, getByText } from '@testing-library/dom';
import Title from '../value_objects/title';
import StickyNoteHeader from './sticky-note-header';

describe('render', () => {
  let header: StickyNoteHeader;
  const title = Title.create('My title');
  const buttons: HTMLButtonElement[] = [];

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  buttons.push(editButton, removeButton);

  beforeEach(() => {
    header = StickyNoteHeader.create(title, buttons);
  });

  test('should render title', () => {
    const element = header.render();
    expect(getByText(element, 'My title')).toBeTruthy();
  });

  test('should render two action buttons', () => {
    const element = header.render();
    expect(getAllByRole(element, 'button').length).toBe(2);
  });

  test('should render edit button', () => {
    const element = header.render();
    expect(getByText(element, 'Edit')).toBeTruthy();
  });

  test('should render remove button', () => {
    const element = header.render();
    expect(getByText(element, 'Remove')).toBeTruthy();
  });
});
