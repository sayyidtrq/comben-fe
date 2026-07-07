// js/rule-builder.js

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Tab Switching ---
  const tabComponents = document.getElementById('tab-components');
  const tabConditions = document.getElementById('tab-conditions');

  tabComponents.addEventListener('click', () => {
    tabComponents.classList.add('active');
    tabConditions.classList.remove('active');
  });

  tabConditions.addEventListener('click', () => {
    tabConditions.classList.add('active');
    tabComponents.classList.remove('active');
  });

  // --- 2. Condition Builder ---
  const btnAddCond = document.getElementById('btn-add-cond');
  const conditionsContainer = document.getElementById('conditions-container');

  // Attach delete event to existing buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('.condition-row');
      if (row) row.remove();
    });
  });

  // Add new condition
  btnAddCond.addEventListener('click', () => {
    const newRow = document.createElement('div');
    newRow.className = 'condition-row';
    newRow.innerHTML = `
      <select class="form-select">
        <option>Premium</option>
        <option>Rate (%)</option>
        <option>Persistency (%)</option>
        <option>Policy Term (Months)</option>
      </select>
      <select class="form-select op">
        <option>==</option>
        <option>>=</option>
        <option><=</option>
        <option>></option>
        <option><</option>
        <option>!=</option>
      </select>
      <input type="text" class="form-input" placeholder="Value">
      <select class="form-select logic"><option>AND</option><option>OR</option></select>
      <button class="btn-delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
    `;

    // Add delete event
    newRow.querySelector('.btn-delete').addEventListener('click', () => {
      newRow.remove();
    });

    // Insert before the add button
    conditionsContainer.insertBefore(newRow, btnAddCond);
  });

  // --- 3. Formula Expression Interactive ---
  const exprContainer = document.getElementById('expr-container');
  const btnAddLine = document.getElementById('btn-add-line');
  const actionBtns = document.querySelectorAll('.btn-expr-action:not(.btn-add-line)');

  // Add new empty line
  btnAddLine.addEventListener('click', () => {
    const newLine = document.createElement('div');
    newLine.className = 'expr-line';
    newLine.innerHTML = `<div class="expr-pill operator" style="font-weight:400; color:#94A3B8">[Empty Line]</div>`;
    exprContainer.appendChild(newLine);
  });

  // Clicking an action button adds that operator to the last line
  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const operator = e.target.textContent.trim();
      const lastLine = exprContainer.lastElementChild;

      // Remove empty line placeholder if exists
      if (lastLine && lastLine.innerHTML.includes('[Empty Line]')) {
        lastLine.innerHTML = '';
      }

      const pill = document.createElement('div');
      if (operator === '( )') {
        pill.className = 'expr-pill paren';
        pill.textContent = '()';
      } else {
        pill.className = 'expr-pill operator';
        pill.textContent = operator;
      }

      if (lastLine) {
        lastLine.appendChild(pill);
      }
    });
  });

  // --- 3.5. Component Add Icons ---
  const compAddIcons = document.querySelectorAll('.comp-add-icon');
  compAddIcons.forEach(addIcon => {
    addIcon.addEventListener('click', (e) => {
      const compItem = e.target.closest('.comp-item');
      if (!compItem) return;

      const compLeft = compItem.querySelector('.comp-item-left');
      const iconSpan = compLeft.querySelector('.comp-icon');
      // Get text excluding the icon's text
      const compName = compLeft.textContent.replace(iconSpan.textContent, '').trim();

      let pillClass = 'driver';
      if (iconSpan.classList.contains('mod')) pillClass = 'mod';
      if (iconSpan.classList.contains('const')) pillClass = 'const';

      const lastLine = exprContainer.lastElementChild;
      if (lastLine && lastLine.innerHTML.includes('[Empty Line]')) {
        lastLine.innerHTML = '';
      }

      const pill = document.createElement('div');
      pill.className = `expr-pill ${pillClass}`;
      pill.textContent = compName;

      if (lastLine) {
        lastLine.appendChild(pill);
      }
    });
  });

  // --- 3.6. Edit as Text Toggles ---
  const btnEditFormula = document.getElementById('btn-edit-formula');
  const exprTextarea = document.getElementById('expr-textarea');
  const editFormulaText = document.getElementById('edit-formula-text');

  btnEditFormula.addEventListener('click', () => {
    const isEditing = exprTextarea.style.display === 'block';
    if (isEditing) {
      exprTextarea.style.display = 'none';
      exprContainer.style.display = 'flex';
      editFormulaText.textContent = 'Edit as Text';
    } else {
      exprTextarea.style.display = 'block';
      exprContainer.style.display = 'none';
      editFormulaText.textContent = 'Switch to Visual';
    }
  });

  const btnEditElse = document.getElementById('btn-edit-else');
  const elseExprContainer = document.getElementById('else-expr-container');
  const elseTextarea = document.getElementById('else-textarea');
  const editElseText = document.getElementById('edit-else-text');

  btnEditElse.addEventListener('click', () => {
    const isEditing = elseTextarea.style.display === 'block';
    if (isEditing) {
      elseTextarea.style.display = 'none';
      elseExprContainer.style.display = 'flex';
      editElseText.textContent = 'Edit';
    } else {
      elseTextarea.style.display = 'block';
      elseExprContainer.style.display = 'none';
      editElseText.textContent = 'Save';
    }
  });
  const inputs = document.querySelectorAll('.num-input');
  const resBase = document.getElementById('res-base');
  const resBonus = document.getElementById('res-bonus');
  const resDeduct = document.getElementById('res-deduct');
  const resOverride = document.getElementById('res-override');
  const resConst = document.getElementById('res-const');
  const resTotal = document.getElementById('res-total');

  const btnResetSim = document.getElementById('btn-reset-sim');

  const defaultValues = [100000, 20, 85, 24, 10, 0, 5, 500];

  function formatMoney(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calculateSimulation() {
    // Get values
    const vals = Array.from(inputs).map(inp => parseFloat(inp.value.replace(/,/g, '')) || 0);
    const [premium, rate, persistency, term, bonus, override, deduct, constant] = vals;

    // Calculation Logic
    const baseAmt = premium * (rate / 100);
    const afterBonus = baseAmt * (1 + (bonus / 100));
    const afterDeduct = afterBonus * (1 - (deduct / 100));

    // According to mockup: Total = After Deduct + Override + Constant
    // Wait, the mockup says "+ Override 0.00", "+ Constant 500.00". 
    // Wait, is Override a percentage or flat? Mockup says "Override (%)" is 0.00, but result adds flat 0.00. 
    // Let's assume Override is flat amount in the addition, or (BaseAmt * Override%). Let's do (BaseAmt * Override%).
    const overrideAmt = baseAmt * (override / 100);
    const total = afterDeduct + overrideAmt + constant;

    // Update UI
    resBase.textContent = formatMoney(baseAmt);
    resBonus.textContent = formatMoney(afterBonus);
    // Update labels if we want, but let's just update values
    resBonus.previousElementSibling.textContent = `After Bonus (${formatMoney(bonus)}%)`;

    resDeduct.textContent = formatMoney(afterDeduct);
    resDeduct.previousElementSibling.textContent = `After Deduction (${formatMoney(deduct)}%)`;

    resOverride.textContent = formatMoney(overrideAmt);
    resConst.textContent = formatMoney(constant);

    resTotal.textContent = formatMoney(total);
  }

  // Bind inputs to calculate
  inputs.forEach(input => {
    input.addEventListener('input', calculateSimulation);
    // Auto format on blur
    input.addEventListener('blur', (e) => {
      const val = parseFloat(e.target.value.replace(/,/g, '')) || 0;
      e.target.value = formatMoney(val);
    });
  });

  // Reset button
  btnResetSim.addEventListener('click', () => {
    inputs.forEach((input, index) => {
      input.value = formatMoney(defaultValues[index]);
    });
    calculateSimulation();
  });

  // Initial calculation
  calculateSimulation();

});
