function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Define valid users
    var users = [
        { tenantID:"1",username: "Raghav", password: "Swasti", role: "tenant", appartmentnumber: "101" },
        { tenantID:"2",username: "Aksh", password: "Ishika", role: "tenant", appartmentnumber: "102" },
        { tenantID:"5",username: "Akshat", password: "akshat", role: "tenant", appartmentnumber: "105" },
        { tenantID:"10",username: "Utkarsh", password: "Jiya", role: "tenant", appartmentnumber: "110" },
        { username: "staff", password: "staffpass", role: "staff" },
        { username: "Rakshit", password: "managerpass", role: "manager"}
        
    ];

    // Check if the entered credentials match any user
    var user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === "tenant") {
            sessionStorage.setItem('tenantInfo', JSON.stringify({
                tenantID: user.tenantID,
                appartmentnumber: user.appartmentnumber
            }));
        }
        
        // Redirect based on the user's role
        switch (user.role) {
            case "tenant":
                window.location.href = "maintenance_request.html";
                break;
            case "staff":
                window.location.href = "requests_update.html";
                break;
            case "manager":
                window.location.href = "manage.html";
                break;
        }
    } 
    
    else {
        alert("Invalid username or password. Please try again.");
    }
}



function submitRequest() {
    var apartmentNumber = document.getElementById("apartmentNumber").value;
    var areaOfProblem = document.getElementById("areaOfProblem").value;
    var description = document.getElementById("description").value;
    var photoInput = document.getElementById("photo");
    
    // Check if a file is selected
    var photo = photoInput.files.length > 0 ? photoInput.files[0] : null;

    // Generate request ID and date/time
    var requestId = generateRequestId();
    var dateTime = getCurrentDateTime();

    // Initial status is 'pending'
    var status = 'pending';

    // Create an object to represent the request
    var request = {
        requestId: requestId,
        apartmentNumber: apartmentNumber,
        areaOfProblem: areaOfProblem,
        description: description,
        dateTime: dateTime,
        photo: photo,  // Assign the file object directly
        status: status
    };

    // Retrieve existing requests from localStorage or initialize an empty array
    var existingRequests = JSON.parse(localStorage.getItem('maintenanceRequests')) || [];

    // Add the new request to the array
    existingRequests.push(request);

    // Store the updated array back in localStorage
    localStorage.setItem('maintenanceRequests', JSON.stringify(existingRequests));

    // Display a success message
    alert("Maintenance request submitted successfully!");

    // Redirect the user to the login page
    window.location.href = "index.html";
}function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Define valid users
    var users = [
        { tenantID:"1",username: "Raghav", password: "Swasti", role: "tenant", appartmentnumber: "101" },
        { tenantID:"2",username: "Aksh", password: "Ishika", role: "tenant", appartmentnumber: "102" },
        { tenantID:"5",username: "Akshat", password: "akshat", role: "tenant", appartmentnumber: "105" },
        { tenantID:"10",username: "Utkarsh", password: "Jiya", role: "tenant", appartmentnumber: "110" },
        { username: "staff", password: "staffpass", role: "staff" },
        { username: "Rakshit", password: "managerpass", role: "manager"}
    ];

    // Check if the entered credentials match any user
    var user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === "tenant") {
            sessionStorage.setItem('tenantInfo', JSON.stringify({
                tenantID: user.tenantID,
                appartmentnumber: user.appartmentnumber
            }));
        }
        
        // Redirect based on the user's role
        switch (user.role) {
            case "tenant":
                window.location.href = "maintenance_request.html";
                break;
            case "staff":
                window.location.href = "requests_update.html";
                break;
            case "manager":
                window.location.href = "manage.html";
                break;
        }
    } 
    
    else {
        alert("Invalid username or password. Please try again.");
    }
}



