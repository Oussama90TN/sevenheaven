// Service Menu Data (from PDF) - Prices hidden from staff, only admin can set custom prices
const servicesData = {
    "Massage Treatment": [
        { name: "Swedish", duration: 60 },
        { name: "Thai", duration: 60 },
        { name: "Swe-Thai", duration: 60 },
        { name: "Candle Oil Massage", duration: 60 },
        { name: "Slimming Anti-Cellulite", duration: 60 },
        { name: "Lymphatic Drainage", duration: 60 },
        { name: "Pregnant", duration: 60 },
        { name: "Scalp", duration: 15 },
        { name: "Hands & Feet", duration: 15 },
        { name: "Neck", duration: 15 },
        { name: "Shoulders", duration: 15 },
        { name: "Back Massage", duration: 15 },
        { name: "Feet Massage", duration: 10 },
        { name: "Hand Massage", duration: 10 },
        { name: "Candle Oil Massage (Hands Or Feet)", duration: 15 }
    ],
    "Hands & Feet Care": [
        { name: "Cleaning + filing / hands", duration: 30 },
        { name: "Cleaning + filing / feet", duration: 30 },
        { name: "Shaping", duration: 20 },
        { name: "Polish", duration: 20 },
        { name: "Gel Color Polish", duration: 45 },
        { name: "Gel Color Removal", duration: 30 },
        { name: "Paraffin Hands", duration: 30 },
        { name: "Paraffin Feet", duration: 30 },
        { name: "Kids Mani + Pedi", duration: 40 },
        { name: "Extra Care Time", duration: 30 },
        { name: "Jelly Hands Treatment", duration: 45 },
        { name: "Jelly Feet Treatment", duration: 45 }
    ],
    "Waxing": [
        { name: "Underarms", duration: 15 },
        { name: "Fingers/Toes", duration: 15 },
        { name: "Tummy", duration: 20 },
        { name: "Head to Toe", duration: 120 },
        { name: "Upper Lip", duration: 10 },
        { name: "Bikini", duration: 30 },
        { name: "Chest", duration: 20 },
        { name: "Arms", duration: 30 },
        { name: "Legs", duration: 45 },
        { name: "Full Face", duration: 30 },
        { name: "Back", duration: 30 }
    ],
    "Facial Sessions": [
        { name: "Deep Cleansing", duration: 60 },
        { name: "Hydra Facial", duration: 60 },
        { name: "Exfoliating", duration: 75 },
        { name: "Express Facial", duration: 30 },
        { name: "Glow Facial", duration: 45 },
        { name: "Eyeboost", duration: 30 }
    ],
    "Hair Treatment": [
        { name: "Hair Treatment / Caviar", duration: 60 },
        { name: "Hair Mask", duration: 45 },
        { name: "Hair Dye & Blow Dry", duration: 90 }
    ],
    "Packages": [
        { name: "Graduation Package", duration: 120 },
        { name: "Birthday Package", duration: 150 },
        { name: "Bridal Package", duration: 180 }
    ],
    "Add-Ons": [
        { name: "Flowers", duration: 0 },
        { name: "Cake", duration: 0 },
        { name: "Chocolate", duration: 0 },
        { name: "Balloons", duration: 0 },
        { name: "Candles", duration: 0 },
        { name: "Spa Pedicure Mix", duration: 0 }
    ]
};

// Equipment checklist for different service types
const equipmentChecklists = {
    "Massage Treatment": ["Massage bed/mat", "Towels", "Oils", "Music player", "Aromatherapy"],
    "Hands & Feet Care": ["Nail kit", "Polish collection", "Towels", "Bowl", "Sanitizer"],
    "Waxing": ["Wax warmer", "Wax strips", "Towels", "Pre/post wax products", "Gloves"],
    "Facial Sessions": ["Facial bed", "Steamer", "Products", "Towels", "Headband"],
    "Hair Treatment": ["Hair products", "Towels", "Hair dryer", "Brushes", "Gloves"],
    "Packages": ["All required items per package", "Decorations", "Surprise items"],
    "Add-Ons": ["Decoration items", "Presentation materials"]
};

