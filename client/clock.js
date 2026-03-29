function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const is12hr = clock.classList.contains("12hr");
  const hideAmpm = clock.classList.contains("hide-ampm");
  const hideSecs = clock.classList.contains("hide-secs");
  const hideExtraZeroes = clock.classList.contains("hide-extra-zeroes");

  let ampm = "";

  if (is12hr) {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
  }

  // Only zero-pad hours if hide-extra-zeroes is not set
  if (!hideExtraZeroes && hours < 10) hours = "0" + hours;
  // Always pad minutes and seconds
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  if (hideSecs) {
    clock.innerHTML = `${hours}:${minutes}${!hideAmpm && ampm ? `<span class="ampm">${ampm}</span>` : ""}`;
  } else {
    clock.innerHTML = `${hours}:${minutes}:${seconds}${!hideAmpm && ampm ? `<span class="ampm">${ampm}</span>` : ""}`;
  }
}

setInterval(updateClock, 1000);
updateClock();