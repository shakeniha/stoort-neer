// Загружаем данные из localStorage или создаём пустой массив
const usersDatabase = JSON.parse(localStorage.getItem('usersDatabase')) || [];

// Логин
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Ищем пользователя в базе
    const user = usersDatabase.find(user => user.username === username);

    if (user && user.password === password) {
        showMessage(`Welcome back, ${username}!`, 'success');
        localStorage.setItem('username', username); // Сохраняем текущего пользователя
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        setTimeout(() => {
            window.location.href = 'appropriate name with extension.html'; // Замените на нужный файл
        }, 2000);
    } else if (user) {
        showMessage('Incorrect password. Please try again.', 'danger');
    } else {
        showMessage('User not found. Please register.', 'warning');
    }
});

// Регистрация
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const newUsername = document.getElementById('register-username').value;
    const newPassword = document.getElementById('register-password').value;

    // Проверка на минимальную длину пароля и наличие хотя бы одной буквы
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/; // Минимум 8 символов, включая хотя бы одну букву

    if (!passwordRegex.test(newPassword)) {
        showMessage('Password must be at least 8 characters long and contain at least one letter.', 'danger');
        return; // Прерываем выполнение, если пароль не соответствует требованиям
    }

    // Проверяем, существует ли пользователь
    if (usersDatabase.find(user => user.username === newUsername)) {
        showMessage('User already exists. Try logging in.', 'warning');
    } else {
        // Добавляем пользователя в базу
        usersDatabase.push({ username: newUsername, password: newPassword });
        localStorage.setItem('usersDatabase', JSON.stringify(usersDatabase)); // Сохраняем базу в localStorage
        showMessage(`User ${newUsername} successfully registered! Please log in.`, 'success');
        document.getElementById('login-username').value = newUsername; // Автоматически вставляем логин
        document.getElementById('register-username').value = '';
        document.getElementById('register-password').value = '';
    }
});

// Сообщения пользователю
function showMessage(message, type) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.className = `alert alert-${type} text-center mb-4`;
    messageBox.style.display = 'block';

    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}
