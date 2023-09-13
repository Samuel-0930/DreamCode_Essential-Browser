const input = document.querySelector('input');
const add = document.querySelector('.plus');
const lists = document.querySelector('.lists');
const list = document.querySelector('.list');
const remove = document.querySelector('.remove_all');
function add_context() {
	const list = document.createElement('li');
	const image = document.createElement('img');
	list.setAttribute('class', 'list');
	image.setAttribute('class', 'list__image--delete');
	image.src = 'img/trash can.png';
	list.textContent = input.value;
	lists.appendChild(list);
	list.appendChild(image);
	input.value = null;
}
function show_name(e) {
	if (e.keyCode == 13) {
		add_context();
	}
}

function add_value() {
	add_context();
}

function remove_all() {
	list.remove();
}
