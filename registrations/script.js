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

const countries = [
  { iso: "GB", emoji: "🇬🇧", currency: "£", usdRate: 0.81 },
  { iso: "US", emoji: "🇺🇸", currency: "$", usdRate: 1 },
  { iso: "CA", emoji: "🇨🇦", currency: "CA$", usdRate: 1.35 },
  { iso: "AU", emoji: "🇦🇺", currency: "A$", usdRate: 1.51 },
  { iso: "NZ", emoji: "🇳🇿", currency: "NZ$", usdRate: 1.64 },
  { iso: "IN", emoji: "🇮🇳", currency: "₹", usdRate: 82.5 },
  { iso: "IE", emoji: "🇮🇪", currency: "€", usdRate: 0.93 },
  { iso: "DE", emoji: "🇩🇪", currency: "€", usdRate: 0.93 },
  { iso: "FR", emoji: "🇫🇷", currency: "€", usdRate: 0.93 },
  { iso: "ES", emoji: "🇪🇸", currency: "€", usdRate: 0.93 },
  { iso: "IT", emoji: "🇮🇹", currency: "€", usdRate: 0.93 },
  { iso: "NL", emoji: "🇳🇱", currency: "€", usdRate: 0.93 },
  { iso: "BE", emoji: "🇧🇪", currency: "€", usdRate: 0.93 },
  { iso: "CH", emoji: "🇨🇭", currency: "CHF", usdRate: 0.92 },
  { iso: "SE", emoji: "🇸🇪", currency: "SEK", usdRate: 11.1 },
  { iso: "NO", emoji: "🇳🇴", currency: "NOK", usdRate: 10.1 },
  { iso: "DK", emoji: "🇩🇰", currency: "DKK", usdRate: 6.9 },
  { iso: "FI", emoji: "🇫🇮", currency: "€", usdRate: 0.93 },
  { iso: "AT", emoji: "🇦🇹", currency: "€", usdRate: 0.93 },
  { iso: "PT", emoji: "🇵🇹", currency: "€", usdRate: 0.93 },
  { iso: "GR", emoji: "🇬🇷", currency: "€", usdRate: 0.93 },
  { iso: "ZA", emoji: "🇿🇦", currency: "ZAR", usdRate: 18 },
  { iso: "AE", emoji: "🇦🇪", currency: "AED", usdRate: 3.67 },
  { iso: "SA", emoji: "🇸🇦", currency: "SAR", usdRate: 3.75 },
  { iso: "SG", emoji: "🇸🇬", currency: "SGD", usdRate: 1.34 },
  { iso: "MY", emoji: "🇲🇾", currency: "MYR", usdRate: 4.5 },
  { iso: "TH", emoji: "🇹🇭", currency: "THB", usdRate: 34 },
  { iso: "PH", emoji: "🇵🇭", currency: "PHP", usdRate: 56 },
  { iso: "KR", emoji: "🇰🇷", currency: "₩", usdRate: 1300 },
  { iso: "CN", emoji: "🇨🇳", currency: "¥", usdRate: 7.2 },
  { iso: "HK", emoji: "🇭🇰", currency: "HKD", usdRate: 7.8 },
  { iso: "TW", emoji: "🇹🇼", currency: "TWD", usdRate: 30 },
  { iso: "VN", emoji: "🇻🇳", currency: "VND", usdRate: 23500 },
  { iso: "BR", emoji: "🇧🇷", currency: "BRL", usdRate: 5.2 },
  { iso: "AR", emoji: "🇦🇷", currency: "ARS", usdRate: 300 },
  { iso: "CL", emoji: "🇨🇱", currency: "CLP", usdRate: 850 },
  { iso: "MX", emoji: "🇲🇽", currency: "MXN", usdRate: 17 },
  { iso: "CO", emoji: "🇨🇴", currency: "COP", usdRate: 5000 },
  { iso: "PE", emoji: "🇵🇪", currency: "PEN", usdRate: 3.9 },
  { iso: "EG", emoji: "🇪🇬", currency: "EGP", usdRate: 30 },
  { iso: "NG", emoji: "🇳🇬", currency: "NGN", usdRate: 770 },
  { iso: "KE", emoji: "🇰🇪", currency: "KES", usdRate: 147 },
  { iso: "TR", emoji: "🇹🇷", currency: "TRY", usdRate: 26 },
  { iso: "RU", emoji: "🇷🇺", currency: "RUB", usdRate: 76 },
  { iso: "UA", emoji: "🇺🇦", currency: "UAH", usdRate: 36 },
  { iso: "IL", emoji: "🇮🇱", currency: "ILS", usdRate: 3.6 },
  { iso: "QA", emoji: "🇶🇦", currency: "QAR", usdRate: 3.64 },
  { iso: "KW", emoji: "🇰🇼", currency: "KWD", usdRate: 0.31 },
  { iso: "OM", emoji: "🇴🇲", currency: "OMR", usdRate: 0.38 },
  { iso: "BH", emoji: "🇧🇭", currency: "BHD", usdRate: 0.38 }
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
    startupUSDEl.textContent = '$'+formatNum(usd);
    startupLocalEl.textContent = data.currency+formatNum(usd*data.usdRate);
  }

  function updateFromCountry() {
    const data = getCountryData();
    try { iti.setCountry(data.iso); } catch(e){}
    const selectedScale = document.querySelector('input[name="scale"]:checked')?.value || 'small';
    updateAmounts(selectedScale);
  }

  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const input = card.querySelector('input[type="radio"]');
      if(input) input.checked = true;
      updateAmounts(card.getAttribute('data-scale'));
    });
  });

  interestType.addEventListener('change', () => {
    if(interestType.value === 'existing'){
      existingWrap.classList.remove('hidden');
      newWrap.classList.add('hidden');
    } else if(interestType.value === 'new'){
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
    if(!scale){ formMsg.textContent="Select scale first."; return; }
    updateAmounts(scale);
    formMsg.textContent="Preview updated.";
    setTimeout(()=>formMsg.textContent="",3000);
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    formMsg.textContent = "";
    const scale = document.querySelector('input[name="scale"]:checked')?.value || 'small';
    updateAmounts(scale);

    // For demo: simulate success
    form.style.display = "none";
    thankYouPanel.classList.remove('hidden');
  });

  // Init
  (function init() {
    countrySelect.value = "GB";
    updateFromCountry();
    const defaultCard = document.querySelector('.radio-card[data-scale="small"]');
    if(defaultCard){
      defaultCard.classList.add('active');
      defaultCard.querySelector('input[type="radio"]').checked = true;
    }
  })();

})();
