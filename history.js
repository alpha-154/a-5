document.addEventListener("DOMContentLoaded", () => {
  const donationPageBtn = document.getElementById("donation-page-btn");
  const historyPageBtn = document.getElementById("history-page-btn");

  historyPageBtn.classList.add("bg-lime-400", "text-neutral-900");
  donationPageBtn.classList.add("bg-slate-100", "text-neutral-900");

  historyPageBtn.classList.remove("bg-slate-100", "text-slate-500");
  donationPageBtn.classList.remove("bg-lime-400", "text-neutral-900");
});

function updateTotalDonation() {
  const totalValueElem = document.getElementById("total-value");
  const totalDonation = localStorage.getItem("totalDonation") || "5500";
  totalValueElem.textContent = `${totalDonation} BDT`;
}

updateTotalDonation();

function displayDonationHistory() {
  const historyContainer = document.querySelector("#history");
  const history = JSON.parse(localStorage.getItem("donationHistory")) || [];

  history.forEach((donation) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add(
      "flex",
      "flex-col",
      "gap-2",
      "p-5",
      "border",
      "rounded-lg",
      "border-slate-300"
    );

    const causeElem = document.createElement("h1");
    causeElem.classList.add("text-xl", "font-bold", "text-neutral-900");
    causeElem.textContent = `${donation.amount} is Donated for ${donation.cause}`;

    const dateElem = document.createElement("p");
    dateElem.classList.add("text-md", "text-neutral-400");
    dateElem.textContent = `Date: ${new Date(donation.date).toLocaleString()}`;

    historyItem.appendChild(causeElem);
    historyItem.appendChild(dateElem);

    historyContainer.appendChild(historyItem);
  });
}

displayDonationHistory();
