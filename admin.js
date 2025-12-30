// Supabase Configuration
const SUPABASE_URL = 'https://fgpdpafbshjmhttifpca.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncGRwYWZic2hqbWh0dGlmcGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMTk3MTQsImV4cCI6MjA4MjU5NTcxNH0.wb41WdgZmyZXT7tsToSegmr13BGdXItJnw1Q3mrT7Aw';

// Initialize Supabase
let supabase;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        console.error('Supabase not loaded');
    }
} catch (e) {
    console.error('Init error:', e);
}

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const reservationsTable = document.getElementById('reservationsBody');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('emptyState');

// Auth State Check
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        showDashboard();
    } else {
        showLogin();
    }
});

// Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');

    btn.disabled = true;
    btn.textContent = 'Signing in...';
    loginError.textContent = '';

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        showDashboard();
    } catch (err) {
        loginError.textContent = err.message;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Sign In';
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    showLogin();
});

// Refresh Handler
document.getElementById('refreshBtn').addEventListener('click', fetchReservations);

// UI Switchers
function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    fetchReservations();
}

// Stats Calculation
function updateStats(reservations) {
    const total = reservations.length;
    const pending = reservations.filter(r => r.status === 'pending').length;
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;

    // Check for today's reservations
    const today = new Date().toISOString().split('T')[0];
    const todays = reservations.filter(r => r.reservation_date === today).length;

    document.getElementById('totalStats').textContent = total;
    document.getElementById('pendingStats').textContent = pending;
    document.getElementById('confirmedStats').textContent = confirmed;
    document.getElementById('todayStats').textContent = todays;
}

// Fetch Reservations
async function fetchReservations() {
    loadingDiv.classList.remove('hidden');
    reservationsTable.innerHTML = '';
    emptyState.classList.add('hidden');

    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .order('reservation_date', { ascending: false })
            .order('reservation_time', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
            renderTable(data);
            updateStats(data);
        } else {
            emptyState.classList.remove('hidden');
            updateStats([]);
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        loadingDiv.textContent = 'Error loading data: ' + err.message;
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Render Table
function renderTable(reservations) {
    reservationsTable.innerHTML = reservations.map(r => `
        <tr data-id="${r.id}">
            <td>
                <span class="status-badge status-${r.status}">${r.status}</span>
            </td>
            <td>
                <div>${r.reservation_date}</div>
                <div style="font-size: 0.9em; color: #a0a0a0">${r.reservation_time.slice(0, 5)}</div>
            </td>
            <td>
                <strong>${sanitize(r.customer_name)}</strong>
                <div style="font-size: 0.9em; color: #a0a0a0">${sanitize(r.customer_email)}</div>
            </td>
            <td>${r.party_size} people</td>
            <td>${sanitize(r.customer_phone)}</td>
            <td>${sanitize(r.special_requests || '-')}</td>
            <td>
                ${r.status === 'pending' ? `
                    <button onclick="updateStatus('${r.id}', 'confirmed')" class="action-btn btn-confirm">Confirm</button>
                    <button onclick="updateStatus('${r.id}', 'cancelled')" class="action-btn btn-cancel">Cancel</button>
                ` : ''}
                ${r.status === 'confirmed' ? `
                    <button onclick="updateStatus('${r.id}', 'cancelled')" class="action-btn btn-cancel">Cancel</button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// Update Status
window.updateStatus = async (id, newStatus) => {
    try {
        const { error } = await supabase
            .from('reservations')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) throw error;

        // Refresh data
        fetchReservations();
    } catch (err) {
        alert('Error updating status: ' + err.message);
    }
};

// Security check
function sanitize(str) {
    if (!str) return '';
    return str.replace(/[<>]/g, '');
}
