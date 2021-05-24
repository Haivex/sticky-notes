const button = document.createElement('button');
button.className = 'action_button';
const editIcon = document.createElement('i');
editIcon.classList.add('fas', 'fa-list');
button.title = 'Edit';
button.append(editIcon);
export default button;