// Demo Users
const demoUsers = [
    { username: "admin", password: "admin123", role: "admin", name: "Admin User" },
    { username: "sara", password: "staff123", role: "staff", name: "Sara Ahmed", phone: "+974-1234-5678", specialization: "Massage & Facial", active: true },
    { username: "fatima", password: "staff123", role: "staff", name: "Fatima Ali", phone: "+974-2345-6789", specialization: "Nails & Waxing", active: true },
    { username: "aisha", password: "staff123", role: "staff", name: "Aisha Hassan", phone: "+974-3456-7890", specialization: "Hair Treatment", active: true }
];

// Initialize App
function initializeApp() {
    // Initialize users if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(demoUsers));
    }
    
    // Initialize bookings if not exists
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    
    // Initialize demo bookings
    createDemoBookings();
    
    // Load services into select
    loadServicesSelect();
    
    // Setup event listeners
    setupEventListeners();
}

function createDemoBookings() {
    const bookings = getBookings();
    if (bookings.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const demoBookings = [
            {
                id: Date.now() + 1,
                customerName: "Noura Al-Thani",
                customerPhone: "+974-5555-1234",
                customerAddress: "Villa 23, Street 45, Zone 51",
                area: "West Bay",
                locationLink: "https://maps.google.com/?q=25.3548,51.5310",
                date: today.toISOString().split('T')[0],
                time: "10:00",
                service: "Swedish",
                category: "Massage Treatment",
                duration: 60,
                price: 400,
                staff: ["Sara Ahmed"],
                uberTime: 20,
                paymentStatus: "paid",
                paymentMethod: "card",
                notes: "Client prefers light pressure",
                completed: false,
                equipmentChecked: false
            },
            {
                id: Date.now() + 2,
                customerName: "Maryam Abdullah",
                customerPhone: "+974-5555-5678",
                customerAddress: "Tower B, Apt 1203, The Pearl",
                area: "The Pearl",
                locationLink: "",
                date: today.toISOString().split('T')[0],
                time: "14:00",
                service: "Gel Color Polish",
                category: "Hands & Feet Care",
                duration: 45,
                price: 120,
                staff: ["Fatima Ali"],
                uberTime: 25,
                paymentStatus: "unpaid",
                paymentMethod: "",
                notes: "",
                completed: false,
                equipmentChecked: false
            },
            {
                id: Date.now() + 3,
                customerName: "Latifa Mohammed",
                customerPhone: "+974-5555-9012",
                customerAddress: "Building 7, Al Sadd Street",
                area: "Al Sadd",
                locationLink: "",
                date: tomorrow.toISOString().split('T')[0],
                time: "11:00",
                service: "Hydra Facial",
                category: "Facial Sessions",
                duration: 60,
                price: 550,
                staff: ["Sara Ahmed"],
                uberTime: 15,
                paymentStatus: "paid",
                paymentMethod: "bank_transfer",
                notes: "Sensitive skin",
                completed: false,
                equipmentChecked: false
            }
        ];
        
        localStorage.setItem('bookings', JSON.stringify(demoBookings));
    }
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Booking form
    document.getElementById('bookingForm').addEventListener('submit', handleBookingSave);
    
    // Staff form
    document.getElementById('staffForm').addEventListener('submit', handleStaffSave);
    
    // Payment status change
    document.getElementById('paymentStatus').addEventListener('change', function() {
        const methodDiv = document.getElementById('paymentMethodDiv');
        if (this.value === 'paid') {
            methodDiv.classList.remove('hidden');
        } else {
            methodDiv.classList.add('hidden');
        }
    });
    
    // Schedule date filter
    document.getElementById('scheduleDate').addEventListener('change', loadStaffSchedule);
    
    // Booking filters
    document.getElementById('filterDate').addEventListener('change', loadBookings);
    document.getElementById('filterArea').addEventListener('change', loadBookings);
    document.getElementById('filterStaff').addEventListener('change', loadBookings);
    document.getElementById('filterPayment').addEventListener('change', loadBookings);
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('scheduleDate').value = today;
    document.getElementById('bookingDate').value = today;
    document.getElementById('filterDate').value = today;
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        showMainApp();
    } else {
        alert('Invalid credentials!');
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    location.reload();
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function showMainApp() {
    const user = getCurrentUser();
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('currentUser').textContent = user.name;
    
    // Hide admin tabs for staff
    if (user.role === 'staff') {
        document.getElementById('servicesTab').classList.add('hidden');
        document.getElementById('staffTab').classList.add('hidden');
        document.getElementById('reportsTab').classList.add('hidden');
        document.getElementById('addBookingBtn').classList.add('hidden');
    }
    
    // Load initial data
    loadDashboard();
    loadBookings();
    loadStaffSchedule();
    loadServices();
    loadStaffList();
    loadStaffSelects();
    
    // Show appropriate tab
    if (user.role === 'staff') {
        showTab('schedule');
    } else {
        showTab('dashboard');
    }
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('border-rose-400', 'text-rose-400');
    });
    
    // Show selected tab
    if (tabName === 'dashboard') {
        document.getElementById('dashboardTab').classList.remove('hidden');
        loadDashboard();
    } else if (tabName === 'bookings') {
        document.getElementById('bookingsTab').classList.remove('hidden');
        loadBookings();
    } else if (tabName === 'schedule') {
        document.getElementById('scheduleTab').classList.remove('hidden');
        loadStaffSchedule();
    } else if (tabName === 'services') {
        document.getElementById('servicesTab').classList.remove('hidden');
        loadServices();
    } else if (tabName === 'staff') {
        document.getElementById('staffTabContent').classList.remove('hidden');
        loadStaffList();
    } else if (tabName === 'reports') {
        document.getElementById('reportsTab').classList.remove('hidden');
        const today = new Date().toISOString().split('T')[0];
        const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
        document.getElementById('reportStartDate').value = firstDay;
        document.getElementById('reportEndDate').value = today;
    }
    
    // Add active class to clicked button
    event.target.closest('.nav-tab').classList.add('border-rose-400', 'text-rose-400');
}

