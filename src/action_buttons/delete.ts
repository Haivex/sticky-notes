const button = document.createElement('button');
button.className = 'action_button';
const deleteIcon = document.createElement('i');
deleteIcon.classList.add('fas', 'fa-trash-alt');
button.title = 'Delete';
button.append(deleteIcon);
export default button;
