var typeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.wordIndex = 0;
  this.period = parseInt(wait, 10);
  this.txt = '';
  this.type();
  this.isDeleting = false;
};

// type method
typeWriter.prototype.type = function() {
  // current index of word
  const current = this.wordIndex % this.words.length;

  // Get full text of current word
  const fullTxt = this.words[current];
  // check isDeleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  // initail typeSpeed
  let typeSpeed = 300;

  if(this.isDeleting) {
    typeSpeed /= 2;
  }
  // if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = 3000;
    // Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed)
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new typeWriter(txtElement, words, wait);
}