// Data Management
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

function getStaff() {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.filter(u => u.role === 'staff');
}

// Dashboard
function loadDashboard() {
    const bookings = getBookings();
    const today = new Date().toISOString().split('T')[0];
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    // Today's bookings
    const todayBookings = bookings.filter(b => b.date === today);
    document.getElementById('todayBookings').textContent = todayBookings.length;
    
    // Week bookings
    const weekBookings = bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
    });
    document.getElementById('weekBookings').textContent = weekBookings.length;
    
    // Today's revenue
    const todayRevenue = todayBookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.price, 0);
    document.getElementById('todayRevenue').textContent = todayRevenue + ' QAR';
    
    // Active staff
    const staff = getStaff();
    const activeStaff = staff.filter(s => s.active);
    document.getElementById('activeStaff').textContent = activeStaff.length;
    
    // Today's schedule
    const scheduleHtml = todayBookings.length > 0 
        ? todayBookings.map(b => `
            <div class="border-l-4 ${b.paymentStatus === 'paid' ? 'border-green-400' : 'border-orange-400'} p-4 bg-white rounded shadow">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-semibold text-gray-800">${b.time} - ${b.customerName}</p>
                        <p class="text-sm text-gray-600">${b.service} (${b.duration} min)</p>
                        <p class="text-sm text-gray-500">${b.area} • ${b.staff.join(', ')}</p>
                    </div>
                    <span class="px-3 py-1 text-xs rounded-full ${b.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                        ${b.paymentStatus}
                    </span>
                </div>
            </div>
        `).join('')
        : '<p class="text-gray-500 text-center py-8">No bookings scheduled for today</p>';
    
    document.getElementById('todaySchedule').innerHTML = scheduleHtml;
}

