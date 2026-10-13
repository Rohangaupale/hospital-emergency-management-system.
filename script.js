(() => {
  "use strict";

  const STORAGE_KEY = "hospitalEmergencyManagementPatients_v1";
  const form = document.getElementById("patientForm");
  const idInput = document.getElementById("patientId");
  const nameInput = document.getElementById("patientName");
  const ageInput = document.getElementById("patientAge");
  const priorityInput = document.getElementById("patientPriority");
  const conditionInput = document.getElementById("patientCondition");
  const waitingList = document.getElementById("waitingList");
  const recordsBody = document.getElementById("recordsBody");
  const searchInput = document.getElementById("searchInput");
  const formMessage = document.getElementById("formMessage");
  const treatmentMessage = document.getElementById("treatmentMessage");

  let patients = loadPatients();
  let nextSequence = patients.reduce((max, patient) => Math.max(max, Number(patient.sequence) || 0), 0) + 1;

  function loadPatients() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(isValidPatient) : [];
    } catch (error) {
      console.warn("Could not load saved patient records:", error);
      return [];
    }
  }

  function isValidPatient(patient) {
    return patient && typeof patient.id === "string" &&
      typeof patient.name === "string" &&
      ["emergency", "normal"].includes(patient.priority) &&
      ["waiting", "treated"].includes(patient.status);
  }

  function savePatients() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
      return true;
    } catch (error) {
      console.warn("Could not save patient records:", error);
      showMessage(formMessage, "Records could not be saved in this browser. Check storage settings.", "error");
      return false;
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[character]));
  }

  function sortedWaitingPatients() {
    return patients
      .filter(patient => patient.status === "waiting")
      .sort((a, b) => {
        const priorityOrder = (a.priority === "emergency" ? 1 : 2) - (b.priority === "emergency" ? 1 : 2);
        return priorityOrder || a.sequence - b.sequence;
      });
  }

  function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type || ""}`;
  }

  function priorityBadge(priority) {
    const label = priority === "emergency" ? "Emergency" : "Normal";
    return `<span class="priority-badge ${priority}">${label}</span>`;
  }

  function statusBadge(status) {
    const label = status === "waiting" ? "Waiting" : "Treated";
    return `<span class="status-badge ${status}">${label}</span>`;
  }

  function renderStats() {
    const waiting = patients.filter(patient => patient.status === "waiting");
    document.getElementById("waitingCount").textContent = waiting.length;
    document.getElementById("emergencyCount").textContent = waiting.filter(patient => patient.priority === "emergency").length;
    document.getElementById("treatedCount").textContent = patients.filter(patient => patient.status === "treated").length;
  }

  function renderQueue() {
    const queue = sortedWaitingPatients();
    if (queue.length === 0) {
      waitingList.innerHTML = `<div class="empty-state">
        <span class="empty-icon" aria-hidden="true">♡</span>
        <strong>No patients waiting</strong>
        <span>Register a patient to begin.</span>
      </div>`;
      document.getElementById("treatNextBtn").disabled = true;
      document.getElementById("treatNextBtn").style.opacity = ".55";
      return;
    }

    document.getElementById("treatNextBtn").disabled = false;
    document.getElementById("treatNextBtn").style.opacity = "1";
    waitingList.innerHTML = queue.map((patient, index) => `
      <article class="patient-card ${patient.priority === "emergency" ? "is-emergency" : ""}">
        <div class="patient-avatar">${index + 1}</div>
        <div class="patient-main">
          <div class="patient-name">${escapeHtml(patient.name)}</div>
          <div class="patient-meta">ID: ${escapeHtml(patient.id)} · Age ${escapeHtml(patient.age)} · ${escapeHtml(patient.condition)}</div>
        </div>
        ${priorityBadge(patient.priority)}
      </article>`).join("");
  }

  function renderRecords() {
    const query = searchInput.value.trim().toLowerCase();
    const matching = [...patients]
      .sort((a, b) => a.sequence - b.sequence)
      .filter(patient => [patient.id, patient.name, patient.condition, patient.priority, patient.status]
        .some(value => String(value).toLowerCase().includes(query)));

    if (matching.length === 0) {
      recordsBody.innerHTML = `<tr><td colspan="5" class="table-empty">${query ? "No records match your search." : "No patient records yet."}</td></tr>`;
      return;
    }

    recordsBody.innerHTML = matching.map(patient => `
      <tr>
        <td>${escapeHtml(patient.id)}</td>
        <td class="person-cell"><strong>${escapeHtml(patient.name)}</strong><span>Age ${escapeHtml(patient.age)}</span></td>
        <td>${escapeHtml(patient.condition)}</td>
        <td>${priorityBadge(patient.priority)}</td>
        <td>${statusBadge(patient.status)}</td>
      </tr>`).join("");
  }

  function renderAll() {
    renderStats();
    renderQueue();
    renderRecords();
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const condition = conditionInput.value.trim();
    const priority = priorityInput.value;

    if (!id || !name || !condition) {
      showMessage(formMessage, "Please complete all fields.", "error");
      return;
    }
    if (!Number.isInteger(age) || age < 0 || age > 120) {
      showMessage(formMessage, "Enter a valid age between 0 and 120.", "error");
      return;
    }
    if (patients.some(patient => patient.id.toLowerCase() === id.toLowerCase())) {
      showMessage(formMessage, "That patient ID already exists. Please use a unique ID.", "error");
      idInput.focus();
      return;
    }

    patients.push({
      id, name, age, condition, priority,
      status: "waiting",
      sequence: nextSequence++,
      registeredAt: new Date().toISOString(),
      treatedAt: null
    });
    savePatients();
    renderAll();
    form.reset();
    priorityInput.value = "normal";
    showMessage(formMessage, `${name} registered successfully.`, "success");
    showMessage(treatmentMessage, "", "");
    idInput.focus();
  });

  document.getElementById("treatNextBtn").addEventListener("click", () => {
    const nextPatient = sortedWaitingPatients()[0];
    if (!nextPatient) {
      showMessage(treatmentMessage, "No patients are waiting for treatment.", "error");
      return;
    }
    nextPatient.status = "treated";
    nextPatient.treatedAt = new Date().toISOString();
    savePatients();
    renderAll();
    showMessage(treatmentMessage, `Treatment completed for ${nextPatient.name} (ID: ${nextPatient.id}). Record retained.`, "success");
  });

  searchInput.addEventListener("input", renderRecords);

  document.getElementById("clearRecordsBtn").addEventListener("click", () => {
    if (patients.length === 0) {
      showMessage(treatmentMessage, "There are no records to clear.", "error");
      return;
    }
    const confirmed = window.confirm("Delete all patient records from this browser? This cannot be undone.");
    if (!confirmed) return;
    patients = [];
    nextSequence = 1;
    savePatients();
    renderAll();
    showMessage(formMessage, "All patient records have been cleared.", "success");
    showMessage(treatmentMessage, "", "");
  });

  renderAll();
})();
