
const userList = document.getElementById('userList');
const messageDiv = document.getElementById('message');


async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Kullanıcılar alınamadı!');
        const users = await response.json();

        
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${user.name}</span>
                <button data-id="${user.id}">Sil</button>
            `;
            const deleteButton = li.querySelector('button');
            deleteButton.addEventListener('click', () => deleteUser(user.id, li));
            userList.appendChild(li);
        });
    } catch (error) {
        showMessage("Kullanıcılar alınırken bir hata oluştu!", "error");
        console.error(error);
    }
}


async function deleteUser(userId, listItem) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/${userId}', {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Kullanıcı silinemedi!');

       
        userList.removeChild(listItem);
        showMessage("Kullanıcı başarıyla silindi!", "success");
    } catch (error) {
        showMessage("Kullanıcı silinirken bir hata oluştu!", "error");
        console.error(error);
    }
}


function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.style.color = type === "success" ? "green" : "red";

    
    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}


document.addEventListener('DOMContentLoaded', fetchUsers);