// Bookings
function loadBookings() {
    let bookings = getBookings();
    
    // Apply filters
    const filterDate = document.getElementById('filterDate').value;
    const filterArea = document.getElementById('filterArea').value;
    const filterStaff = document.getElementById('filterStaff').value;
    const filterPayment = document.getElementById('filterPayment').value;
    
    if (filterDate) {
        bookings = bookings.filter(b => b.date === filterDate);
    }
    if (filterArea) {
        bookings = bookings.filter(b => b.area === filterArea);
    }
    if (filterStaff) {
        bookings = bookings.filter(b => b.staff.includes(filterStaff));
    }
    if (filterPayment) {
        bookings = bookings.filter(b => b.paymentStatus === filterPayment);
    }
    
    // Sort by date and time
    bookings.sort((a, b) => {
        const dateCompare = new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
        return dateCompare;
    });
    
    const user = getCurrentUser();
    const listHtml = bookings.length > 0
        ? bookings.map(b => `
            <div class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <h3 class="font-bold text-lg text-gray-800">${b.customerName}</h3>
                            <span class="px-2 py-1 text-xs rounded-full ${b.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                                ${b.paymentStatus}
                            </span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <p><i class="fas fa-calendar mr-2 text-rose-400"></i>${formatDate(b.date)} at ${b.time}</p>
                            <p><i class="fas fa-spa mr-2 text-rose-400"></i>${b.service}</p>
                            <p><i class="fas fa-map-marker-alt mr-2 text-rose-400"></i>${b.area}</p>
                            <p><i class="fas fa-users mr-2 text-rose-400"></i>${b.staff.join(', ')}</p>
                            <p><i class="fas fa-clock mr-2 text-rose-400"></i>${b.duration} min + ${b.uberTime} min Uber</p>
                            <p><i class="fas fa-money-bill mr-2 text-rose-400"></i>${b.price} QAR</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        ${user.role === 'admin' ? `
                            <button onclick="editBooking(${b.id})" class="text-blue-500 hover:text-blue-700">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteBooking(${b.id})" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                        <button onclick="viewBookingDetails(${b.id})" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('')
        : '<p class="text-gray-500 text-center py-8 bg-white rounded-lg">No bookings found</p>';
    
    document.getElementById('bookingsList').innerHTML = listHtml;
}

function openBookingModal(bookingId = null) {
    document.getElementById('bookingModal').classList.remove('hidden');
    
    if (bookingId) {
        // Edit mode
        const bookings = getBookings();
        const booking = bookings.find(b => b.id === bookingId);
        
        document.getElementById('modalTitle').textContent = 'Edit Booking';
        document.getElementById('bookingId').value = booking.id;
        document.getElementById('customerName').value = booking.customerName;
        document.getElementById('customerPhone').value = booking.customerPhone;
        document.getElementById('customerAddress').value = booking.customerAddress;
        document.getElementById('customerArea').value = booking.area;
        document.getElementById('locationLink').value = booking.locationLink || '';
        document.getElementById('bookingDate').value = booking.date;
        document.getElementById('bookingTime').value = booking.time;
        document.getElementById('serviceSelect').value = booking.service;
        updateServiceDetails();
        document.getElementById('manualPrice').value = booking.price;
        
        // Set selected staff
        const staffSelect = document.getElementById('assignStaff');
        Array.from(staffSelect.options).forEach(option => {
            option.selected = booking.staff.includes(option.value);
        });
        
        document.getElementById('uberTime').value = booking.uberTime;
        document.getElementById('paymentStatus').value = booking.paymentStatus;
        if (booking.paymentStatus === 'paid') {
            document.getElementById('paymentMethodDiv').classList.remove('hidden');
            document.getElementById('paymentMethod').value = booking.paymentMethod;
        }
        document.getElementById('bookingNotes').value = booking.notes || '';
    } else {
        // New booking mode
        document.getElementById('modalTitle').textContent = 'New Booking';
        document.getElementById('bookingForm').reset();
        document.getElementById('bookingId').value = '';
        document.getElementById('paymentMethodDiv').classList.add('hidden');
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('bookingDate').value = today;
        document.getElementById('uberTime').value = '20';
    }
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('bookingForm').reset();
}

function handleBookingSave(e) {
    e.preventDefault();
    
    const bookingId = document.getElementById('bookingId').value;
    const selectedService = document.getElementById('serviceSelect').value;
    const serviceCategory = getServiceCategory(selectedService);
    const serviceDuration = getServiceDuration(selectedService);
    const manualPrice = parseFloat(document.getElementById('manualPrice').value);
    
    if (!manualPrice || manualPrice <= 0) {
        alert('Please enter a valid price!');
        return;
    }
    
    const selectedStaff = Array.from(document.getElementById('assignStaff').selectedOptions)
        .map(option => option.value);
    
    if (selectedStaff.length === 0) {
        alert('Please assign at least one staff member!');
        return;
    }
    
    const bookingData = {
        id: bookingId ? parseInt(bookingId) : Date.now(),
        customerName: document.getElementById('customerName').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerAddress: document.getElementById('customerAddress').value,
        area: document.getElementById('customerArea').value,
        locationLink: document.getElementById('locationLink').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        service: selectedService,
        category: serviceCategory,
        duration: serviceDuration,
        price: manualPrice,
        staff: selectedStaff,
        uberTime: parseInt(document.getElementById('uberTime').value),
        paymentStatus: document.getElementById('paymentStatus').value,
        paymentMethod: document.getElementById('paymentStatus').value === 'paid' 
            ? document.getElementById('paymentMethod').value : '',
        notes: document.getElementById('bookingNotes').value,
        completed: false,
        equipmentChecked: false
    };
    
    let bookings = getBookings();
    
    if (bookingId) {
        // Update existing
        const index = bookings.findIndex(b => b.id === parseInt(bookingId));
        bookings[index] = bookingData;
    } else {
        // Add new
        bookings.push(bookingData);
    }
    
    saveBookings(bookings);
    closeBookingModal();
    loadBookings();
    loadDashboard();
    
    alert('Booking saved successfully!');
}

function editBooking(id) {
    openBookingModal(id);
}

function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        let bookings = getBookings();
        bookings = bookings.filter(b => b.id !== id);
        saveBookings(bookings);
        loadBookings();
        loadDashboard();
    }
}

