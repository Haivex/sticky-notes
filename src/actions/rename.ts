const button = document.createElement('button');
button.className = 'action_button';
const renameIcon = document.createElement('i');
renameIcon.classList.add('fas', 'fa-pencil-alt');
button.title = 'Rename';
button.append(renameIcon);
export default button;
