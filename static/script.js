document.addEventListener("DOMContentLoaded", () => {
  function openNav() {
    document.getElementById("sideBar").style.width = "100%";
    document.getElementById("sideNav").style.width = "40%";
  }

  /*Close navigation*/
  function exitNav() {
    document.getElementById("sideBar").style.width = "0";
    document.getElementById("sideNav").style.width = "0";
  }
  document
    .querySelectorAll(".navBtn")
    .forEach((b) => (b.onclick = () => openNav()));

  document.querySelector("#Xbtn").onclick = () => {
    exitNav();
  };

  const dropdown = document.querySelector("#dropdown");
  const dropdownItems = document.querySelector("#dropdown-items");

  // Toggle dropdown visibility when the dropdown button is clicked
  dropdown.onclick = (e) => {
    e.stopPropagation(); // 🙅‍♂️ Prevent the click event from bubbling up to the document
    dropdownItems.classList.toggle("hidden");
  };

  // Close the dropdown when clicking outside of it
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !dropdownItems.contains(e.target)) {
      dropdownItems.classList.add("hidden");
    }
  });

  // Get the textarea element
  const textarea = document.getElementById("post-textarea");

  // Function to auto-resize the textarea
  function autoResizeTextarea() {
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  }

  // Add an event listener for the 'input' event
  textarea.addEventListener("input", autoResizeTextarea);

  // Optionally, trigger the resize on page load if there's initial content
  autoResizeTextarea();
});
