// Immediately Invoked Function Expression to avoid global scope pollution
(function() {
  // Registration fees and startup costs in USD
  const baseRegistrationUSD = { small: 2000, medium: 3000, large: 5000 };
  const startupUSD = { small: 30000, medium: 70000, large: 200000 };

  // Elements
  const countrySelect = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const regSymbolEl = document.getElementById('regSymbol');
  const regValueEl = document.getElementById('regValue');
  const declSymbolEl = document.getElementById('declSymbol');
  const declValueEl = document.getElementById('declValue');
  const startupUSDEl = document.getElementById('startupUSD');
  const startupLocalEl = document.getElementById('startupLocal');
  const radioCards = document.querySelectorAll('.radio-card');
  const interestType = document.getElementById('interest_type');
  const existingWrap = document.getElementById('existing_location_wrap');
  const newWrap = document.getElementById('new_site_wrap');
  const previewBtn = document.getElementById('previewFees');
  const form = document.getElementById('applyForm');
  const formMsg = document.getElementById('form-msg');
  const thankYouPanel = document.getElementById('thankYouPanel');

  // Initialize intl-tel-input
  const iti = window.intlTelInput(phoneInput, {
    separateDialCode: true,
    preferredCountries: ["gb","us","ca","au","in"],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.5.3/build/js/utils.js"
  });

  // --- Country Data ---
  const countries = [
  { iso: "US", emoji: "🇺🇸", currency: "$", usdRate: 1 },
  { iso: "CA", emoji: "🇨🇦", currency: "CA$", usdRate: 1.35 },
  { iso: "GB", emoji: "🇬🇧", currency: "£", usdRate: 0.81 },
  { iso: "IE", emoji: "🇮🇪", currency: "€", usdRate: 0.93 },
  { iso: "DE", emoji: "🇩🇪", currency: "€", usdRate: 0.93 },
  { iso: "FR", emoji: "🇫🇷", currency: "€", usdRate: 0.93 },
  { iso: "ES", emoji: "🇪🇸", currency: "€", usdRate: 0.93 },
  { iso: "IT", emoji: "🇮🇹", currency: "€", usdRate: 0.93 },
  { iso: "NL", emoji: "🇳🇱", currency: "€", usdRate: 0.93 },
  { iso: "BE", emoji: "🇧🇪", currency: "€", usdRate: 0.93 },
  { iso: "PT", emoji: "🇵🇹", currency: "€", usdRate: 0.93 },
  { iso: "CH", emoji: "🇨🇭", currency: "CHF", usdRate: 0.88 },
  { iso: "SE", emoji: "🇸🇪", currency: "SEK", usdRate: 10.7 },
  { iso: "NO", emoji: "🇳🇴", currency: "NOK", usdRate: 10.9 },
  { iso: "DK", emoji: "🇩🇰", currency: "DKK", usdRate: 6.8 },
  { iso: "PL", emoji: "🇵🇱", currency: "PLN", usdRate: 4.1 },
  { iso: "CZ", emoji: "🇨🇿", currency: "CZK", usdRate: 23.5 },
  { iso: "HU", emoji: "🇭🇺", currency: "HUF", usdRate: 366 },
  { iso: "RO", emoji: "🇷🇴", currency: "RON", usdRate: 4.6 },
  { iso: "RU", emoji: "🇷🇺", currency: "₽", usdRate: 96 },
  { iso: "TR", emoji: "🇹🇷", currency: "₺", usdRate: 34.5 },
  { iso: "AE", emoji: "🇦🇪", currency: "AED", usdRate: 3.67 },
  { iso: "SA", emoji: "🇸🇦", currency: "SAR", usdRate: 3.75 },
  { iso: "QA", emoji: "🇶🇦", currency: "QAR", usdRate: 3.64 },
  { iso: "OM", emoji: "🇴🇲", currency: "OMR", usdRate: 0.38 },
  { iso: "KW", emoji: "🇰🇼", currency: "KWD", usdRate: 0.31 },
  { iso: "BH", emoji: "🇧🇭", currency: "BHD", usdRate: 0.38 },
  { iso: "IN", emoji: "🇮🇳", currency: "₹", usdRate: 82.5 },
  { iso: "PK", emoji: "🇵🇰", currency: "₨", usdRate: 278 },
  { iso: "BD", emoji: "🇧🇩", currency: "৳", usdRate: 118 },
  { iso: "LK", emoji: "🇱🇰", currency: "Rs", usdRate: 303 },
  { iso: "NP", emoji: "🇳🇵", currency: "₨", usdRate: 133 },
  { iso: "SG", emoji: "🇸🇬", currency: "SGD", usdRate: 1.34 },
  { iso: "MY", emoji: "🇲🇾", currency: "RM", usdRate: 4.7 },
  { iso: "TH", emoji: "🇹🇭", currency: "฿", usdRate: 36.5 },
  { iso: "ID", emoji: "🇮🇩", currency: "Rp", usdRate: 15600 },
  { iso: "PH", emoji: "🇵🇭", currency: "₱", usdRate: 58 },
  { iso: "VN", emoji: "🇻🇳", currency: "₫", usdRate: 25000 },
  { iso: "CN", emoji: "🇨🇳", currency: "¥", usdRate: 7.3 },
  { iso: "JP", emoji: "🇯🇵", currency: "¥", usdRate: 149 },
  { iso: "KR", emoji: "🇰🇷", currency: "₩", usdRate: 1370 },
  { iso: "AU", emoji: "🇦🇺", currency: "A$", usdRate: 1.51 },
  { iso: "NZ", emoji: "🇳🇿", currency: "NZ$", usdRate: 1.64 },
  { iso: "ZA", emoji: "🇿🇦", currency: "ZAR", usdRate: 18 },
  { iso: "NG", emoji: "🇳🇬", currency: "₦", usdRate: 1600 },
  { iso: "KE", emoji: "🇰🇪", currency: "KSh", usdRate: 130 },
  { iso: "EG", emoji: "🇪🇬", currency: "E£", usdRate: 48 },
  { iso: "MA", emoji: "🇲🇦", currency: "MAD", usdRate: 10 },
  { iso: "GH", emoji: "🇬🇭", currency: "₵", usdRate: 15.2 },
  { iso: "BR", emoji: "🇧🇷", currency: "R$", usdRate: 5.1 },
  { iso: "MX", emoji: "🇲🇽", currency: "MX$", usdRate: 18 },
  { iso: "AR", emoji: "🇦🇷", currency: "ARS", usdRate: 970 },
  { iso: "CL", emoji: "🇨🇱", currency: "CLP", usdRate: 940 },
  { iso: "CO", emoji: "🇨🇴", currency: "COP", usdRate: 4100 },
  { iso: "PE", emoji: "🇵🇪", currency: "S/.", usdRate: 3.8 }
];

  // Populate country dropdown
  countries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.iso;
    opt.setAttribute('data-currency', c.currency);
    opt.setAttribute('data-usd-rate', c.usdRate);
    opt.textContent = `${c.emoji} ${c.iso} (${c.currency})`;
    countrySelect.appendChild(opt);
  });

  function formatNum(n) { return Math.round(n).toLocaleString(); }

  function getCountryData() {
    const opt = countrySelect.options[countrySelect.selectedIndex];
    return {
      currency: opt?.getAttribute('data-currency') || '£',
      usdRate: parseFloat(opt?.getAttribute('data-usd-rate')) || 1,
      iso: opt?.value.toLowerCase() || 'gb'
    };
  }

  function updateAmounts(scale) {
    const data = getCountryData();
    const regUSD = baseRegistrationUSD[scale];
    const regLocal = regUSD * data.usdRate;
    regValueEl.textContent = formatNum(regLocal);
    declValueEl.textContent = formatNum(regLocal);
    regSymbolEl.textContent = data.currency;
    declSymbolEl.textContent = data.currency;
    const usd = startupUSD[scale];
    startupUSDEl.textContent = '$' + formatNum(usd);
    startupLocalEl.textContent = data.currency + formatNum(usd * data.usdRate);
  }

  function updateFromCountry() {
    const data = getCountryData();
    try { iti.setCountry(data.iso); } catch(e){}
    const selectedScale = document.querySelector('input[name="scale"]:checked')?.value || 'small';
    updateAmounts(selectedScale);
  }

  // Handle scale selection
  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const input = card.querySelector('input[type="radio"]');
      if(input) input.checked = true;
      updateAmounts(card.getAttribute('data-scale'));
    });
  });

  // Handle interest type change
  interestType.addEventListener('change', () => {
    if (interestType.value === 'existing') {
      existingWrap.classList.remove('hidden');
      newWrap.classList.add('hidden');
    } else if (interestType.value === 'new') {
      newWrap.classList.remove('hidden');
      existingWrap.classList.add('hidden');
    } else {
      newWrap.classList.add('hidden');
      existingWrap.classList.add('hidden');
    }
  });

  countrySelect.addEventListener('change', updateFromCountry);

  previewBtn.addEventListener('click', () => {
    const scale = document.querySelector('input[name="scale"]:checked')?.value;
    if (!scale) { 
      formMsg.textContent = "Select scale first."; 
      formMsg.style.color = "red"; 
      return; 
    }
    updateAmounts(scale);
    formMsg.textContent = "Preview updated.";
    formMsg.style.color = "green";
    setTimeout(()=>formMsg.textContent="",3000);
  });

  // --- Validation helpers ---
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function isValidZip(zip) {
    return /^[A-Za-z0-9\- ]{3,10}$/.test(zip);
  }

  // --- Form submission ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMsg.innerHTML = "";
    formMsg.style.color = "red";
    const errors = [];

    const emailInput = document.getElementById('personal_email');
    const zipInput = document.getElementById('zip');

    // Reset borders
    [phoneInput, emailInput, zipInput].forEach(el => el && (el.style.borderColor = "#ccc"));

    // Validate inputs
    if (!phoneInput.value.trim()) {
      errors.push("Phone number is required.");
      phoneInput.style.borderColor = "red";
    }
    if (!isValidEmail(emailInput.value.trim())) {
      errors.push("Enter a valid email address.");
      emailInput.style.borderColor = "red";
    }
    if (!isValidZip(zipInput.value.trim())) {
      errors.push("Enter a valid ZIP / Postal code.");
      zipInput.style.borderColor = "red";
    }

    if (errors.length) {
      formMsg.innerHTML = errors.join("<br>");
      return;
    }

    // Submitting state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        formMsg.textContent = "";
        form.style.display = "none";
        thankYouPanel.classList.remove("hidden");
        setTimeout(() => {
          window.location.href = "payments/payment-confirmation.html";
        }, 3000);
      } else {
        formMsg.textContent = "Submission failed. Please check your details and try again.";
      }
    } catch (err) {
      console.error(err);
      formMsg.textContent = "Error submitting form. Check your internet connection.";
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  });

  // Initialize defaults
  (function init() {
    countrySelect.value = "GB";
    updateFromCountry();
    const defaultCard = document.querySelector('.radio-card[data-scale="small"]');
    if (defaultCard) {
      defaultCard.classList.add('active');
      defaultCard.querySelector('input[type="radio"]').checked = true;
    }
  })();

})();
