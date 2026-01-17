const form = document.querySelector(".planner-form");
const tripList = document.getElementById("trip-list");
const bookedList = document.getElementById("booked-list");

// Load booked trips from localStorage
window.onload = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.forEach(showBookedTrip);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const destination = document.getElementById("destination").value;
  const days = document.getElementById("days").value;
  const budget = document.getElementById("budget").value;

  const trip = document.createElement("div");
  trip.classList.add("trip-card");

  trip.innerHTML = `
        <h4>${destination}</h4>
        <p>Name: ${name}</p>
        <p>Days: ${days}</p>
        <p>Budget: ₹${budget}</p>
        <button class="book-btn">Book Trip</button>
    `;

  trip.querySelector(".book-btn").addEventListener("click", () => {
    bookTrip({ name, destination, days, budget });
    trip.remove();
  });

  tripList.appendChild(trip);
  form.reset();
});

function bookTrip(trip) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(trip);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Trip booked successfully!");
  showBookedTrip(trip);
}

function showBookedTrip(trip) {
  const bookedTrip = document.createElement("div");
  bookedTrip.classList.add("trip-card", "booked");

  bookedTrip.innerHTML = `
        <h4>${trip.destination}</h4>
        <p>Name: ${trip.name}</p>
        <p>Days: ${trip.days}</p>
        <p>Budget: ₹${trip.budget}</p>
        <button class="delete-btn">Cancel Booking</button>
    `;

  bookedTrip.querySelector(".delete-btn").addEventListener("click", () => {
    removeBooking(trip);
    bookedTrip.remove();
  });

  bookedList.appendChild(bookedTrip);
}

function removeBooking(trip) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings = bookings.filter(
    (b) => b.destination !== trip.destination || b.name !== trip.name,
  );
  localStorage.setItem("bookings", JSON.stringify(bookings));
}
