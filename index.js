document.addEventListener("DOMContentLoaded", function () {
  // Your original code for showing pop-ups
  let popups = [
    "popup1",
    "popup2",
    "popup3",
    "popup4",
    "popup5",
    "popup6",
    "popup7",
    "popup8",
    "popup9",
  ];
  let currentPopup = 0;
  const padding = 20;

  function showPopup() {
    if (currentPopup < popups.length) {
      let popupElement = document.getElementById(popups[currentPopup]);
      // Correctly calculating the maximum x and y values
      let maxX = window.innerWidth - popupElement.offsetWidth - padding;
      let maxY = window.innerHeight - popupElement.offsetHeight - padding;

      // Ensuring the pop-up's position is within the bounds of the viewport
      let randomX = Math.max(padding, Math.min(maxX, Math.random() * maxX));
      let randomY = Math.max(padding, Math.min(maxY, Math.random() * maxY));

      popupElement.style.left = `${randomX}px`;
      popupElement.style.top = `${randomY}px`;
      popupElement.style.display = "block";

      currentPopup++;
      setTimeout(showPopup, 2000);
    }
  }

  setTimeout(showPopup, 2000);

  // Your original code for close and enlarge buttons
  let popupElements = document.querySelectorAll(".popup");
  popupElements.forEach(function (popup) {
    let closeButton = popup.querySelector(".control.close");
    let enlargeButton = popup.querySelector(".control.enlarge");

    closeButton.addEventListener("click", function () {
      popup.style.display = "none";
    });

    enlargeButton.addEventListener("click", function () {
      popup.classList.toggle("enlarged");
      if (popup.classList.contains("enlarged")) {
        popup.style.width = "200px"; // Adjust size as needed
        popup.style.height = "220px"; // Adjust size as needed
      } else {
        popup.style.width = "80px"; // Original size
        popup.style.height = "80px"; // Original size
      }
    });
  });

  // Updated drag and drop functionality with drop zone
  const dropZone = document.getElementById("drop-zone");

  dropZone.addEventListener("dragover", function (e) {
    e.preventDefault(); // Prevent default to allow drop
  });
  
  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
  
    if (droppedElement && droppedElement.classList.contains("popup")) {
      // Append the dropped element to the drop zone
      this.appendChild(droppedElement);
      // Reset position to make it absolute relative to drop zone
      droppedElement.style.position = "absolute";
      // Offset each dropped popup to create an overlap
      const offset = 10; // Adjust this value for the desired amount of overlap
      droppedElement.style.top = `0px`;
      droppedElement.style.left = `0px`;
    }
  });

  popupElements.forEach(function (popup) {
    // Update for draggable popups
    popup.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text", this.id);
    });
  });
  document.getElementById('print-icon').addEventListener('click', function () {
    var content = document.getElementById('drop-zone').innerHTML;
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    // Add any required styles here
    printWindow.document.write('<style> /* Your styles for printing */ </style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});
});
function toggleExhibitionDescription() {
  var modalContent = document.getElementById('exhibition-description-modal');
  var backdrop = document.getElementById('modal-backdrop');
  var body = document.body;
  
  if (backdrop.style.display === 'block') {
    backdrop.style.display = 'none';
    modalContent.style.display = 'none';
    body.classList.remove('modal-open');
  } else {
    backdrop.style.display = 'block';
    modalContent.style.display = 'block';
    body.classList.add('modal-open');
  }
}