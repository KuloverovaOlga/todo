const todoForm = document.querySelector('.todo__input-box');
const btnBox = document.querySelector('.todo__btn-box');
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const tumbler = document.querySelector('.tumbler-wrapper');
const deliteCompliteBtn = document.querySelector('.todo__delite-done');

const listener = (e) => {
    let target = e.target;

    if (target.classList.contains('todo__check')) {
        if (target.parentElement.classList.contains('active')) {
            target.parentElement.classList.remove('active');
            target.parentElement.querySelector('.todo__item-btn--editing').removeAttribute('disabled');
            target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <circle cx="7.5" cy="7.5" r="7" />
                                </svg>`;
            target.parentElement.dataset.filter = 'uncompleted';
        } else {
            target.parentElement.classList.add('active');
            target.parentElement.querySelector('.todo__item-btn--editing').setAttribute('disabled', 'disabled');
            target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 19 15" fill="none">
                                    <path class="path1" d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" />
                                    <path class="path2" fill-rule="evenodd" clip-rule="evenodd" d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14ZM7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" />
                                    <path class="path3" fill-rule="evenodd" clip-rule="evenodd" d="M9.3339 9.55818L5.70614 5.21861L6.3848 4.46677L10.0126 8.80634L9.3339 9.55818Z" />
                                    <path class="path3" fill-rule="evenodd" clip-rule="evenodd" d="M18.2225 0.806147L9.37844 9.50953L8.78673 8.70338L17.6308 -2.92013e-08L18.2225 0.806147Z" fill="#095249"/>
                                </svg>`;
            target.parentElement.dataset.filter = 'completed';
        }
        saveLocalStoradge();
    }

    if (target.classList.contains('todo__item-btn--editing')) {
        let text = target.parentElement.querySelector('.todo__text');
        let input = target.parentElement.querySelector('.todo__text-input');

        text.style.display = 'none';
        input.style.display = 'block';
        input.value = text.textContent;
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.code == 'Enter') {
                if (input.value.length == 0) {
                    input.value = text.textContent;
                }

                text.textContent = input.value;
                input.style.display = 'none';
                text.style.display = 'block';

                saveLocalStoradge();
            }
        });

        input.addEventListener('blur', () => {

            if (input.value.length == 0) {
                input.value = text.textContent;
            }

            text.textContent = input.value;
            input.style.display = 'none';
            text.style.display = 'block';
            saveLocalStoradge();
        });
        saveLocalStoradge();
    }

    if (target.classList.contains('todo__item-btn--trash')) {
        target.parentElement.classList.add('opasity');
        target.parentElement.addEventListener('transitionend', () => {
            target.parentElement.remove();
            saveLocalStoradge();
        });
    }
    //     item.dataset.index = i;
    //     let start;
    //     let end;
    //     // item.addEventListener(
    //     //     'touchmove',
    //     //     () => {
    //     //         if(i<0) {
    //     //             todoList.insertBefore(items[i], items[0]);
    //     //         } else if(i>item.length) {
    //     //             todoList.insertBefore(items[i], items[item.length -1]);
    //     //         } else {
    //     //             todoList.insertBefore(items[i], items[i-1]);
    //     //         }

    //     //         console.log(items[i]);
    //     //         console.log(items[i - 1]);
    //     //     },
    //     //     { passive: 'true' }
    //     // );

    //     item.addEventListener('touchstart', (e) => {
    //         start = e.target.parentElement.dataset.index;
    //         console.log(start);
    //     });
    //     item.addEventListener('touchmove', (e) => {});
    //     item.addEventListener('touchend', (e) => {

    //         end = e.target.parentElement.dataset.index;
    //         console.log(end);
    //     });
    // });
};

