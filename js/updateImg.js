const dropArea = document.getElementById("dropArea");

// Prevent default behaviors for drag events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when dragging files over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

// Remove highlight when dragging files outside of the drop area
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Prevent default behavior for drag events
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Add highlight to the drop area
function highlight() {
  dropArea.classList.add('highlight');
}

// Remove highlight from the drop area
function unhighlight() {
  dropArea.classList.remove('highlight');
}

// Handle dropped files
function handleDrop(e) {
    console.log("handleDrop - ");
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const fileData = event.target.result;
    localStorage.setItem('backgroundImage', fileData);
    document.body.style.backgroundImage = `url(${fileData})`;
  };

  reader.readAsDataURL(file);

  const backgroundImage = localStorage.getItem('backgroundImage');

  if (backgroundImage) {
    // document.body.style.backgroundImage = `url(${backgroundImage})`;


}

}