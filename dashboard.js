document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "user.unknown";

  let firstName = "User";

  if (username) {
    const parts = username.split(".");
    if (parts.length > 0) {
      firstName = capitalize(parts[0]); // e.g., "jata" becomes "Jata"
    }
  }

  const profileCircle = document.getElementById("profileCircle");
  const profileName = document.getElementById("profileName");

  profileCircle.textContent = firstName.charAt(0).toUpperCase();
  profileName.textContent = firstName;

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // ===== New code for Rooms / Requests tabs =====

  const navRooms = document.getElementById("navRooms");
  const navRequests = document.getElementById("navRequests");
  const roomsSection = document.querySelector(".rooms-section");
  const requestsSection = document.querySelector(".request-section");

  function showRooms() {
    navRooms.classList.add("active");
    navRequests.classList.remove("active");
    roomsSection.classList.add("active");
    requestsSection.classList.remove("active");
  }

  function showRequests() {
    navRequests.classList.add("active");
    navRooms.classList.remove("active");
    requestsSection.classList.add("active");
    roomsSection.classList.remove("active");
  }

  navRooms.addEventListener("click", showRooms);
  navRequests.addEventListener("click", showRequests);

  // Show Rooms tab by default
  showRooms();
});