function submitRequest() {
    var apartmentNumber = document.getElementById("apartmentNumber").value;
    var areaOfProblem = document.getElementById("areaOfProblem").value;
    var description = document.getElementById("description").value;
    var photoInput = document.getElementById("photo");
    
    // Check if a file is selected
    var photo = photoInput.files.length > 0 ? photoInput.files[0] : null;

    // Generate request ID and date/time
    var requestId = generateRequestId();
    var dateTime = getCurrentDateTime();

    // Initial status is 'pending'
    var status = 'pending';

    // Create an object to represent the request
    var request = {
        requestId: requestId,
        apartmentNumber: apartmentNumber,
        areaOfProblem: areaOfProblem,
        description: description,
        dateTime: dateTime,
        photo: photo,  // Assign the file object directly
        status: status
    };

    // Retrieve existing requests from localStorage or initialize an empty array
    var existingRequests = JSON.parse(localStorage.getItem('maintenanceRequests')) || [];

    // Add the new request to the array
    existingRequests.push(request);

    // Store the updated array back in localStorage
    localStorage.setItem('maintenanceRequests', JSON.stringify(existingRequests));

    // Display a success message
    alert("Maintenance request submitted successfully!");

    // Redirect the user to the login page
    window.location.href = "index.html";
}

// Load existing requests from localStorage
var existingRequests = JSON.parse(localStorage.getItem('maintenanceRequests')) || [];

// Display all requests initially
displayRequests(existingRequests);

function displayRequests(requests) {
    var tableBody = document.getElementById('requestsTableBody');
    tableBody.innerHTML = '';

    requests.forEach(function(request) {
        var row = tableBody.insertRow();

        // Add cells to the row
        for (var key in request) {
            var cell = row.insertCell();
            cell.innerHTML = request[key];
        }

        // Add an action button to update status
        var actionCell = row.insertCell();
        actionCell.innerHTML = '<button onclick="selectRequest(\'' + request.requestId + '\')">Update Status</button>';
    });
}

function filterRequests() {
    var filterApartment = document.getElementById('filterApartment').value.toLowerCase();
    var filterArea = document.getElementById('filterArea').value.toLowerCase();
    var filterStartDate = document.getElementById('filterStartDate').value;
    var filterEndDate = document.getElementById('filterEndDate').value;
    var filterStatus = document.getElementById('filterStatus').value.toLowerCase();

    var filteredRequests = existingRequests.filter(function(request) {
        return (
            (filterApartment === '' || request.apartmentNumber.toLowerCase().includes(filterApartment)) &&
            (filterArea === '' || request.areaOfProblem.toLowerCase().includes(filterArea)) &&
            (filterStartDate === '' || request.dateTime >= filterStartDate) &&
            (filterEndDate === '' || request.dateTime <= filterEndDate) &&
            (filterStatus === '' || request.status.toLowerCase() === filterStatus)
        );
    });

    displayRequests(filteredRequests);
}

function selectRequest(requestId) {
    document.getElementById('selectedRequestId').value = requestId;
}

function updateStatus() {
    var selectedRequestId = document.getElementById('selectedRequestId').value;
    var newStatus = document.getElementById('newStatus').value;

    // Find the request in the existing requests array
    var selectedRequest = existingRequests.find(function(request) {
        return request.requestId == selectedRequestId;
    });

    // Update the status of the selected request
    if (selectedRequest) {
        selectedRequest.status = newStatus;

        // Update localStorage with the modified requests array
        localStorage.setItem('maintenanceRequests', JSON.stringify(existingRequests));

        // Update the displayed requests
        displayRequests(existingRequests);
    }
}

// Function to check if an apartment number is available
function isApartmentNumberAvailable(apartmentNumber) {
    // Retrieve existing tenants from localStorage or initialize an empty array
    var existingTenants = JSON.parse(localStorage.getItem('tenants')) || [];

    // Check if the apartment number is already in use
    return !existingTenants.some(function(tenant) {
        return tenant.apartmentNumber === apartmentNumber;
    });
}

function addTenant() {
    var tenantName = document.getElementById("tenantName").value;
    var tenantPhoneNumber = document.getElementById("tenantPhoneNumber").value;
    var tenantEmail = document.getElementById("tenantEmail").value;
    var checkInDate = document.getElementById("checkInDate").value;
    var checkOutDate = document.getElementById("checkOutDate").value;
    var apartmentNumber = document.getElementById("apartmentNumber").value;
    var tenantPassword = document.getElementById("tenantPassword").value; 

    // Check if the apartment number is available
    if (!isApartmentNumberAvailable(apartmentNumber)) {
        alert("Apartment number is already in use. Please choose another.");
        return;
    }

    // Generate tenant ID
    var tenantID = generateTenantID();

    // Create an object to represent the tenant
    var tenant = {
        tenantID: tenantID,
        username: tenantName, // Assuming tenant username is the same as their name
        password: tenantPassword, // Using the provided password
        role: "tenant",
        appartmentnumber: apartmentNumber
    };

    // Retrieve existing tenants from localStorage or initialize an empty array
    var existingTenants = JSON.parse(localStorage.getItem('tenants')) || [];

    // Add the new tenant to the array
    existingTenants.push(tenant);

    // Store the updated array back in localStorage
    localStorage.setItem('tenants', JSON.stringify(existingTenants));

    // Update the users array
    users.push(tenant);

    alert("Tenant added successfully!");
}

