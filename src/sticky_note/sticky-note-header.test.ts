/**
 * @jest-environment jsdom
 */
import { getAllByRole, getByText } from '@testing-library/dom';
import Title from '../value_objects/title';
import StickyNoteHeader from './sticky-note-header';
import StickyNoteMediator from './sticky-note-mediator';

const title = Title.create('My title');
const newTitle = Title.create('New title');

describe('render', () => {
  let header: StickyNoteHeader;
  let headerElement: HTMLElement;
  const buttons: HTMLButtonElement[] = [];

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  buttons.push(editButton, removeButton);

  beforeAll(() => {
    header = StickyNoteHeader.create(title, new StickyNoteMediator(), buttons);
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

describe('getTitle', () => {
  test('should return title', () => {
    const header = StickyNoteHeader.create(title, new StickyNoteMediator());
    expect(header.getTitle().value).toBe('My title');
  });
});

describe('changeTitle', () => {
  test('should return new title', () => {
    const header = StickyNoteHeader.create(title, new StickyNoteMediator());
    expect(header.changeTitle(newTitle).value).toBe('New title');
  });

  test('should render new title', () => {
    const header = StickyNoteHeader.create(title, new StickyNoteMediator());
    header.changeTitle(newTitle);
    const headerElement = header.render();

    expect(getByText(headerElement, 'New title')).toBeTruthy();
  });
});
