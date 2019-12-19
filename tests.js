"use strict";

QUnit.config.reorder = false;
const { test } = QUnit;



test(

  `Characters:
  Create a word scoring function 'sumOfCharacters' that accepts
  a string and returns the sum of the values of its UTF-16
  character codes.  e.g. 'A'=65, 'AB'=131 (i.e. 65+66), etc.`,
  function (assert) {

    if (!assert.functionExists('sumOfCharacters',['candidate'])) return;

    assert.equal(sumOfCharacters(""), 0, "The sum of an empty string is 0.");
    assert.equal(sumOfCharacters("A"), 65, "A=65");
    assert.equal(sumOfCharacters("AA"), 130, "AA=65+65=130");
    assert.equal(sumOfCharacters("AB"), 131, "AB=65+66=131");
    assert.equal(sumOfCharacters("ABC"), 198, "ABC=65+66+67=193");
    assert.equal(sumOfCharacters("PORT.AC.UK"), 709, "The sum for PORT.AC.UK is 709");
    assert.equal(sumOfCharacters("port.ac.uk"), 965, "The sum for port.ac.uk is 965, a different score because they are different characters:-)");

  });

test(

  `Words:
  Create a function 'sentenceWordSums' that takes one parameter which
  is a sentence (i.e. words separated by spaces),  The function must
  return an array containing the sum of the characters for each word.`,

  function (assert) {

    if (!assert.functionExists('sentenceWordSums',['sentence'])) return;

    assert.deepEqual(
      sentenceWordSums(""), [],
      "No words will result in an empty array of results."
    );

    assert.deepEqual(
      sentenceWordSums("AAA"), [195],
      "A single word of AAA results in a single score of 195."
    );

    assert.deepEqual(
      sentenceWordSums("AAA AAA AAA"), [195, 195, 195],
      "A three word sentence of AAA AAA AAA results in an array of three scores, all of which are 195."
    );

    assert.deepEqual(
      sentenceWordSums("The cat sat on the mat."), [289, 312, 328, 221, 321, 368],
      "A simple six word sentence."
    );

    assert.deepEqual(
      sentenceWordSums("What  about  multiple     spaces?"), [404, 539, 876, 702],
      "Extra white space should not result in extra scores being added to the results."
    );

  }
);


test(

  `Sentence Sums:
  Create a function 'sumOfSentence' that takes two parameters,
  the first is a sentence (i.e. space separated words),
  the second is a number that represents a minimum length.
  The function must return a single number that is the sum of
  the values of the sentences' UTF-16 character codes.
  When summing the characters, words whose length is less
  than the second parameter should be ignored.`,

  function (assert) {


    if (!assert.functionExists('sumOfSentence',['sentence', 'min'])) return;

    assert.equal(
      sumOfSentence( "", 0),
      0,
      "No words and no length will result in a zero sum."
    );

    assert.equal(
      sumOfSentence( "AAA", 3),
      195,
      "This single word of AAA is 3 characters, which matches the  minimum length, so the result should be 195."
    );

    assert.equal(
      sumOfSentence( "AAA", 4),
      0,
      "This single word of AAA is shorter than the provided minimum length of 4, so AAA should be ignored, thus the result is 0."
    );


    assert.equal(
      sumOfSentence( "A AA AAA AAAA", 3),
      455,
      "A four word sentence containing two words that should be ignored and two that should be counted.  This there are 7A characters to include and the result should be 455."
    );

    assert.equal(
      sumOfSentence( "The cat sat on the mat.", 5),
      0,
      "A simple six word sentence with minimum length 5, so no words should be counted."
    );

    assert.equal(
      sumOfSentence( "The cat sat on the mat.", 4),
      368,
      "A simple six word sentence with minimum length 4, so only `mat.` should be counted."
    );

    assert.equal(
      sumOfSentence( "The cat sat on the mat.", 3),
      1618,
      "A simple six word sentence with minimum length 3, so everything but `on` should be counted."
    );

    assert.equal(
      sumOfSentence( "The cat sat on the mat.", 2),
      1839,
      "A simple six word sentence with minimum length 2, so everything should be counted."
    );

    assert.equal(
      sumOfSentence( "Hold the newsreader's nose squarely, waiter, or friendly milk will countermand my trousers.", 10),
      2410,
      "A longer sentence with a higher minimum - only the words `newsreader's` and `countermand` are over 10 characters.  They are worth 1226 + 1184 = 2410."
    );


    assert.equal(
      sumOfSentence( "What  about  multiple     spaces?", 2),
      2521,
      "Extra white space should not result in extra scores being added to the results."
    );

  }
);