function moveTenant() {
    var tenantID = document.getElementById("moveTenantID").value;
    var newApartmentNumber = document.getElementById("newApartmentNumber").value;

    // Check if the new apartment number is available
    if (!isApartmentNumberAvailable(newApartmentNumber)) {
        alert("New apartment number is already in use. Please choose another.");
        return;
    }

    // Retrieve existing tenants from localStorage or initialize an empty array
    var existingTenants = JSON.parse(localStorage.getItem('tenants')) || [];

    // Find the tenant in the existing tenants array
    var selectedTenant = existingTenants.find(function(tenant) {
        return tenant.tenantID == tenantID;
    });

    // Update the apartment number of the selected tenant
    if (selectedTenant) {
        selectedTenant.appartmentnumber = newApartmentNumber;

        // Update localStorage with the modified tenants array
        localStorage.setItem('tenants', JSON.stringify(existingTenants));

        // Update the users array
        var correspondingUserIndex = users.findIndex(u => u.tenantID == tenantID);
        if (correspondingUserIndex !== -1) {
            users[correspondingUserIndex].appartmentnumber = newApartmentNumber;
        }

        alert("Tenant moved successfully!");
    } else {
        alert("Invalid Tenant ID. Please try again.");
    }
}

function deleteTenant() {
    var tenantID = document.getElementById("deleteTenantID").value;

    // Retrieve existing tenants from localStorage or initialize an empty array
    var existingTenants = JSON.parse(localStorage.getItem('tenants')) || [];

    // Find the index of the tenant in the existing tenants array
    var tenantIndex = existingTenants.findIndex(function(tenant) {
        return tenant.tenantID == tenantID;
    });

    // Remove the tenant from the array
    if (tenantIndex !== -1) {
        existingTenants.splice(tenantIndex, 1);

        localStorage.setItem('tenants', JSON.stringify(existingTenants));

        // Remove the corresponding user from the users array
        var correspondingUserIndex = users.findIndex(u => u.tenantID == tenantID);
        if (correspondingUserIndex !== -1) {
            users.splice(correspondingUserIndex, 1);
        }

        // Display a success message
        alert("Tenant deleted successfully!");
    } else {
        alert("Invalid Tenant ID. Please try again.");
    }
}

function generateTenantID() {
    return Math.floor(Math.random() * 1000000) + 1;
}

// Function to generate a unique request ID
function generateRequestId() {
    return 'REQ' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Function to get the current date and time in a formatted string
function getCurrentDateTime() {
    var currentDatetime = new Date();
    var year = currentDatetime.getFullYear();
    var month = (currentDatetime.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDatetime.getDate().toString().padStart(2, '0');
    var hours = currentDatetime.getHours().toString().padStart(2, '0');
    var minutes = currentDatetime.getMinutes().toString().padStart(2, '0');
    var seconds = currentDatetime.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to delete a specific request by request ID
function deleteRequest() {
    var deleteRequestId = document.getElementById("deleteRequestId").value;

    // Find the index of the request in the existing requests array
    var requestIndex = existingRequests.findIndex(function(request) {
        return request.requestId == deleteRequestId;
    });

    // Remove the request from the array
    if (requestIndex !== -1) {
        existingRequests.splice(requestIndex, 1);

        // Update localStorage with the modified requests array
        localStorage.setItem('maintenanceRequests', JSON.stringify(existingRequests));

        // Update the displayed requests
        displayRequests(existingRequests);
    }
}

// Function to delete all requests
function deleteAllRequests() {
    // Clear the existing requests array
    existingRequests = [];

    // Update localStorage with the empty requests array
    localStorage.setItem('maintenanceRequests', JSON.stringify(existingRequests));

    // Update the displayed requests
    displayRequests(existingRequests);
}

function logout() {
    // Redirect the user to the login page
    window.location.href = "index.html";
}

