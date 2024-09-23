
document.addEventListener("DOMContentLoaded", () => {

  const donationPageBtn = document.getElementById("donation-page-btn");
  const historyPageBtn = document.getElementById("history-page-btn");

  donationPageBtn.classList.add("bg-lime-400", "text-neutral-900");
  historyPageBtn.classList.add("bg-slate-100", "text-neutral-900");

  donationPageBtn.classList.remove("bg-slate-100", "text-slate-500");
  historyPageBtn.classList.remove("bg-lime-400", "text-neutral-900");
});




const inputField_1 = document.getElementById("donation-noakhali-input");
const inputField_2 = document.getElementById("donation-quota-input");
const inputField_3 = document.getElementById("donation-feni-input");
const inputFields = [inputField_1, inputField_2, inputField_3];


const totalNoakhaliElem = document.getElementById("donation-noakhali-total");
const totalQuotaElem = document.getElementById("donation-quota-total");
const totalFeniElem = document.getElementById("donation-feni-total");
const donationTotals = {
  "Flood at Noakhali": totalNoakhaliElem,
  "Flood Relief in Feni": totalFeniElem,
  "Aid for Injured in the Quota Movement": totalQuotaElem,
};


function updateTotalDonation() {
  const totalValueElem = document.getElementById("total-value");
  const totalDonation = localStorage.getItem("totalDonation") || "5500";
  totalValueElem.textContent = `${totalDonation} BDT`;


  if (parseInt(totalDonation) === 0) {
    inputFields.forEach((input) => (input.disabled = true));
  }


  const storedTotals = JSON.parse(localStorage.getItem("donationTotals")) || {};
  Object.keys(donationTotals).forEach((cause) => {
    donationTotals[cause].textContent = `${storedTotals[cause] || 0} BDT`;
  });
}


function handleDonation(donationInputId, donationTotalId, cause) {
  const inputElem = document.getElementById(donationInputId);
  const totalElem = document.getElementById(donationTotalId);
  const amount = parseInt(inputElem.value.trim());


  const overallTotal = parseInt(localStorage.getItem("totalDonation")) || 5500;

  if (!isNaN(amount) && amount > 0 && overallTotal - amount >= 0) {

    const currentTotal = parseInt(totalElem.textContent) || 0;
    const newTotal = currentTotal + amount;
    totalElem.textContent = `${newTotal} BDT`;


    const updatedTotal = overallTotal - amount;
    localStorage.setItem("totalDonation", updatedTotal);


    const history = JSON.parse(localStorage.getItem("donationHistory")) || [];
    history.push({
      cause,
      amount: `${amount} BDT`,
      date: new Date().toString(),
    });
    localStorage.setItem("donationHistory", JSON.stringify(history));


    const storedTotals =
      JSON.parse(localStorage.getItem("donationTotals")) || {};
    storedTotals[cause] = newTotal;
    localStorage.setItem("donationTotals", JSON.stringify(storedTotals));


    inputElem.value = "";


    updateTotalDonation();

    alert("Thank you for your donation!");
  } else {
    alert("Please enter a valid donation amount.");
  }
}


document
  .getElementById("donation-noakhali-btn")
  .addEventListener("click", () => {
    handleDonation(
      "donation-noakhali-input",
      "donation-noakhali-total",
      "Flood at Noakhali"
    );
  });

document.getElementById("donation-feni-btn").addEventListener("click", () => {
  handleDonation(
    "donation-feni-input",
    "donation-feni-total",
    "Flood Relief in Feni"
  );
});

document.getElementById("donation-quota-btn").addEventListener("click", () => {
  handleDonation(
    "donation-quota-input",
    "donation-quota-total",
    "Aid for Injured in the Quota Movement"
  );
});




updateTotalDonation();