function viewBookingDetails(id) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === id);
    const user = getCurrentUser();
    
    const equipmentList = equipmentChecklists[booking.category] || [];
    
    const detailsHtml = `
        <div class="space-y-4">
            ${user.role === 'staff' ? `
                <div class="bg-green-50 border-2 border-green-400 rounded-lg p-4 mb-4">
                    <p class="text-sm text-gray-600 mb-1">💰 Amount to Collect from Customer:</p>
                    <p class="text-3xl font-bold text-green-600">${booking.price} QAR</p>
                    <p class="text-sm ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'} mt-2">
                        ${booking.paymentStatus === 'paid' ? '✓ Already Paid' : '⚠ Collect Payment'}
                    </p>
                </div>
            ` : ''}
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600">Customer</p>
                    <p class="font-semibold">${booking.customerName}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Phone</p>
                    <p class="font-semibold">${booking.customerPhone}</p>
                </div>
                <div class="col-span-2">
                    <p class="text-sm text-gray-600">Address</p>
                    <p class="font-semibold">${booking.customerAddress}</p>
                    <p class="text-sm text-rose-400 mt-1">${booking.area}</p>
                    <a href="${booking.locationLink || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(booking.customerAddress + ', ' + booking.area + ', Qatar')}" target="_blank" class="text-sm text-blue-500 hover:underline">
                        <i class="fas fa-map-marker-alt mr-1"></i>${booking.locationLink ? 'Open Location Link' : 'Search on Google Maps'}
                    </a>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Date & Time</p>
                    <p class="font-semibold">${formatDate(booking.date)} at ${booking.time}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Service</p>
                    <p class="font-semibold">${booking.service}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Duration</p>
                    <p class="font-semibold">${booking.duration} minutes</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Uber Transit Time</p>
                    <p class="font-semibold">${booking.uberTime} minutes</p>
                </div>
                ${user.role === 'admin' ? `
                    <div>
                        <p class="text-sm text-gray-600">Price</p>
                        <p class="font-semibold text-green-600">${booking.price} QAR</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Payment Status</p>
                        <span class="px-3 py-1 text-sm rounded-full ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                            ${booking.paymentStatus} ${booking.paymentMethod ? '(' + booking.paymentMethod + ')' : ''}
                        </span>
                    </div>
                ` : ''}
                <div class="col-span-2">
                    <p class="text-sm text-gray-600">Team Members</p>
                    <p class="font-semibold">${booking.staff.join(', ')}</p>
                </div>
                ${booking.notes ? `
                    <div class="col-span-2">
                        <p class="text-sm text-gray-600">Notes</p>
                        <p class="font-semibold">${booking.notes}</p>
                    </div>
                ` : ''}
            </div>
            
            ${user.role === 'staff' && booking.staff.includes(user.name) ? `
                <div class="border-t pt-4">
                    <h4 class="font-semibold mb-3">📋 Equipment Checklist</h4>
                    <div class="space-y-2" id="equipmentChecklistItems">
                        ${equipmentList.map((item, index) => `
                            <label class="flex items-center">
                                <input type="checkbox" class="w-4 h-4 text-rose-400 rounded" ${booking.equipmentChecked ? 'checked' : ''}>
                                <span class="ml-2 text-sm">${item}</span>
                            </label>
                        `).join('')}
                    </div>
                    <button onclick="markEquipmentChecked(${booking.id})" class="mt-4 w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-500">
                        Confirm Equipment Checked
                    </button>
                </div>
                
                <div class="border-t pt-4">
                    <button onclick="markCompleted(${booking.id})" class="w-full ${booking.completed ? 'bg-green-400' : 'bg-blue-400'} text-white py-2 rounded-lg hover:opacity-90">
                        ${booking.completed ? 'Completed ✓' : 'Mark as Completed'}
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('bookingDetailsContent').innerHTML = detailsHtml;
    document.getElementById('bookingDetailsModal').classList.remove('hidden');
}

