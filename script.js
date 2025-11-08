// Datos iniciales y funciones de almacenamiento
const STORAGE_USERS = 'forum_users';
const STORAGE_POSTS = 'forum_posts';
const STORAGE_CURRENT_USER = 'forum_current_user';

// Inicializar datos pre-determinados
function initializeData() {
    // Verificar si ya existen posts
    if (!localStorage.getItem(STORAGE_POSTS)) {
        const defaultPosts = [
            {
                id: 1,
                title: "¿Cuál es tu Quirk favorito?",
                content: "Hola a todos! Me encanta discutir sobre los diferentes Quirks en My Hero Academia. Personalmente, mi favorito es el One For All de Midoriya, pero también me encanta el Half-Cold Half-Hot de Todoroki. ¿Cuál es el vuestro y por qué?",
                author: "FanAnime2024",
                image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=400&fit=crop",
                date: new Date('2024-01-15').toISOString(),
                comments: [
                    { id: 1, author: "ProHero", text: "Definitivamente el Explosion de Bakugo! Es increíblemente poderoso.", date: new Date('2024-01-15').toISOString() },
                    { id: 2, author: "MHAFan", text: "Yo prefiero el Zero Gravity de Uraraka, es muy útil y creativo.", date: new Date('2024-01-16').toISOString() }
                ]
            },
            {
                id: 2,
                title: "Teorías sobre el final de la serie",
                content: "He estado pensando mucho sobre cómo podría terminar My Hero Academia. ¿Creen que Midoriya logrará convertirse en el número uno? ¿Qué pasará con All For One? Compartan sus teorías!",
                author: "TheoryMaster",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
                date: new Date('2024-01-20').toISOString(),
                comments: [
                    { id: 1, author: "FanAnime2024", text: "Creo que sí, pero al final todos los héroes trabajarán juntos.", date: new Date('2024-01-20').toISOString() }
                ]
            },
            {
                id: 3,
                title: "Los mejores momentos de All Might",
                content: "All Might es sin duda uno de los mejores personajes. Desde su primera aparición salvando a Midoriya hasta sus batallas épicas contra All For One. ¿Cuál fue su momento favorito con All Might?",
                author: "AllMightFan",
                image: "https://images.unsplash.com/photo-1534809027769-b00d750d6abd?w=800&h=400&fit=crop",
                date: new Date('2024-02-01').toISOString(),
                comments: [
                    { id: 1, author: "HeroLover", text: "Cuando dijo 'Plus Ultra' por primera vez, me emocioné muchísimo!", date: new Date('2024-02-01').toISOString() },
                    { id: 2, author: "MHAFan", text: "Su batalla final contra All For One fue épica, aunque triste.", date: new Date('2024-02-02').toISOString() }
                ]
            },
            {
                id: 4,
                title: "Análisis: La evolución de Bakugo",
                content: "Bakugo ha tenido uno de los desarrollos de personaje más interesantes. De ser un bully arrogante a convertirse en un verdadero héroe que aprende a trabajar en equipo. ¿Qué opinan de su evolución?",
                author: "CharacterAnalyst",
                image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=400&fit=crop",
                date: new Date('2024-02-10').toISOString(),
                comments: [
                    { id: 1, author: "FanAnime2024", text: "Estoy de acuerdo, su desarrollo es impresionante. Realmente crece como persona.", date: new Date('2024-02-10').toISOString() }
                ]
            },
            {
                id: 5,
                title: "¿Quién es el mejor maestro de la UA?",
                content: "Tenemos muchos maestros increíbles: Aizawa, All Might, Present Mic, Midnight... Cada uno tiene su estilo único de enseñanza. ¿Cuál creen que es el mejor maestro y por qué?",
                author: "StudentUA",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
                date: new Date('2024-02-15').toISOString(),
                comments: [
                    { id: 1, author: "AllMightFan", text: "Aizawa es el mejor! Es estricto pero realmente se preocupa por sus estudiantes.", date: new Date('2024-02-15').toISOString() },
                    { id: 2, author: "TheoryMaster", text: "All Might tiene una conexión especial con los estudiantes, especialmente con Midoriya.", date: new Date('2024-02-16').toISOString() }
                ]
            }
        ];
        localStorage.setItem(STORAGE_POSTS, JSON.stringify(defaultPosts));
    }

    // Inicializar usuarios si no existen
    if (!localStorage.getItem(STORAGE_USERS)) {
        localStorage.setItem(STORAGE_USERS, JSON.stringify([]));
    }
}

// Funciones de usuario
function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    
    // Verificar si el usuario ya existe
    if (users.find(u => u.username === username)) {
        return false;
    }

    const newUser = {
        id: Date.now(),
        username,
        email,
        password // En producción, esto debería estar hasheado
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    return true;
}

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify({ username: user.username, id: user.id }));
        return true;
    }
    return false;
}

