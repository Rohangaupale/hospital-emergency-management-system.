# Hospital Emergency Management System (HTML, CSS & JavaScript)

## Overview
This is a browser-based version of the Hospital Emergency Management System mini project. It manages patient registration, emergency priority, the waiting queue, treatment completion, search, and patient records.

## Files
- `index.html` — page structure and forms.
- `style.css` — responsive user interface styles.
- `script.js` — queue ordering, validation, patient records, and local storage.
- `PROJECT_REPORT.md` — project report and explanation.

## How to run
1. Extract the ZIP file.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, or Safari).
3. Register patients and try the queue actions.

No server, package installation, or internet connection is required for core functionality. The stylesheet uses a Google Fonts import; if offline, the page falls back to system fonts.

## Features
- Register patient ID, name, age, medical condition, and priority.
- Emergency patients appear before normal patients.
- FIFO order is preserved within the same priority.
- Complete treatment for the next patient in queue.
- Search patient records by ID, name, condition, priority, or status.
- View waiting and treated patient records.
- Prevent duplicate patient IDs and validate required fields.
- Persist records in browser local storage on the current device.

## Data structure explanation
The application stores patient records in a JavaScript array and sorts waiting patients by priority and registration sequence to implement priority-queue behavior. This is a web implementation of the project behavior; unlike a pointer-based C linked list, JavaScript arrays are used for the browser's record collection.

## Important note
This is an educational project and not a real clinical triage system. Real patient prioritization must be handled by qualified medical professionals using approved protocols. Data is stored in local browser storage and is not encrypted or shared with a hospital database. Do not enter real patient medical information.
