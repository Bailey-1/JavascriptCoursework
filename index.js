'use strict';
// add your code here
// ...

function sumOfCharacters(candidate) {
	let sum = 0;
	for (let i = 0; i < candidate.length; i++) {
		sum += candidate.charCodeAt(i);
	}
	return sum;
}

function sentenceWordSums(sentence) {
	let results = [];
	let words = sentence.split(' ');

	let arrayNum = 0;
	//For each word in the sentence
	for (let i = 0; i < words.length; i++) {
		//Checks if the array element is empty and if true skips it.
		if (words[i] != '') {
			results[arrayNum] = sumOfCharacters(words[i]);
			arrayNum++; //Keeps this number seperate from i
		}
	}
	return results;
}

function sumOfSentence(sentence, min) {
	let total = 0;
	let words = sentence.split(' ');

	for (const word of words) {
		if (min <= word.length) {
			total += sumOfCharacters(word);
		}
	}
	return total;
}

function palindrome(candidate, ignore) {
	let letters;
	if (ignore == true) {
		letters = candidate
			.split(' ')
			.join('')
			.split('');
	} else {
		letters = candidate.split('');
	}

	if (letters.length == 0) {
		return false;
	}
	for (let i = 0; i < letters.length; i++) {
		let lastLocation = letters.length - 1 - i;

		if (letters[i] != letters[lastLocation]) {
			return false;
		}
	}
	return true;
}

function emojify(candidate) {
	candidate = candidate.split('(TM)').join('™️');
	candidate = candidate.split('<3').join('❤️');
	candidate = candidate.split(':-)').join('😀');

	//For some reason, it '<' shows up as '&lt;' and so doesnt get split by line 67. I think because i am using inner html instead.
	candidate = candidate.split('&lt;3').join('❤️');
	return candidate;
}

function pageEmojify(selector) {
	const selection = document.querySelector(selector);
	selection.textContent = emojify(selection.textContent);
	return selection;
}

function treeEmojify(selector) {
	let selection = document.querySelector(selector);
	selection.innerHTML = emojify(selection.innerHTML);
	return selection;
}

function clickAttacher(selector, cn) {
	let items = document.querySelectorAll(selector);

	for (const item of items) {
		item.addEventListener('click', function() {
			this.classList.toggle(cn);
		});
	}
}

function drawSaltire(elem) {
	const c = elem.getContext('2d');

	//Background
	c.fillStyle = '#0065bd';
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(elem.width, 0);
	c.lineTo(elem.width, elem.height);
	c.lineTo(0, elem.height);
	c.fill();

	//Crossed White lines
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

	//Dark Blue Background
	c.fillStyle = '#012169';
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(x, 0);
	c.lineTo(x, y);
	c.lineTo(0, y);
	c.closePath();
	c.fill();

	//Diagonal White Lines
	c.strokeStyle = 'white';
	c.lineWidth = 40;
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(x, y);
	c.moveTo(x, 0);
	c.lineTo(0, y);
	c.stroke();

	//Diagonal Red Lines
	c.fillStyle = red;
	c.strokeStyle = 'white';
	c.lineWidth = 0;
	//Top left
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(midX, midY);
	c.lineTo(midX - 26, midY);
	c.lineTo(0, 0 + 15);
	//Top Right
	c.moveTo(x, 0);
	c.lineTo(midX, midY);
	c.lineTo(midX - 26, midY);
	c.lineTo(x - 26, 0);
	//Bottom Left
	c.moveTo(0, y);
	c.lineTo(midX, midY);
	c.lineTo(midX + 26, midY);
	c.lineTo(26, y);
	//Bottom Right
	c.moveTo(x, y);
	c.lineTo(midX, midY);
	c.lineTo(midX + 26, midY);
	c.lineTo(x, y - 15);
	c.fill();

	//Straight White Lines
	c.lineWidth = 50;
	c.beginPath();
	c.moveTo(x / 2, 0);
	c.lineTo(x / 2, y);
	c.moveTo(0, y / 2);
	c.lineTo(x, y / 2);
	c.stroke();

	//Draw red lines
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