test(

  `Palindrome:
  Create a function 'palindrome' that accepts two parameters:
  a string parameter, and a boolean. The function returns
  true if the string provided is a palindrome. If the second
  parameter is true, whitespace must be ignored by the test,
  so e.g. both 'a ha' and 'abb a' would be recognised as
  palindromes.`,

  function (assert) {

    if (!assert.functionExists('palindrome',['candidate', 'ignore'])) return;

    assert.equal(
      palindrome(""),
      false,
      "An empty string cannot be a palindrome for there is no forwards nor backwards."
    );

    assert.equal(
      palindrome("A"),
      true,
      "Single characters are palindromes"
    );

    assert.equal(
      palindrome("ABBA"),
      true,
      "Palindromes may have an even number of characters (e.g. 4)."
    );

    assert.equal(
      palindrome("ABB A", true),
      true,
      "Palindromes may have an even number of characters (e.g. 4) and spaces if the second parameter is true."
    );

    assert.equal(
      palindrome("EYE"),
      true,
      "Palindromes may have an odd number of characters (e.g. 3)."
    );

    assert.equal(
      palindrome("egad a base tone denotes a bad age"),
      false,
      "If a sentence has the letters mirrored but has different spaces, then it's not a pure palindrome."
    );

    assert.equal(
      palindrome("egadabasetonedenotesabadage"),
      true,
      "... and now we test the same characters without the white space present."
    );

    assert.equal(
      palindrome("egad a base tone denotes a bad age", true),
      true,
      "Now let's test the same sentence as before, but this time we ignore the whitespace... its characters *are* indeed palindromic."
    );

    assert.equal(
      palindrome("this is not a palindrome"),
      false,
      "Not all sentences are palindromes, obviously."
    );
  }
);


test(

  `Emojify:
  Create a function called 'emojify' that accepts one parameter,
  a string, and converts special character sequences to emoji
  before returning the improved string.
  The special sequences are '(TM)', '<3', and ':-)'.  Your function
  should convert them to  ™️, ❤️, and 😀, respectively.`,

  function (assert) {
    if (!assert.functionExists('emojify', ['candidate'])) return;
    assert.equal(emojify("no change"), "no change", "A string that does not change.");
    assert.equal(emojify("(TM)"), "™️", "Replace (TM) with ™️.");
    assert.equal(emojify("<3"), "❤️", "Replace <3 with ❤️.");
    assert.equal(emojify(":-)"), "😀", "Replace :-) with 😀.");
    assert.equal(emojify("SoftEng(TM)"), "SoftEng™️", "™️ at the end of a word.");
    assert.equal(emojify("I <3 JS"), "I ❤️ JS", "❤️ in a sentence.");
    assert.equal(emojify(":-):-):-)<3<3<3"), "😀😀😀❤️❤️❤️", "Yay! 😀😀😀❤️❤️❤️ Even repeat emoji are replaced!");
  }

);


test(

  `Page Emojify:
  Create a function called 'pageEmojify' that accepts
  one parameter which is a CSS selector, and having selected
  that element, uses the emojify function in order to
  replace any shortcuts with their respective emoji.`,

  function (assert) {
    if (!assert.functionExists('pageEmojify', ['selector'])) return;

    pageEmojify("#e1");
    assert.equal(window.e1.textContent, "😀", "Smiley works.");

    pageEmojify("#e2");
    assert.equal(window.e2.textContent, "™️", "™️ works.");

    pageEmojify("#e3");
    assert.equal(window.e3.textContent, "SoftEng™️ 😀", "Combinations work.");

    pageEmojify("#e4");
    assert.equal(window.e4.textContent, "Do you ❤️ me now?", "Heart works!");

    pageEmojify("#e5");
    assert.equal(window.e5.textContent, "😀😀😀❤️❤️❤️", "All working!");

  }
);


test(

  `Tree Emojify:
  Create a function called 'treeEmojify' that accepts one parameter
  which is a CSS selector.  All child elements and all text within the
  selected element should be modified such that all text is
  transformed using the emojify function.  The function must only
  change text inside the element, and inside child elements.
  The element structure of the document must not change.`,

  function (assert) {
    if (!assert.functionExists('treeEmojify', ['selector'])) return;

    treeEmojify("#emojiAdvanced");

    assert.equal(window.ea1 && window.ea1.textContent, "😀", "Smiley works.");
    assert.equal(window.ea2 && window.ea2.textContent, "™️", "™️ works.");
    assert.equal(window.ea3 && window.ea3.textContent, "SoftEng™️ :-)", "Spans are honoured.");
    assert.equal(window.ea4 && window.ea4.textContent, "Do you ❤️ me now?", "Heart works!");
    assert.equal(window.ea5 && window.ea5.textContent, "😀😀😀❤️❤️❤️", "All smiles and hearts!");
  }
);


