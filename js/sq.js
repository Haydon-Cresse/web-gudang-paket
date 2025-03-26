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



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

let editRow = null;

document.getElementById('packageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (editRow) {
        updatePackage();
    } else {
        addPackage();
    }
});

function addPackage() {
    const userName = document.getElementById('userName').value;
    const orderDate = document.getElementById('orderDate').value;
    const orderStatus = document.getElementById('orderStatus').value;

    if (userName && orderDate && orderStatus) {
        const table = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = userName;
        cell2.textContent = orderDate;
        cell3.innerHTML = `<span class="status ${orderStatus.toLowerCase()}">${orderStatus}</span>`;
        cell4.innerHTML = `<button onclick="editPackage(this)">Edit</button> <button onclick="removePackage(this)">Remove</button>`;

        document.getElementById('packageForm').reset();
    } else {
        alert("Please fill in all fields.");
    }
}

function editPackage(button) {
    editRow = button.parentElement.parentElement;
    document.getElementById('userName').value = editRow.cells[0].textContent;
    document.getElementById('orderDate').value = editRow.cells[1].textContent;
    document.getElementById('orderStatus').value = editRow.cells[2].textContent;
}

function updatePackage() {
    const userName = document.getElementById('userName').value;
    const orderDate = document.getElementById('orderDate').value;
    const orderStatus = document.getElementById('orderStatus').value;

    if (userName && orderDate && orderStatus) {
        editRow.cells[0].textContent = userName;
        editRow.cells[1].textContent = orderDate;
        editRow.cells[2].innerHTML = `<span class="status ${orderStatus.toLowerCase()}">${orderStatus}</span>`;
        editRow.cells[3].innerHTML = `<button onclick="editPackage(this)">Edit</button> <button onclick="removePackage(this)">Remove</button>`;

        document.getElementById('packageForm').reset();
        editRow = null;
    } else {
        alert("Please fill in all fields.");
    }
}

function removePackage(button) {
    button.parentElement.parentElement.remove();
    if (editRow === button.parentElement.parentElement) {
        document.getElementById('packageForm').reset();
        editRow = null;
    }
}