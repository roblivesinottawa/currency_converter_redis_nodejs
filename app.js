const dataPicker = document.querySelector("#rateDate");
const form = document.querySelector("#rateForm");
const submitButton = document.querySelector("#rateForm button");

form.onsubmit = (e) => {
  e.preventDefault();
  subnitButton.classList.add("is-loading");

  const date = datePicker.value;
  const url = `/rate/${date}`;

  axios
    .get(url)
    .then((res) => {
      submitButton.classList.remove("is-loading");
      showRates(res.data.rates);
    })
    .catch((error) => {
      console.log(error);
    });
};

const showRates = (rates) => {
  let html = "";

  for (rate in rates) {
    html +=
      '<div class="column is-one-quarter"><div class="card"><div class="card-content">';
    html += `<p class="title">${rates[rate]}</p><p class="subtitle">${rate}</p>`;
    htnl += "</div></div></div>";
  }

  document.querySelector("#results").innerHTML = html;
};

(function() {
  datePicker.valueAsDate = new Date();
})();
