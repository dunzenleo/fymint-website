document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Mobile Menu Drawer Toggle
            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const iconOpen = document.getElementById('menu-icon-open');
            const iconClose = document.getElementById('menu-icon-close');

            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    const isHidden = mobileMenu.classList.contains('hidden');
                    if (isHidden) {
                        mobileMenu.classList.remove('hidden');
                        iconOpen.classList.add('hidden');
                        iconClose.classList.remove('hidden');
                    } else {
                        mobileMenu.classList.add('hidden');
                        iconOpen.classList.remove('hidden');
                        iconClose.classList.add('hidden');
                    }
                });

                document.querySelectorAll('.mobile-link').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                        iconOpen.classList.remove('hidden');
                        iconClose.classList.add('hidden');
                    });
                });
            }

            // 2. Pricing Plan Monthly / Yearly Toggle
            const toggleMonthly = document.getElementById('toggle-monthly');
            const toggleYearly = document.getElementById('toggle-yearly');
            const priceElem = document.getElementById('premium-price');
            const periodElem = document.getElementById('premium-period');

            if (toggleMonthly && toggleYearly && priceElem && periodElem) {
                toggleMonthly.addEventListener('click', () => {
                    toggleMonthly.className = 'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all bg-premiumGold text-deepPurple';
                    toggleYearly.className = 'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-all';
                    priceElem.textContent = '₹299';
                    periodElem.textContent = '/ month';
                });

                toggleYearly.addEventListener('click', () => {
                    toggleYearly.className = 'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all bg-premiumGold text-deepPurple';
                    toggleMonthly.className = 'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-all';
                    priceElem.textContent = '₹2,870';
                    periodElem.textContent = '/ year';
                });
            }

            // 3. Calculator Tabs Switcher
            const tabs = document.querySelectorAll('.calc-tab');
            const panels = document.querySelectorAll('.calc-panel');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => {
                        t.className = 'calc-tab px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-deepPurpleCard text-gray-300 hover:text-white';
                    });
                    tab.className = 'calc-tab px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-financialGreen text-deepPurple';

                    const target = tab.getAttribute('data-target');
                    panels.forEach(panel => {
                        if (panel.id === target) {
                            panel.classList.remove('hidden');
                        } else {
                            panel.classList.add('hidden');
                        }
                    });
                });
            });

            // 4. Calculator Computations
            // EMI Calculator
            const emiAmt = document.getElementById('emi-amount');
            const emiRate = document.getElementById('emi-rate');
            const emiTenure = document.getElementById('emi-tenure');

            function updateEMI() {
                if (!emiAmt || !emiRate || !emiTenure) return;
                const P = parseFloat(emiAmt.value);
                const r = parseFloat(emiRate.value) / 12 / 100;
                const n = parseFloat(emiTenure.value) * 12;

                document.getElementById('emi-amount-val').textContent = `₹ ${P.toLocaleString('en-IN')}`;
                document.getElementById('emi-rate-val').textContent = `${emiRate.value}%`;
                document.getElementById('emi-tenure-val').textContent = `${emiTenure.value} Years`;

                const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                const totalAmt = emi * n;
                const totalInt = totalAmt - P;

                document.getElementById('emi-result-monthly').textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
                document.getElementById('emi-result-interest').textContent = `₹ ${Math.round(totalInt).toLocaleString('en-IN')}`;
                document.getElementById('emi-result-total').textContent = `₹ ${Math.round(totalAmt).toLocaleString('en-IN')}`;
            }

            if (emiAmt) {
                emiAmt.addEventListener('input', updateEMI);
                emiRate.addEventListener('input', updateEMI);
                emiTenure.addEventListener('input', updateEMI);
                updateEMI();
            }

            // SIP Calculator
            const sipAmt = document.getElementById('sip-amount');
            const sipRate = document.getElementById('sip-rate');
            const sipYears = document.getElementById('sip-years');

            function updateSIP() {
                if (!sipAmt || !sipRate || !sipYears) return;
                const P = parseFloat(sipAmt.value);
                const i = parseFloat(sipRate.value) / 12 / 100;
                const n = parseFloat(sipYears.value) * 12;

                document.getElementById('sip-amount-val').textContent = `₹ ${P.toLocaleString('en-IN')}`;
                document.getElementById('sip-rate-val').textContent = `${sipRate.value}%`;
                document.getElementById('sip-years-val').textContent = `${sipYears.value} Years`;

                const invested = P * n;
                const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
                const returns = totalValue - invested;

                document.getElementById('sip-result-invested').textContent = `₹ ${Math.round(invested).toLocaleString('en-IN')}`;
                document.getElementById('sip-result-returns').textContent = `₹ ${Math.round(returns).toLocaleString('en-IN')}`;
                document.getElementById('sip-result-total').textContent = `₹ ${Math.round(totalValue).toLocaleString('en-IN')}`;
            }

            if (sipAmt) {
                sipAmt.addEventListener('input', updateSIP);
                sipRate.addEventListener('input', updateSIP);
                sipYears.addEventListener('input', updateSIP);
                updateSIP();
            }

            // Budget Calculator
            const budgetIncome = document.getElementById('budget-income');

            function updateBudget() {
                if (!budgetIncome) return;
                const income = parseFloat(budgetIncome.value);
                document.getElementById('budget-income-val').textContent = `₹ ${income.toLocaleString('en-IN')}`;

                document.getElementById('budget-needs').textContent = `₹ ${Math.round(income * 0.50).toLocaleString('en-IN')}`;
                document.getElementById('budget-wants').textContent = `₹ ${Math.round(income * 0.30).toLocaleString('en-IN')}`;
                document.getElementById('budget-savings').textContent = `₹ ${Math.round(income * 0.20).toLocaleString('en-IN')}`;
            }

            if (budgetIncome) {
                budgetIncome.addEventListener('input', updateBudget);
                updateBudget();
            }

            // Savings Target Calculator
            const savTarget = document.getElementById('sav-target');
            const savMonths = document.getElementById('sav-months');

            function updateSavings() {
                if (!savTarget || !savMonths) return;
                const target = parseFloat(savTarget.value);
                const months = parseFloat(savMonths.value);

                document.getElementById('sav-target-val').textContent = `₹ ${target.toLocaleString('en-IN')}`;
                document.getElementById('sav-months-val').textContent = `${months} Months`;

                const monthly = target / months;
                document.getElementById('sav-result-monthly').textContent = `₹ ${Math.round(monthly).toLocaleString('en-IN')}`;
            }

            if (savTarget) {
                savTarget.addEventListener('input', updateSavings);
                savMonths.addEventListener('input', updateSavings);
                updateSavings();
            }
        });

        // Modal triggers
        function openModal(type) {
            const overlay = document.getElementById('modalOverlay');
            const content = document.getElementById('modalContent');
            
            if (type === 'privacyModal') {
                content.innerHTML = `
                    <h3 class="text-lg font-bold text-white">Privacy Policy</h3>
                    <p class="text-xs text-gray-300">Fymint Technologies Private Limited prioritizes user privacy. All personal tracking records remain strictly protected and encrypted.</p>
                    <p class="text-xs text-gray-400">For inquiries regarding privacy, contact support at fymint.com.</p>
                `;
            } else if (type === 'termsModal') {
                content.innerHTML = `
                    <h3 class="text-lg font-bold text-white">Terms & Conditions</h3>
                    <p class="text-xs text-gray-300">By using Fymint, you agree to manage your financial tracking responsibly. Free and Premium features are subject to service availability and operational updates.</p>
                `;
            } else if (type === 'disclaimerModal') {
                content.innerHTML = `
                    <h3 class="text-lg font-bold text-white">Disclaimer</h3>
                    <p class="text-xs text-gray-300">Fymint provides personal budgeting and flow visualization tools. Content on this website does not constitute formal financial, tax, or investment advice.</p>
                `;
            } else if (type === 'contactModal') {
                content.innerHTML = `
                    <h3 class="text-lg font-bold text-white">Contact Us</h3>
                    <p class="text-xs text-gray-300">Company: Fymint Technologies Private Limited</p>
                    <p class="text-xs text-gray-300">Website: fymint.com</p>
                    <p class="text-xs text-gray-400">For general support and inquiries, please reach out to us at our official domain fymint.com.</p>
                `;
            }

            overlay.classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.add('hidden');
        }

/* Fymint calculator UX helpers */
document.addEventListener('DOMContentLoaded', () => {
    const formatINR = (value) => `₹ ${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;

    // Make calculator sliders update their visual progress without changing the math.
    document.querySelectorAll('.calc-panel input[type="range"]').forEach((input) => {
        const paint = () => {
            const min = Number(input.min || 0);
            const max = Number(input.max || 100);
            const value = Number(input.value || min);
            const pct = ((value - min) / (max - min)) * 100;
            input.style.background =
                `linear-gradient(90deg, #20B86B 0%, #20B86B ${pct}%, #2E0940 ${pct}%, #2E0940 100%)`;
        };
        input.addEventListener('input', paint);
        paint();
    });

    // Keyboard accessibility: Escape closes the legal/contact modal.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const overlay = document.getElementById('modalOverlay');
            if (overlay && !overlay.classList.contains('hidden')) closeModal();
        }
    });

    // Clicking the modal backdrop closes it.
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeModal();
        });
    }
});
