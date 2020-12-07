// Defining Habit class to later create objects for each new habit.
// The objects will be used to store name and color info to display in the table.
class Habit {
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}
}

let habits = [];
let i = 0;

// Adding a new habit.
function addHabit() {
	// Create new default habit object.
	let habitNum = i + 1;
	console.log(`Creating Habit #${habitNum}.`);
	habits[i] = new Habit('', '#C9C9EE');
	let thisHabit = habits[i];

	// Getting table elements and adding row.
	const habitTable = document.getElementById('habits');
	const row = document.createElement('tr');
	const newRow = habitTable.appendChild(row);
	
	// Adding cells to the new row.
	for (let j = 0; j <= 7; j++) {
		if (j === 0) /* Habit Title */ {
			const headerCell = document.createElement('th');
			headerCell.setAttribute('class', 'habitCell');
			const headerCellInput = document.createElement('input');
			headerCellInput.setAttribute('type', 'text');
			headerCellInput.setAttribute('class', 'habitInput');
			headerCellInput.setAttribute('placeholder', 'Habit Name');
			headerCellInput.setAttribute('id', `habit${habitNum}Name`)

			headerCell.appendChild(headerCellInput);
			newRow.appendChild(headerCell);

			// Adding event listener to activate name change.
			// headerCellInput.addEventListener('change', event => {
			// 	thisHabit.name = headerCellInput.value;
			// 	console.log('Changing name of Habit #' + habitNum);


			// });
		} else /* Day cells */ {
			const cell = document.createElement('td');
			cell.setAttribute("class", "dayCell " + habitNum);
			cell.setAttribute("onclick", 
				`pressCell(this, '${thisHabit.color}')`);

			newRow.appendChild(cell);
		}
	}

	// Adding color input.
	const colorContainer = document.getElementById('colorContainer');
	const colorInput = document.createElement('input');
	colorInput.setAttribute('type', 'color');
	colorInput.setAttribute('class', 'colorSelection');
	colorInput.setAttribute('value', '#C9C9EE');
	colorInput.setAttribute('id', `habit${habitNum}Color`)

	colorContainer.appendChild(colorInput);

	// Adding event listener to activate color change.
	colorInput.addEventListener('change', event => {
		thisHabit.color = colorInput.value;
		console.log('Changing color of Habit #' + habitNum);

		const headerCellInput = document.getElementById(`habit${habitNum}Name`);
		headerCellInput.style.color = colorInput.value;

		const dayCells = document.getElementsByClassName(habitNum);
		for (cell of dayCells) {
			cell.setAttribute("onclick", 
				`pressCell(this, '${thisHabit.color}')`);
		}
	});

	i++;
}

// Creating first initial habit.
addHabit();

// Styling day cells as they are clicked.
function pressCell(el, color) {
	el.style.animation = null;
	el.offsetHeight;
	el.style.animation = 'insetShadow 0.5s ease-out 1';

	if (el.style.backgroundColor === "") {
		el.style.backgroundColor = color;
	} else {
		el.style.backgroundColor = null;
	}
}

let habitInputs = document.getElementsByClassName('habitInput');

// Edit mode.
let editMode = true;

function toggleEditMode() {
	const colorContainer = document.getElementById('colorContainer');
	const editButton = document.getElementById('editButton');
	const habitButton = document.getElementById('habitButton');

	editMode = !editMode;

	if (editMode) {
		colorContainer.style.display = 'block';
		
		for (el of habitInputs) {
		el.disabled = false;
		}

		habitButton.style.display = 'inline';

		// editButton.style.backgroundColor = 'white';
		// editButton.style.color = '#161412';
		editButton.style.animation = 'submitFlash 5s ease-in-out infinite';
		editButton.innerHTML = 'Submit';
	} else {
		colorContainer.style.display = 'none';

		for (el of habitInputs) {
		el.disabled = true;
		}

		habitButton.style.display = 'none';

		// editButton.style.backgroundColor = '#161412';
		editButton.style.color = 'white';
		editButton.style.animation = null;
		editButton.innerHTML = 'Edit';
	}
}
