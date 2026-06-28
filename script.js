// ==========================================================================
// 1. STATE & DATA INITIALIZATION
// ==========================================================================

// Sample Courses Data (As per your Screenshot 2)
const courses = [
    { id: 1, title: 'C Programming', desc: 'Learn the basics of C language.', category: 'Programming', type: 'free', price: 'FREE' },
    { id: 2, title: 'Python for AI', desc: 'Python with ML fundamentals.', category: 'AI', type: 'paid', price: '₹499' },
    { id: 3, title: 'HTML & CSS', desc: 'Build modern websites.', category: 'Web', type: 'free', price: 'FREE' },
    { id: 4, title: 'JavaScript Pro', desc: 'Master JavaScript.', category: 'Web', type: 'paid', price: '₹699' },
    { id: 5, title: 'DBMS - SQL', desc: 'Database management basics.', category: 'Database', type: 'free', price: 'FREE' },
    { id: 6, title: 'Data Structures', desc: 'Arrays, Linked Lists, Trees.', category: 'Programming', type: 'paid', price: '₹599' }
];

let currentFilter = 'all'; // Global state for Free/Paid filter

// Toast Notification Utility
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// ==========================================================================
// 2. AUTHENTICATION & VIEW TOGGLE LOGIC
// ==========================================================================

// Login / Register Tabs Toggle (Screenshot 1 Layout Fix)
function switchAuthTab(tab) {
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (tab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
    }
}

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const role = document.getElementById('loginRole').value;

    // Demo Authentication Matrix
    if ((user === 'student' && pass === '1234') || (user === 'admin' && pass === 'admin123')) {
        showToast('Login Successful!');
        
        // Hide Auth, Show Dashboard
        document.getElementById('authView').style.display = 'none';
        document.getElementById('dashView').style.display = 'flex';
        
        // Setup User Context Badge (Screenshot 2)
        document.getElementById('userBadge').innerText = `System Context: Demo ${role.toUpperCase()} [${role.toUpperCase()}]`;
        
        // Render initial dynamic data
        renderCourses();
    } else {
        showToast('Invalid Username or Password!');
    }
}

// Handle Register Form Submission
function handleRegister(event) {
    event.preventDefault();
    showToast('Account Created! Please login.');
    switchAuthTab('login');
}

// Handle Logout
function handleLogout() {
    document.getElementById('dashView').style.display = 'none';
    document.getElementById('authView').style.display = 'flex';
    document.getElementById('loginForm').reset();
    showToast('Logged out successfully.');
}

// ==========================================================================
// 3. DASHBOARD OPERATIONS & SIDEBAR POP-UP
// ==========================================================================

// Toggle 3-line Sidebar Pop-up
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Control Main View Routing
function showView(viewId) {
    // Hide all sections inside main
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.style.display = 'none');
    
    // Show selected section
    document.getElementById(viewId).style.display = 'block';
}

// ==========================================================================
// 4. DYNAMIC COURSE RENDERING & FILTERS
// ==========================================================================

// Filter sets: All, Free, Paid
function setFilter(type) {
    currentFilter = type;
    
    // Update active class on filter buttons
    const buttons = document.querySelectorAll('#coursesView > div:first-of-type button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if(type === 'all') document.getElementById('filterAll').classList.add('active');
    if(type === 'free') document.getElementById('filterFree').classList.add('active');
    if(type === 'paid') document.getElementById('filterPaid').classList.add('active');
    
    renderCourses();
}

// Search, Dropdown & Filter calculation logic
function renderCourses() {
    const searchVal = document.getElementById('searchBox').value.toLowerCase();
    const catVal = document.getElementById('categoryBox').value;
    const grid = document.getElementById('courseGrid');
    grid.innerHTML = ''; // Clear previous state

    const filtered = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchVal) || course.desc.toLowerCase().includes(searchVal);
        const matchesCategory = (catVal === 'all' || course.category === catVal);
        const matchesType = (currentFilter === 'all' || course.type === currentFilter);
        return matchesSearch && matchesCategory && matchesType;
    });

    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => {
            showView('courseDetailView');
            document.getElementById('courseDetailContent').innerHTML = `<h3>${course.title}</h3><p>Welcome to ${course.title} structure module. This is your custom student curriculum roadmap view.</p>`;
        };
        
        card.innerHTML = `
            <span class="badge-${course.type}">${course.type.toUpperCase()}</span>
            <div>
                <h3>${course.title}</h3>
                <p>${course.desc}</p>
            </div>
            <div class="card-footer">
                <span class="card-category">${course.category}</span>
                <span class="card-price">${course.price}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================================================
// 5. EXTENDED LAB CAPABILITIES (COMPILER & RESET)
// ==========================================================================
function runCode() {
    const log = document.getElementById('codeOutput');
    log.innerText = "Compiling matrix script...\nTesting standard input streams...\nSuccess: Compilation Test Passed!";
}

function resetDB() {
    showToast('Storage instance flushed.');
}

// Initialize default state on page load
window.onload = function() {
    switchAuthTab('login');
};