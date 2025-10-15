 <script>
// --- Immediately Invoked Function Expression to avoid global scope pollution ---
(function() {

  // --- Registration fees and startup costs in USD ---
  const baseRegistrationUSD = { small: 2000, medium: 3000, large: 5000 };
  const startupUSD = { small: 30000, medium: 70000, large: 200000 };

  // --- Elements ---
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
  const previewBtn = document.getElementById('previewFees'); // ✅ fixed ID
  const form = document.getElementById('applyForm');
  const formMsg = document.getElementById('form-msg');
  const thankYouPanel = document.getElementById('thankYouPanel');

  // --- Initialize intl-tel-input ---
  const iti = window.intlTelInput(phoneInput, {
    separateDialCode: true,
    preferredCountries: ["gb","us","ca","au","in"],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.5.3/build/js/utils.js"
  });

  // --- Country data ---
  const countries = [
    { iso: "GB", emoji: "🇬🇧", currency: "£", usdRate: 0.81 },
    { iso: "US", emoji: "🇺🇸", currency: "$", usdRate: 1 },
    { iso: "CA", emoji: "🇨🇦", currency: "CA$", usdRate: 1.35 },
    { iso: "AU", emoji: "🇦🇺", currency: "A$", usdRate: 1.51 },
    { iso: "IN", emoji: "🇮🇳", currency: "₹", usdRate: 82.5 },
    { iso: "IE", emoji: "🇮🇪", currency: "€", usdRate: 0.93 },
    { iso: "DE", emoji: "🇩🇪", currency: "€", usdRate: 0.93 },
    { iso: "FR", emoji: "🇫🇷", currency: "€", usdRate: 0.93 },
    { iso: "ZA", emoji: "🇿🇦", currency: "ZAR", usdRate: 18 },
    { iso: "AE", emoji: "🇦🇪", currency: "AED", usdRate: 3.67 },
    { iso: "SG", emoji: "🇸🇬", currency: "SGD", usdRate: 1.34 },
    { iso: "MY", emoji: "🇲🇾", currency: "MYR", usdRate: 4.5 },
    { iso: "TH", emoji: "🇹🇭", currency: "THB", usdRate: 34 },
    { iso: "PH", emoji: "🇵🇭", currency: "PHP", usdRate: 56 },
    { iso: "KR", emoji: "🇰🇷", currency: "₩", usdRate: 1300 },
    { iso: "CN", emoji: "🇨🇳", currency: "¥", usdRate: 7.2 },
    { iso: "BR", emoji: "🇧🇷", currency: "BRL", usdRate: 5.2 },
    { iso: "MX", emoji: "🇲🇽", currency: "MXN", usdRate: 17 },
    { iso: "KE", emoji: "🇰🇪", currency: "KES", usdRate: 147 }
  ];

  // --- Populate dropdown ---
  countries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.iso;
    opt.setAttribute('data-currency', c.currency);
    opt.setAttribute('data-usd-rate', c.usdRate);
    opt.textContent = `${c.emoji} ${c.iso} (${c.currency})`;
    countrySelect.appendChild(opt);
  });

  // --- Helper functions ---
  function formatNum(n) {
    return Math.round(n).toLocaleString();
  }

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

  // --- Scale cards ---
  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const input = card.querySelector('input[type="radio"]');
      if (input) input.checked = true;
      updateAmounts(card.getAttribute('data-scale'));
    });
  });

  // --- Interest type toggle ---
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

  // --- Preview button ---
  previewBtn?.addEventListener('click', () => {
    const scale = document.querySelector('input[name="scale"]:checked')?.value;
    if (!scale) {
      formMsg.textContent = "Select scale first.";
      formMsg.style.color = "red";
      return;
    }
    updateAmounts(scale);
    formMsg.textContent = "Preview updated.";
    formMsg.style.color = "green";
    setTimeout(() => formMsg.textContent = "", 3000);
  });

  // --- Form Validation Helpers ---
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function isValidZip(zip) {
    return /^[A-Za-z0-9\- ]{3,10}$/.test(zip);
  }

  // --- Form Submission ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = [];

    const emailInput = document.getElementById('personal_email');
    const zipInput = document.getElementById('zip');

    [phoneInput, emailInput, zipInput].forEach(el => el.style.borderColor = "#ccc");

    if (!phoneInput.value.trim()) {
      errors.push("Phone number is required.");
      phoneInput.style.borderColor = "red";
    }
    if (!isValidEmail(emailInput.value.trim())) {
      errors.push("Enter a valid email address.");
      emailInput.style.borderColor = "red";
    }
    if (!isValidZip(zipInput.value.trim())) {
      errors.push("Enter a valid ZIP/Postal code.");
      zipInput.style.borderColor = "red";
    }

    if (errors.length) {
      formMsg.innerHTML = errors.join("<br>");
      formMsg.style.color = "red";
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMsg.textContent = "";
        form.style.display = "none";
        thankYouPanel.classList.remove('hidden');

        // ✅ Optional WhatsApp redirect (add your number here)
        // window.open("https://wa.me/919876543210?text=Thank you for applying!", "_blank");

        setTimeout(() => {
          window.location.href = "payments/payment-confirmation.html";
        }, 3000);
      } else {
        formMsg.textContent = "Submission failed. Please check details.";
        formMsg.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      formMsg.textContent = "Form submission failed. Check your internet connection.";
      formMsg.style.color = "red";
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  });

  // --- Country change updates ---
  countrySelect.addEventListener('change', updateFromCountry);

})(); // ✅ End IIFE
</script>
