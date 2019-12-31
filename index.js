'use strict';
// add your code here
// ...

function sumOfCharacters(candidate) {
	let sum = 0;
	// Goes through the string and adds the character code for each character to a total value.
	for (let i = 0; i < candidate.length; i++) sum += candidate.charCodeAt(i);
	return sum;
}

function sentenceWordSums(sentence) {
	let results = [];
	let words = sentence.split(' ');

	let arrayNum = 0;
	for (let i = 0; i < words.length; i++) {
		// Checks if the array element is empty and if true skips it
		if (words[i] != '') {
			results[arrayNum] = sumOfCharacters(words[i]);
			// Only increments if a valid word has been found which is why it doesnt use i
			arrayNum++;
		}
	}
	return results;
}

function sumOfSentence(sentence, min) {
	let total = 0;
	let words = sentence.split(' ');

	for (const word of words) {
		if (min <= word.length) total += sumOfCharacters(word);
	}
	return total;
}

function palindrome(candidate, ignore) {
	if (candidate.length == 0) return false;

	// Splits the string into an array and removes spaces from it if 'ignore' is true.
	let letters = ignore
		? candidate
				.split(' ')
				.join('')
				.split('')
		: candidate.split('');

	// Iterates through the array and compares the value of one element to the value of the opposite.
	// For example, the first element is compared to the last and the second element is compared to the second to last and so on.
	for (let i = 0; i < letters.length; i++) {
		let lastLocation = letters.length - 1 - i;
		// If the elements does not match, the function returns false early.
		if (letters[i] != letters[lastLocation]) return false;
	}
	// If the function runs without returning false, it means it is a palindrome.
	return true;
}

function emojify(candidate) {
	// Splits the string at a character combination and uses another to join the array together.
	candidate = candidate.split('(TM)').join('™️');
	candidate = candidate.split('<3').join('❤️');
	candidate = candidate.split(':-)').join('😀');
	candidate = candidate.split('&lt;3').join('❤️');
	return candidate;
}

function pageEmojify(selector) {
	const selection = document.querySelector(selector);
	// Sets the text within the element to equal the output of the emojify function.
	selection.textContent = emojify(selection.textContent);
	return selection;
}

function treeEmojify(selector) {
	const selection = document.querySelector(selector);
	// Sets the innerHTML of the selection to equal the output of the emojify function
	selection.innerHTML = emojify(selection.innerHTML);
	return selection;
}

function clickAttacher(selector, cn) {
	// Selects all items in the document, not just the first one
	let items = document.querySelectorAll(selector);

	for (const item of items) {
		// Adds a event listener for each item of the array
		item.addEventListener('click', function() {
			// Toggle class
			this.classList.toggle(cn);
		});
	}
}

function drawSaltire(elem) {
	const c = elem.getContext('2d');

	// Background rectangle
	c.fillStyle = '#0065bd';
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(elem.width, 0);
	c.lineTo(elem.width, elem.height);
	c.lineTo(0, elem.height);
	c.fill();

	// Draw the crossed White lines
	c.strokeStyle = 'white';
	c.lineWidth = 40;
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(elem.width, elem.height);
	c.moveTo(elem.width, 0);
	c.lineTo(0, elem.height);
	c.stroke();
	return true;
}

function drawUnion(elem) {
	const c = elem.getContext('2d');
	const x = elem.width;
	const y = elem.height;
	const midX = x / 2;
	const midY = y / 2;
	const red = '#c8102e';

	// Dark Blue Background
	c.fillStyle = '#012169';
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(x, 0);
	c.lineTo(x, y);
	c.lineTo(0, y);
	c.closePath();
	c.fill();

	// Diagonal White Lines
	c.strokeStyle = 'white';
	c.lineWidth = 40;
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(x, y);
	c.moveTo(x, 0);
	c.lineTo(0, y);
	c.stroke();

	// Diagonal Red Lines
	c.fillStyle = red;
	c.strokeStyle = 'white';
	c.lineWidth = 0;

	// Top left
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(midX, midY);
	c.lineTo(midX - 26, midY);
	c.lineTo(0, 0 + 15);

	// Top Right
	c.moveTo(x, 0);
	c.lineTo(midX, midY);
	c.lineTo(midX - 26, midY);
	c.lineTo(x - 26, 0);

	// Bottom Left
	c.moveTo(0, y);
	c.lineTo(midX, midY);
	c.lineTo(midX + 26, midY);
	c.lineTo(26, y);

	// Bottom Right
	c.moveTo(x, y);
	c.lineTo(midX, midY);
	c.lineTo(midX + 26, midY);
	c.lineTo(x, y - 15);
	c.fill();

	// Straight White Lines
	c.lineWidth = 50;
	c.beginPath();
	c.moveTo(x / 2, 0);
	c.lineTo(x / 2, y);
	c.moveTo(0, y / 2);
	c.lineTo(x, y / 2);
	c.stroke();

	// Draw red lines
	c.strokeStyle = red;
	c.lineWidth = 30;
	c.beginPath();
	c.moveTo(x / 2, 0);
	c.lineTo(x / 2, y);
	c.moveTo(0, y / 2);
	c.lineTo(x, y / 2);
	c.stroke();
	return true;
}

function makePi(elem, data) {
	// Create a canvas element
	const newCanvas = document.createElement('canvas');

	// Set canvas size
	newCanvas.width = '600';
	newCanvas.height = '600';

	// Append the canvas element to the document.
	elem.appendChild(newCanvas);
	const c = newCanvas.getContext('2d');

	// Create a varaible with the total value of all pie sectors.
	let total = 0;
	for (const item of data) total += item.value;

	const colors = ['blue', 'purple', 'green', 'orange'];

	// Draw chart
	let startAngle = 1.5 * Math.PI; // So the pi chart will start at a 12 oclock position not at 3.
	let angleSize = 0;
	for (let i = 0; i < data.length; i++) {
		// Set Angle Size in Radians
		angleSize = (2 * Math.PI * data[i].value) / total;
		makeSector(c, startAngle, startAngle + angleSize, colors[i]);
		// Add the size of the sector that has just been created to the start angel so it will continue from where it left.
		startAngle += angleSize;
	}

	// Draw Text
	c.font = '20px Arial';
	let y = 30;
	for (let i = 0; i < data.length; i++) {
		c.beginPath();
		c.fillStyle = colors[i];
		c.fillText(data[i].name, 10, y);
		// Lower the location for the next fillText()
		y += 30;
	}

	return true;
}

// Function to create each sector of the pie.
function makeSector(c, startAngle, angleSize, color) {
	const x = 300;
	const y = 300;
	c.fillStyle = color;

	c.beginPath();
	c.arc(x, y, 200, startAngle, angleSize, false);
	c.lineTo(x, y);
	c.fill();
}
