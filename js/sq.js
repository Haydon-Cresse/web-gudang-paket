const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i=> {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    })
});

//toogle sidebar
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})




const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})


let editPackageRow = null;
let editOrderRow = null;

document.getElementById('packageForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (editPackageRow) {
        updatePackage();
    } else {
        addPackage();
    }
});

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (editOrderRow) {
        updateOrder();
    } else {
        addOrder();
    }
});

function addPackage() {
    const packageId = document.getElementById('packageId').value;
    const luggage = document.getElementById('luggage').value;

    if (packageId && luggage) {
        const packageTable = document.getElementById('packageTable').getElementsByTagName('tbody')[0];
        const newRow = packageTable.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = packageId;
        cell2.textContent = luggage;
        cell3.innerHTML = `<button onclick="editPackage(this)">Edit</button> <button onclick="removePackage(this)">Remove</button>`;

        // Add package to the dropdown in the order form
        const packageSelect = document.getElementById('packageSelect');
        const option = document.createElement('option');
        option.value = packageId;
        option.textContent = `${packageId} - ${luggage}`;
        packageSelect.appendChild(option);

        document.getElementById('packageForm').reset();
    } else {
        alert("Please fill in all fields.");
    }
}

function editPackage(button) {
    editPackageRow = button.parentElement.parentElement;
    document.getElementById('packageId').value = editPackageRow.cells[0].textContent;
    document.getElementById('luggage').value = editPackageRow.cells[1].textContent;
}

function updatePackage() {
    const packageId = document.getElementById('packageId').value;
    const luggage = document.getElementById('luggage').value;

    if (packageId && luggage) {
        editPackageRow.cells[0].textContent = packageId;
        editPackageRow.cells[1].textContent = luggage;

        // Update the dropdown in the order form
        const packageSelect = document.getElementById('packageSelect');
        const options = packageSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === editPackageRow.cells[0].textContent) {
                options[i].textContent = `${packageId} - ${luggage}`;
                break;
            }
        }

        document.getElementById('packageForm').reset();
        editPackageRow = null;
    } else {
        alert("Please fill in all fields.");
    }
}

function removePackage(button) {
    const row = button.parentElement.parentElement;
    const packageId = row.cells[0].textContent;

    // Remove from the dropdown in the order form
    const packageSelect = document.getElementById('packageSelect');
    const options = packageSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === packageId) {
            packageSelect.remove(i);
            break;
        }
    }

    row.remove();
    if (editPackageRow === row) {
        document.getElementById('packageForm').reset();
        editPackageRow = null;
    }
}

function formatDatetime(datetime) {
    // Split the datetime string into date and time parts
    const [date, time] = datetime.split('T: ');
    return `${date} ${time}`; // Add a space between the date and time
}

function addOrder() {
    const packageId = document.getElementById('packageSelect').value;
    const arrivalTime = document.getElementById('arrivalTime').value;
    const pickupTime = document.getElementById('pickupTime').value;

    if (packageId && arrivalTime && pickupTime) {
        const orderTable = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        const newRow = orderTable.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = packageId;
        cell2.textContent = formatDatetime(arrivalTime); // Format the arrival time
        cell3.textContent = formatDatetime(pickupTime); // Format the pickup time
        cell4.innerHTML = `<button class="edit" onclick="editOrder(this)">Edit</button> 
                           <button class="remove" onclick="removeOrder(this)">Remove</button>`;

        // Add to history table
        const luggage = document.getElementById('packageSelect').options[document.getElementById('packageSelect').selectedIndex].text.split(' - ')[1];
        addHistory(packageId, luggage, formatDatetime(arrivalTime), formatDatetime(pickupTime));

        document.getElementById('orderForm').reset();
    } else {
        alert("Please fill in all fields.");
    }
}

function editOrder(button) {
    editOrderRow = button.parentElement.parentElement;
    document.getElementById('packageSelect').value = editOrderRow.cells[0].textContent;
    document.getElementById('arrivalTime').value = editOrderRow.cells[1].textContent;
    document.getElementById('pickupTime').value = editOrderRow.cells[2].textContent;
}

function updateOrder() {
    const packageId = document.getElementById('packageSelect').value;
    const arrivalTime = document.getElementById('arrivalTime').value;
    const pickupTime = document.getElementById('pickupTime').value;

    if (packageId && arrivalTime && pickupTime) {
        editOrderRow.cells[0].textContent = packageId;
        editOrderRow.cells[1].textContent = arrivalTime;
        editOrderRow.cells[2].textContent = pickupTime;

        document.getElementById('orderForm').reset();
        editOrderRow = null;
    } else {
        alert("Please fill in all fields.");
    }
}

function removeOrder(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    if (editOrderRow === row) {
        document.getElementById('orderForm').reset();
        editOrderRow = null;
    }
}

function addHistory(packageId, luggage, arrivalTime, pickupTime) {
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.textContent = packageId;
    cell2.textContent = luggage;
    cell3.textContent = arrivalTime;
    cell4.textContent = pickupTime;
    cell5.innerHTML = `
        <button class="details" onclick="viewDetails('${packageId}', '${luggage}', '${arrivalTime}', '${pickupTime}')">Details</button>
        <button class="invoice" onclick="printInvoice('${packageId}', '${luggage}', '${arrivalTime}', '${pickupTime}')">Download/Print Invoice</button>
    `;
}

function viewDetails(packageId, luggage, arrivalTime, pickupTime) {
    alert(`
        Package Details:
        - Package ID: ${packageId}
        - Luggage: ${luggage}
        - Arrival Time: ${arrivalTime}
        - Pickup Time: ${pickupTime}
    `);
}

function printInvoice(packageId, luggage, arrivalTime, pickupTime) {
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(`
        <html>
            <head>
                <title>Invoice</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: var(--blue); }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    table, th, td { border: 1px solid black; }
                    th, td { padding: 10px; text-align: left; }
                </style>
            </head>
            <body>
                <h1>Invoice</h1>
                <p><strong>Package ID:</strong> ${packageId}</p>
                <p><strong>Luggage:</strong> ${luggage}</p>
                <p><strong>Arrival Time:</strong> ${arrivalTime}</p>
                <p><strong>Pickup Time:</strong> ${pickupTime}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Package ID</td>
                            <td>${packageId}</td>
                        </tr>
                        <tr>
                            <td>Luggage</td>
                            <td>${luggage}</td>
                        </tr>
                        <tr>
                            <td>Arrival Time</td>
                            <td>${arrivalTime}</td>
                        </tr>
                        <tr>
                            <td>Pickup Time</td>
                            <td>${pickupTime}</td>
                        </tr>
                    </tbody>
                </table>
                <button onclick="window.print()">Print</button>
            </body>
        </html>
    `);
    invoiceWindow.document.close();
}