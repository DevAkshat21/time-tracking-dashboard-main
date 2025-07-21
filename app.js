fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((member) => {
      const id = member.title.toLowerCase().replace(" ", "-"); // e.g. "Self Care" → "self-care"
      const weekly = document.getElementById(`${id}-weekly`);
      const previous_weekly = document.getElementById(`${id}-weekly-previous`);
      const current = document.getElementById(`${id}-daily`);
      const previous_daily = document.getElementById(`${id}-daily-previous`);
      const monthly = document.getElementById(`${id}-monthly`);
      const previous_monthly = document.getElementById(
        `${id}-monthly-previous`
      );

      if (weekly && previous_weekly) {
        weekly.textContent = `${member.timeframes.weekly.current} hrs`;
        previous_weekly.textContent = `Last Week - ${member.timeframes.weekly.previous} hrs`;
      }

      if (monthly && previous_monthly) {
        monthly.textContent = `${member.timeframes.monthly.current} hrs`;
        previous_monthly.textContent = `Last Month - ${member.timeframes.monthly.previous} hrs`;
      }

      if (current && previous_daily) {
        current.textContent = `${member.timeframes.daily.current} hrs`;
        previous_daily.textContent = `Yesterday - ${member.timeframes.daily.previous} hrs`;
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

function switchView(element) {
  const links = document.querySelectorAll(".view-switcher a");
  links.forEach((link) => link.classList.remove("active"));
  element.classList.add("active");

  const view = element.textContent.trim().toLowerCase();

  const daily = document.querySelectorAll(".daily, .previous-daily");
  const weekly = document.querySelectorAll(".weekly, .previous-weekly");
  const monthly = document.querySelectorAll(".monthly, .previous-monthly");

  function hideAll(elements) {
    elements.forEach((el) => (el.style.display = "none"));
  }

  function showAll(elements) {
    elements.forEach((el) => (el.style.display = "inline"));
  }

  // Hide all
  hideAll(daily);
  hideAll(weekly);
  hideAll(monthly);

  // Show only selected view
  if (view === "daily") showAll(daily);
  if (view === "weekly") showAll(weekly);
  if (view === "monthly") showAll(monthly);
}