function closeBookingDetailsModal() {
    document.getElementById('bookingDetailsModal').classList.add('hidden');
}

function markEquipmentChecked(id) {
    let bookings = getBookings();
    const index = bookings.findIndex(b => b.id === id);
    bookings[index].equipmentChecked = true;
    saveBookings(bookings);
    alert('Equipment checklist confirmed!');
    closeBookingDetailsModal();
}

function markCompleted(id) {
    let bookings = getBookings();
    const index = bookings.findIndex(b => b.id === id);
    bookings[index].completed = true;
    saveBookings(bookings);
    alert('Appointment marked as completed!');
    closeBookingDetailsModal();
    loadStaffSchedule();
}

// Staff Schedule
function loadStaffSchedule() {
    const user = getCurrentUser();
    const selectedDate = document.getElementById('scheduleDate').value;
    let bookings = getBookings();
    
    // Filter by staff name and date
    bookings = bookings.filter(b => 
        b.staff.includes(user.name) && b.date === selectedDate
    );
    
    // Sort by time
    bookings.sort((a, b) => a.time.localeCompare(b.time));
    
    const scheduleHtml = bookings.length > 0
        ? bookings.map(b => `
            <div class="bg-white rounded-lg shadow p-4 border-l-4 ${b.completed ? 'border-green-400' : 'border-rose-400'}">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-bold text-lg text-gray-800">${b.time} - ${b.customerName}</h3>
                        <p class="text-sm text-gray-600 mt-1">${b.service} (${b.duration} min)</p>
                    </div>
                    ${b.completed ? '<span class="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span>' : ''}
                </div>
                
                <div class="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <p class="text-sm text-gray-600">Amount to Collect:</p>
                    <p class="text-2xl font-bold text-green-600">${b.price} QAR</p>
                    <p class="text-xs text-gray-500 mt-1">Payment: ${b.paymentStatus === 'paid' ? 'Already Paid ✓' : 'Collect from Customer'}</p>
                </div>
                
                <div class="space-y-2 text-sm text-gray-600">
                    <p><i class="fas fa-map-marker-alt mr-2 text-rose-400"></i>${b.area}</p>
                    <p><i class="fas fa-home mr-2 text-rose-400"></i>${b.customerAddress}</p>
                    <p><i class="fas fa-phone mr-2 text-rose-400"></i>${b.customerPhone}</p>
                    <p><i class="fas fa-car mr-2 text-rose-400"></i>Uber Time: ${b.uberTime} minutes</p>
                    <p><i class="fas fa-users mr-2 text-rose-400"></i>Team: ${b.staff.join(', ')}</p>
                    ${b.notes ? `<p><i class="fas fa-sticky-note mr-2 text-rose-400"></i>${b.notes}</p>` : ''}
                </div>
                
                <div class="mt-3 flex gap-2">
                    <a href="${b.locationLink || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.customerAddress + ', ' + b.area + ', Qatar')}" target="_blank" class="flex-1 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-sm">
                        <i class="fas fa-map-marked-alt mr-1"></i>Open Location
                    </a>
                    <button onclick="viewBookingDetails(${b.id})" class="flex-1 bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-500 text-sm">
                        <i class="fas fa-eye mr-1"></i>Details
                    </button>
                </div>
            </div>
        `).join('')
        : '<p class="text-gray-500 text-center py-8 bg-white rounded-lg">No appointments scheduled for this date</p>';
    
    document.getElementById('staffSchedule').innerHTML = scheduleHtml;
}