const createTask = (e) => {
    e.preventDefault();

    if (todoInput.value.trim().length == '') {
        return;
    }

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__item');
    todoItem.dataset.filter = 'uncompleted';
    todoList.append(todoItem);

    const todoBtnCheck = document.createElement('button');
    todoBtnCheck.classList.add('todo__check');
    todoBtnCheck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7" />
                            </svg>`;
    todoItem.append(todoBtnCheck);

    const todoText = document.createElement('p');
    todoText.classList.add('todo__text');
    todoText.textContent = todoInput.value;
    todoItem.append(todoText);

    const todoTextInput = document.createElement('input');
    todoTextInput.classList.add('todo__text-input');
    todoTextInput.type = 'text';
    todoTextInput.classList.add('todo__text-input')  ;  
    todoTextInput.style.display = 'none';
    todoItem.append(todoTextInput);

    const todoBtnMove = document.createElement('button');
    todoBtnMove.classList.add('todo__item-btn');
    todoBtnMove.classList.add('todo__item-btn--move');
    todoBtnMove.setAttribute('draggable', 'true');
    todoBtnMove.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
    todoItem.append(todoBtnMove);

    const todoBtnEdit = document.createElement('button');
    todoBtnEdit.classList.add('todo__item-btn');
    todoBtnEdit.classList.add('todo__item-btn--editing');
    todoBtnEdit.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    todoItem.append(todoBtnEdit);

    const todoBtnTrash = document.createElement('button');
    todoBtnTrash.classList.add('todo__item-btn');
    todoBtnTrash.classList.add('todo__item-btn--trash');
    todoBtnTrash.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    todoItem.append(todoBtnTrash);

    saveLocalStoradge();
    todoInput.value = '';
    listener(e);
};

const filterTasks = (e) => {
    e.preventDefault();
    let target = e.target;
    const all = document.querySelector('#all');
    const completed = document.querySelector('#completed');
    const uncompleted = document.querySelector('#uncompleted');
    const todos = document.querySelectorAll('.todo__item');

    if (target === all) {
        all.classList.add('active');
        completed.classList.remove('active');
        uncompleted.classList.remove('active');
        todos.forEach((todo) => {
            todo.style.display = 'flex';
        });
    }

    if (target === completed) {
        all.classList.remove('active');
        completed.classList.add('active');
        uncompleted.classList.remove('active');
        todos.forEach((todo) => {
            if (todo.dataset.filter == 'completed') {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        });
    }

    if (target === uncompleted) {
        all.classList.remove('active');
        completed.classList.remove('active');
        uncompleted.classList.add('active');
        todos.forEach((todo) => {
            if (todo.dataset.filter !== 'completed') {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        });
    }
};

const saveLocalStoradge = () => {
    localStorage.setItem('data', todoList.innerHTML);
};

const saveColorTheme = () => {
    localStorage.setItem('theme', document.body.className);
}

const getLocalStoradge = () => {
    todoList.innerHTML = localStorage.getItem('data');
    if (todoList.innerHTML !== '') {
        todoList.addEventListener('click', listener);
    }
};

const getColorTheme = () => {
    document.body.className = localStorage.getItem('theme')
    document.body.style.transition = "none"

}

const moveStart = (e) => {
    e.target.parentElement.classList.add(`selected`);
};
const moveEnd = (e) => {
    e.target.parentElement.classList.remove(`selected`);
    saveLocalStoradge();
};

const moveOn = (e) => {
    // e.preventDefault();

    const activeElement = todoList.querySelector(`.selected`);
    const currentElement = e.target.parentElement;

    const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`todo__item`);

    if (!isMoveable) {
        return;
    }

    const nextElement = currentElement === activeElement.nextElementSibling ? currentElement.nextElementSibling : currentElement;

    todoList.insertBefore(activeElement, nextElement);
    saveLocalStoradge();
};

const tumblerClick = () => {
    document.body.classList.toggle('dark-theme');
    saveColorTheme()
};

const deliteCompliteTask = () => {
    const todos = document.querySelectorAll('.todo__item');

    if (todos.length == 0) {
        return
    }

    todos.forEach((todo) => {
        if (todo.dataset.filter == 'completed') {
            todo.remove();
        }
    });
    saveLocalStoradge()
}

getLocalStoradge();
getColorTheme()
todoForm.addEventListener('submit', createTask);
todoList.addEventListener('click', listener);
btnBox.addEventListener('click', filterTasks);
todoList.addEventListener('mousedown', moveStart);
todoList.addEventListener('mouseup', moveEnd);
todoList.addEventListener(`mousemove`, moveOn);
tumbler.addEventListener('click', tumblerClick);
deliteCompliteBtn.addEventListener('click', deliteCompliteTask);