function getCurrentUser() {
    const userData = localStorage.getItem(STORAGE_CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
}

function logout() {
    localStorage.removeItem(STORAGE_CURRENT_USER);
    window.location.reload();
}

// Funciones de posts
function getPosts() {
    return JSON.parse(localStorage.getItem(STORAGE_POSTS) || '[]');
}

function addPost(title, content, imageUrl) {
    const user = getCurrentUser();
    if (!user) return false;

    const posts = getPosts();
    const newPost = {
        id: Date.now(),
        title,
        content,
        author: user.username,
        image: imageUrl || '',
        date: new Date().toISOString(),
        comments: []
    };

    posts.unshift(newPost);
    localStorage.setItem(STORAGE_POSTS, JSON.stringify(posts));
    return true;
}

function addComment(postId, text) {
    const user = getCurrentUser();
    if (!user) return false;

    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return false;

    const newComment = {
        id: Date.now(),
        author: user.username,
        text,
        date: new Date().toISOString()
    };

    post.comments.push(newComment);
    localStorage.setItem(STORAGE_POSTS, JSON.stringify(posts));
    return true;
}

// Funciones de UI
function updateUI() {
    const user = getCurrentUser();
    const userInfo = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    const newPostBtn = document.getElementById('newPostBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');

    if (user) {
        userInfo.style.display = 'flex';
        authButtons.style.display = 'none';
        newPostBtn.style.display = 'block';
        usernameDisplay.textContent = `👤 ${user.username}`;
    } else {
        userInfo.style.display = 'none';
        authButtons.style.display = 'flex';
        newPostBtn.style.display = 'none';
    }
}

function renderPosts() {
    const posts = getPosts();
    const container = document.getElementById('postsContainer');
    
    if (posts.length === 0) {
        container.innerHTML = '<p>No hay publicaciones aún. ¡Sé el primero en publicar!</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <h3>${escapeHtml(post.title)}</h3>
                <div class="post-meta">
                    Por ${escapeHtml(post.author)} • ${formatDate(post.date)}
                </div>
            </div>
            <div class="post-body">
                ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" class="post-image" onerror="this.style.display='none'">` : ''}
                <div class="post-content">${escapeHtml(post.content)}</div>
            </div>
            <div class="comments-section">
                <h4>Comentarios (${post.comments.length})</h4>
                <div id="comments-${post.id}" class="comments-list">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <div class="comment-author">${escapeHtml(comment.author)}</div>
                            <div class="comment-text">${escapeHtml(comment.text)}</div>
                            <small style="color: #999; font-size: 12px;">${formatDate(comment.date)}</small>
                        </div>
                    `).join('')}
                </div>
                <div class="comment-form">
                    <textarea id="comment-${post.id}" placeholder="Escribe un comentario..." rows="2"></textarea>
                    <button class="btn-primary" onclick="submitComment(${post.id})">Comentar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showNewPostForm() {
    document.getElementById('newPostForm').style.display = 'block';
    document.getElementById('newPostBtn').style.display = 'none';
}

function hideNewPostForm() {
    document.getElementById('newPostForm').style.display = 'none';
    document.getElementById('newPostBtn').style.display = 'block';
    document.getElementById('newPostForm').querySelector('form').reset();
}

function createPost(event) {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para publicar');
        window.location.href = 'login.html';
        return;
    }

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const image = document.getElementById('postImage').value;

    if (addPost(title, content, image)) {
        hideNewPostForm();
        renderPosts();
    } else {
        alert('Error al crear la publicación');
    }
}

function submitComment(postId) {
    const user = getCurrentUser();
    if (!user) {
        alert('Debes iniciar sesión para comentar');
        window.location.href = 'login.html';
        return;
    }

    const commentInput = document.getElementById(`comment-${postId}`);
    const text = commentInput.value.trim();

    if (!text) {
        alert('El comentario no puede estar vacío');
        return;
    }

    if (addComment(postId, text)) {
        commentInput.value = '';
        renderPosts();
    } else {
        alert('Error al agregar el comentario');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Hace unos momentos';
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (days < 7) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    return date.toLocaleDateString('es-ES');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicializar cuando se carga la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeData();
        if (document.getElementById('postsContainer')) {
            updateUI();
            renderPosts();
        }
    });
} else {
    initializeData();
    if (document.getElementById('postsContainer')) {
        updateUI();
        renderPosts();
    }
}

// Exportar funciones para uso en otros archivos
window.loginUser = loginUser;
window.registerUser = registerUser;
window.logout = logout;