// Services
function loadServices() {
    let html = '';
    
    Object.keys(servicesData).forEach(category => {
        html += `
            <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-rose-400">${category}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${servicesData[category].map(service => `
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-semibold text-gray-800">${service.name}</p>
                                    <p class="text-sm text-gray-600">${service.duration} minutes</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    document.getElementById('servicesList').innerHTML = html;
}

function loadServicesSelect() {
    const select = document.getElementById('serviceSelect');
    select.innerHTML = '<option value="">Select Service</option>';
    
    Object.keys(servicesData).forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        servicesData[category].forEach(service => {
            const option = document.createElement('option');
            option.value = service.name;
            option.textContent = `${service.name} (${service.duration}min)`;
            optgroup.appendChild(option);
        });
        
        select.appendChild(optgroup);
    });
}

function updateServiceDetails() {
    const selectedService = document.getElementById('serviceSelect').value;
    if (selectedService) {
        const duration = getServiceDuration(selectedService);
        document.getElementById('serviceDuration').value = duration + ' minutes';
    } else {
        document.getElementById('serviceDuration').value = '';
    }
}

function getServiceCategory(serviceName) {
    for (const [category, services] of Object.entries(servicesData)) {
        if (services.find(s => s.name === serviceName)) {
            return category;
        }
    }
    return '';
}

function getServiceDuration(serviceName) {
    for (const services of Object.values(servicesData)) {
        const service = services.find(s => s.name === serviceName);
        if (service) return service.duration;
    }
    return 0;
}