test(
  `Click Attacher:
  Create a function called 'clickAttacher' that accepts
  two parameters.

  The first parameter is a CSS selector and the second
  is a class name.

  The function should add an event listener to all the
  selected elements identified by the selector.

  Create an event handler function that is invoked
  upon a 'click' event.  It should toggle the provided
  classname on the clicked element.`,

  function (assert) {

    if (!assert.functionExists('clickAttacher', ['selector','cn'])) return;

    assert.equal(
      window.clickables.firstElementChild.classList.contains("red"),
      false,
      "Before we begin the FIRST elem has no `red` class."
    );

    assert.equal(
      window.clickables.firstElementChild.classList.contains("red"),
      false,
      "Before we begin the LAST elem has no `red` class."
    );

    clickAttacher("#clickables *", "red");

    assert.equal(
      window.clickables.firstElementChild.classList.contains("red"),
      false,
      "After attaching the first elem STILL has no `red` class."
    );

    // pretend to be a user clicking the first element.
    window.clickables.firstElementChild.dispatchEvent(new MouseEvent("click"));
    assert.equal(
      window.clickables.firstElementChild.classList.contains("red"),
      true,
      "After a click the first elem has the `red` class."
    );

    window.clickables.firstElementChild.dispatchEvent(new MouseEvent("click"));
    assert.equal(
      window.clickables.firstElementChild.classList.contains("red"),
      false,
      "After a second click the first elem must have no `red` class."
    );

    clickAttacher("span", "uop");
    if (window.nested6) {
      window.nested6.dispatchEvent(new MouseEvent("click"));
      assert.equal(
        window.nested6.classList.contains("uop"),
        true,
        "When this test works, every span on the page is clickable."
      );
    }
  }
);



test(
  `Write a drawSaltire function that accepts one
   parameter 'elem' which is a canvas.  It should
   draw the Scottish flag to fit the canvas.`, (assert) => {

    assert.functionExists( 'drawSaltire', ['elem'] );
    const flag = document.querySelector("#scotland");
    let studentHappy = drawSaltire(flag);
    assert.ok( studentHappy, "This test passes when you decide it's finished (by returning true from your function)." );

  }
);


test(
  `Write a drawUnion function that accepts one
   parameter 'elem' which is a canvas.  It should
   draw the Union Jack to fit the canvas.`, (assert) => {

    assert.functionExists( 'drawUnion', ['elem'] );
    const flag = document.querySelector("#union");
    let studentHappy = drawUnion(flag);
    assert.ok( studentHappy, "This test passes when you decide it's finished (by returning true from your function)." );

  }
);


test(
  `Advanced Challenge:

  Write a makePi function that takes two parameters.

  The first parameter 'elem' is a container in
  which your function should append a new canvas
  element that it creates.

  The second parameter 'data' is an array of
  data that needs to be visualised.

  The data is composed of multiple objects.
  Each object has a name and a value,
  for example:

  [
    {"name": "apples", "value": 25},
    {"name": "bananas", "value": 25},
    {"name": "carrots", "value": 10},
    {"name": "tomatoes", "value": 40}
  ]

  You may present your pi chart any way you wish
  so long as we are able to interpret it.

  You will need to work with the arc function to
  achieve this challenge... it is not trivial!

   `, (assert) => {

    assert.functionExists( 'makePi', ['elem', 'data'] );

    const elem = document.querySelector("#pies");

    makePi(
      elem,
      [
        {"name": "apples", "value": 25},
        {"name": "bananas", "value": 25},
        {"name": "carrots", "value": 10},
        {"name": "tomatoes", "value": 40}
      ]
    );

    let studentHappy = makePi(
      elem,
      [
        {"name": "Students", "value": 25000},
        {"name": "Lecturers", "value": 3000},
        {"name": "Other Staff", "value": 6000},
        {"name": "Board of Governors", "value": 12}
      ]
    );

    assert.ok( studentHappy, "This test passes when you decide it's finished (by returning true from your function)." );

  }
);
