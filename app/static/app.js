// Polished behaviour: insert tokens, keyboard support, history, JSON POST to /calculate
(() => {
  const display = document.getElementById("display");
  const historyEl = document.getElementById("history");
  const resultSmall = document.getElementById("resultSmall");
  const buttons = document.querySelectorAll("[data-insert]");
  const evalBtn = document.getElementById("evalBtn");
  const clearBtn = document.getElementById("clearBtn");
  const backBtn = document.getElementById("backBtn");

  // helpers
  function setDisplay(v){
    display.value = String(v);
  }
  function append(token){
    if(display.value === "0") display.value = "";
    display.value += token;
  }
  function backspace(){
    if(display.value.length <= 1) display.value = "0";
    else display.value = display.value.slice(0, -1);
  }
  function clearAll(){
    display.value = "0";
    resultSmall.textContent = "";
    historyEl.textContent = "No history yet";
  }

  // button click handlers
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      append(btn.dataset.insert);
    });
  });

  evalBtn.addEventListener("click", doEval);
  clearBtn.addEventListener("click", clearAll);
  backBtn.addEventListener("click", backspace);

  // keyboard support
  window.addEventListener("keydown", (e) => {
    // allow numeric / operators
    const allowed = "0123456789+-*/().^";
    if(e.key === "Enter"){ e.preventDefault(); doEval(); return; }
    if(e.key === "Backspace"){ e.preventDefault(); backspace(); return; }
    if(e.key === "Escape"){ e.preventDefault(); clearAll(); return; }
    if(allowed.includes(e.key)) {
      // map ^ to ** on enter, just append char
      if(display.value === "0" && e.key !== ".") display.value = "";
      display.value += e.key;
    }
  });

  // evaluate via backend (JSON)
  async function doEval(){
    const expr = display.value.trim();
    if(!expr) return;
    resultSmall.textContent = "Evaluating...";
    try {
      const resp = await fetch("/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: expr })
      });
      const data = await resp.json();
      if(resp.ok && data.result !== undefined){
        setDisplay(data.result);
        resultSmall.textContent = `${expr} = ${data.result}`;
        historyEl.textContent = `Last: ${expr} → ${data.result}`;
      } else {
        resultSmall.textContent = data.error || "Invalid expression";
      }
    } catch(err){
      resultSmall.textContent = "Network error";
      console.error(err);
    }
  }

  // initialize
  (function init(){
    display.value = "0";
    historyEl.textContent = "No history yet";
  })();
})();
