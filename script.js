// User Authentication
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Form Validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Password Strength
function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.password-strength');
    if(!strengthBar) return;
    
    const strength = password.length > 10 ? 100 : password.length * 10;
    strengthBar.style.width = `${strength}%`;
    strengthBar.style.background = strength > 70 ? '#2ecc71' : strength > 40 ? '#f1c40f' : '#e74c3c';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Password strength indicator
    document.getElementById('signup-password')?.addEventListener('input', (e) => {
        updatePasswordStrength(e.target.value);
    });

    // Navigation hover effects
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });
});

// Auth Functions
function login() {
    const identifier = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => 
        (u.email === identifier || u.mobile === identifier) && 
        u.password === password
    );
    
    if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showPopup('Login successful! Redirecting...', true);
        setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
        showPopup('Invalid credentials!', false);
    }
}

function signup() {
    const userData = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        mobile: document.getElementById('signup-mobile').value,
        password: document.getElementById('signup-password').value
    };

    if(!validateEmail(userData.email)) {
        showPopup('Please enter a valid email address!', false);
        return;
    }

    if(!validateMobile(userData.mobile)) {
        showPopup('Mobile number must be 10 digits!', false);
        return;
    }

    if(!validatePassword(userData.password)) {
        showPopup('Password must be at least 8 characters!', false);
        return;
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    showPopup('Account created successfully! Redirecting...', true);
    setTimeout(() => window.location.href = 'login.html', 2000);
}

// UI Functions
function showPopup(message, isSuccess) {
    const popup = document.createElement('div');
    popup.className = `popup ${isSuccess ? 'success' : 'error'}`;
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">OK</button>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

// Confetti Animation
function createConfetti() {
    for(let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        document.body.appendChild(confetti);
    }
}
// Inside your existing generateSeatLayout() function
function generateSeatLayout() {
    const seatMap = document.querySelector('.seat-map');
    const selectedBus = JSON.parse(localStorage.getItem('selectedBus'));
    
    // Clear existing classes
    seatMap.className = 'seat-map';
    
    // Add layout class based on bus type
    if (selectedBus.type.includes('seater')) {
        seatMap.classList.add('seater-layout');
    } else if (selectedBus.type.includes('sleeper')) {
        seatMap.classList.add('sleeper-layout');
    }
    
    // Rest of your seat generation code
    const layout = selectedBus.seatLayout;
    for(let row = 1; row <= layout.rows; row++) {
        const seatRow = document.createElement('div');
        seatRow.className = 'seat-row';
        
        // Left seats
        const leftGroup = createSeatGroup(row, 1, layout.passageAfter);
        seatRow.appendChild(leftGroup);
        
        // Passage
        const passage = document.createElement('div');
        passage.className = 'passage';
        seatRow.appendChild(passage);
        
        // Right seats
        const rightGroup = createSeatGroup(row, layout.passageAfter + 1, layout.cols);
        seatRow.appendChild(rightGroup);
        
        seatMap.appendChild(seatRow);
    }
}

// Example bus objects
const mockBuses = [
    {
        id: 1,
        name: "Express Seater",
        type: ["ac", "seater"], // ← Important
        seatLayout: { rows: 10, cols: 4, passageAfter: 2 }
    },
    {
        id: 2,
        name: "Luxury Sleeper",
        type: ["sleeper"], // ← Important
        seatLayout: { rows: 8, cols: 3, passageAfter: 1 }
    }
];

function createSeatGroup(row, start, end) {
    const group = document.createElement('div');
    group.className = 'seat-group';
    
    for(let col = start; col <= end; col++) {
        const seatNumber = (row - 1) * selectedBus.seatLayout.cols + col;
        const seat = document.createElement('div');
        seat.className = `seat ${Math.random() < 0.3 ? 'unavailable' : 'available'}`;
        seat.textContent = seatNumber;
        seat.dataset.price = calculateSeatPrice(seatNumber);
        
        if(!seat.classList.contains('unavailable')) {
            seat.addEventListener('click', () => toggleSeatSelection(seatNumber));
        }
        
        group.appendChild(seat);
    }
    return group;
}

function calculateSeatPrice(seatNumber) {
    // Premium pricing for front rows
    const row = Math.ceil(seatNumber / selectedBus.seatLayout.cols);
    return row <= 3 ? selectedBus.fare * 1.2 : selectedBus.fare;
}

const selectedBus = JSON.parse(localStorage.getItem('selectedBus'));
let selectedSeats = [];
let totalFare = 0;

function renderSeats() {
    const seatsGrid = document.querySelector('.seats-grid');
    seatsGrid.innerHTML = '';

    for (let i = 1; i <= selectedBus.seats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat available';
        seat.textContent = i;
        seat.addEventListener('click', () => toggleSeatSelection(i));
        seatsGrid.appendChild(seat);
    }
}

function toggleSeatSelection(seatNumber) {
    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1) {
        selectedSeats.push(seatNumber);
        totalFare += selectedBus.fare;
    } else {
        selectedSeats.splice(index, 1);
        totalFare -= selectedBus.fare;
    }
    updateSummary();
}

function updateSummary() {
    document.getElementById('selected-seats').textContent = selectedSeats.join(', ');
    document.getElementById('total-fare').textContent = totalFare;
}

document.getElementById('proceed-to-payment').addEventListener('click', () => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('totalFare', JSON.stringify(totalFare));
    window.location.href = 'payment.html';
});

// Initial render
renderSeats();

// Add seat selection functionality
document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('click', () => {
        if(!seat.classList.contains('unavailable')) {
            seat.classList.toggle('selected');
            updateBookingSummary();
        }
    });
});

function updateBookingSummary() {
    const selected = document.querySelectorAll('.seat.selected');
    let total = 0;
    
    selected.forEach(seat => {
        total += parseInt(seat.dataset.price);
    });
    
    document.getElementById('total-price').textContent = total;
}

// Add to existing script.js
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat')) {
      const seat = e.target;
      if(!seat.classList.contains('unavailable')) {
        seat.classList.toggle('selected');
        updateBookingSummary();
      }
    }
  });
  
  function updateBookingSummary() {
    const selected = document.querySelectorAll('.seat.selected');
    const capacity = document.querySelector('.seat-map').dataset.capacity;
    
    document.querySelector('.selected-seats-list').innerHTML = 
      [...selected].map(seat => seat.textContent).join(', ');
      
    document.querySelector('h3').innerHTML = 
      `Selected Seats (${selected.length}/${capacity})`;
  }