// Staff Management
function loadStaffList() {
    const staff = getStaff();
    
    const html = staff.map(s => `
        <div class="bg-white rounded-lg shadow p-4">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h3 class="font-bold text-gray-800">${s.name}</h3>
                    <p class="text-sm text-gray-600">${s.specialization || 'All Services'}</p>
                </div>
                <span class="px-3 py-1 text-xs rounded-full ${s.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                    ${s.active ? 'Active' : 'Inactive'}
                </span>
            </div>
            <p class="text-sm text-gray-600"><i class="fas fa-phone mr-2"></i>${s.phone}</p>
            <p class="text-sm text-gray-600"><i class="fas fa-user mr-2"></i>${s.username}</p>
        </div>
    `).join('');
    
    document.getElementById('staffList').innerHTML = html;
}

function loadStaffSelects() {
    const staff = getStaff().filter(s => s.active);
    
    // For booking assignment
    const assignSelect = document.getElementById('assignStaff');
    assignSelect.innerHTML = '';
    staff.forEach(s => {
        const option = document.createElement('option');
        option.value = s.name;
        option.textContent = s.name + (s.specialization ? ' - ' + s.specialization : '');
        assignSelect.appendChild(option);
    });
    
    // For filter
    const filterSelect = document.getElementById('filterStaff');
    filterSelect.innerHTML = '<option value="">All Staff</option>';
    staff.forEach(s => {
        const option = document.createElement('option');
        option.value = s.name;
        option.textContent = s.name;
        filterSelect.appendChild(option);
    });
}

function openStaffModal() {
    document.getElementById('staffModal').classList.remove('hidden');
}

function closeStaffModal() {
    document.getElementById('staffModal').classList.add('hidden');
    document.getElementById('staffForm').reset();
}

function handleStaffSave(e) {
    e.preventDefault();
    
    const newStaff = {
        username: document.getElementById('staffUsername').value,
        password: document.getElementById('staffPassword').value,
        role: 'staff',
        name: document.getElementById('staffName').value,
        phone: document.getElementById('staffPhone').value,
        specialization: document.getElementById('staffSpecialization').value,
        active: document.getElementById('staffActive').checked
    };
    
    let users = JSON.parse(localStorage.getItem('users'));
    
    // Check if username exists
    if (users.find(u => u.username === newStaff.username)) {
        alert('Username already exists!');
        return;
    }
    
    users.push(newStaff);
    localStorage.setItem('users', JSON.stringify(users));
    
    closeStaffModal();
    loadStaffList();
    loadStaffSelects();
    
    alert('Staff member added successfully!');
}

// Reports
function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }
    
    let bookings = getBookings();
    bookings = bookings.filter(b => b.date >= startDate && b.date <= endDate);
    
    // Calculate totals
    const totalRevenue = bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.price, 0);
    
    const totalBookings = bookings.length;
    const paidCount = bookings.filter(b => b.paymentStatus === 'paid').length;
    const unpaidCount = bookings.filter(b => b.paymentStatus === 'unpaid').length;
    
    document.getElementById('reportTotalRevenue').textContent = totalRevenue + ' QAR';
    document.getElementById('reportTotalBookings').textContent = totalBookings;
    document.getElementById('reportPaymentStatus').textContent = paidCount + ' / ' + unpaidCount;
    
    // Generate table
    const tableHtml = bookings.map(b => `
        <tr class="border-b">
            <td class="px-4 py-3 text-sm">${formatDate(b.date)}</td>
            <td class="px-4 py-3 text-sm">${b.customerName}</td>
            <td class="px-4 py-3 text-sm">${b.service}</td>
            <td class="px-4 py-3 text-sm">${b.staff.join(', ')}</td>
            <td class="px-4 py-3 text-sm font-semibold">${b.price} QAR</td>
            <td class="px-4 py-3 text-sm">
                <span class="px-2 py-1 text-xs rounded-full ${b.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}">
                    ${b.paymentStatus}
                </span>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('reportTableBody').innerHTML = tableHtml || '<tr><td colspan="6" class="text-center py-4 text-gray-500">No data for selected period</td></tr>';
    document.getElementById('reportResults').classList.remove('hidden');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Check if user is already logged in
    if (sessionStorage.getItem('currentUser')) {
        showMainApp();
    }
});
