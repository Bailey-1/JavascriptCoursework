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

	//For each word in the sentence
	let place = 0;
	//console.log(words);
	let arrayNum = 0;
	//For each word in the sentence
	for (let i = 0; i < words.length; i++) {
		//console.log('words %' + words[i] + '%');
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
			.split(''); //Pretty cool right
	} else {
		letters = candidate.split('');
	}

	console.log('letters', letters);
	//console.log('ignore', ignore);

	if (letters.length == 0) {
		return false;
	}

	for (let i = 0; i < letters.length; i++) {
		//console.log('letters', i, letters[i]);
		let lastLocation = letters.length - 1 - i;
		//console.log('compare', letters[i], letters[lastLocation]);

		if (letters[i] == letters[lastLocation]) {
			//console.log('single', letters[i]);
		} else {
			return false; //If it doesnt match
		}
	}
	return true;
}
