# Hospital Emergency Management System
## Mini Project Report — HTML, CSS and JavaScript

## 1. Project Overview
The Hospital Emergency Management System is a browser-based mini project that manages patient registration, treatment priority, waiting order, and patient records. Emergency cases are handled before normal cases. Patients with the same priority are treated in First In, First Out (FIFO) order.

The interface is built with HTML, styled with CSS, and made interactive with JavaScript. Browser local storage is used to retain records on the same device between visits.

## 2. Problem Statement
A simple first-come, first-served queue may delay urgent cases. This project orders waiting patients according to an assigned priority while maintaining arrival order within the same priority.

## 3. Objectives
- Register patients with ID, name, age, medical condition, and priority.
- Give emergency cases higher queue priority than normal cases.
- Preserve FIFO order among patients with equal priority.
- Display waiting patients in treatment order.
- Mark the next patient as treated.
- Retain and search patient records.
- Provide a simple responsive interface.

## 4. Technologies Used
- **HTML5:** page structure, form fields, sections, and patient table.
- **CSS3:** responsive layout, colors, cards, badges, and mobile styling.
- **JavaScript:** input validation, priority ordering, treatment completion, searching, and rendering.
- **Browser localStorage:** saves records locally on the same browser and device.

## 5. Queue Logic
Priority convention:
- Emergency = higher priority.
- Normal = lower priority.

Waiting patients are sorted by priority and then by an increasing registration sequence. Therefore, emergency patients are shown first, while patients of the same priority remain in their registration order.

## 6. Main Modules
1. **Patient Registration:** validates the form and creates a record.
2. **Priority Queue Display:** lists waiting patients in treatment order.
3. **Treatment Completion:** marks the highest-priority waiting patient as treated.
4. **Patient Record Search:** filters records by ID, name, condition, priority, or status.
5. **Record Maintenance:** displays waiting and treated records.
6. **Statistics:** shows waiting count, emergency count, and completed treatments.

## 7. System Flow
```text
              Open index.html
                    |
              Load saved records
                    |
                 Dashboard
                    |
       +------------+-----------------+
       |            |                 |
 Register       View queue       Search records
       |            |                 |
 Validate      Sort by priority   Filter records
       |        then FIFO             |
 Create record     |             Show matches
       |            |
 Save locally   Complete treatment
       |            |
 Refresh UI    Mark as treated
                    |
             Retain patient record
```

## 8. Functional Requirements
- Add a patient with required details.
- Reject duplicate patient IDs.
- Assign Emergency or Normal priority.
- Display waiting patients in correct order.
- Complete treatment for the next patient.
- Search patient records.
- Display both waiting and treated patients.
- Clear all records after user confirmation.

## 9. Non-Functional Requirements
- **Usability:** clear form, labels, and status messages.
- **Responsiveness:** layout adapts to mobile and desktop screens.
- **Maintainability:** HTML, CSS, and JavaScript are separated into different files.
- **Reliability:** required fields, age, and duplicate IDs are validated.
- **Persistence:** records are saved using browser local storage.

## 10. Advantages
- Easy to open and demonstrate in a browser.
- No server or package installation is required.
- Emergency-first ordering and FIFO are easy to observe.
- Records remain available in the same browser after refresh.
- Responsive interface and record search.

## 11. Limitations
- Data is saved only in the current browser's local storage.
- There is no server-side database, login, encryption, or multi-user synchronization.
- The JavaScript record collection is an array rather than a pointer-based linked list.
- Only Emergency and Normal priority categories are implemented.
- This is not a diagnostic or clinical triage tool.

## 12. Future Enhancements
- Connect to a secure backend and database.
- Add authentication and role-based access.
- Add exportable reports.
- Add additional priority categories according to approved clinical workflows.
- Add doctor and department assignment.
- Add audit history and secure data backup.

## 13. Conclusion
The project demonstrates a browser-based implementation of priority-based patient queue management using HTML, CSS, and JavaScript. Emergency patients are placed before normal patients, and FIFO order is maintained within each priority. Patient records can be searched and remain saved in local storage on the same browser.

**Privacy and safety note:** Use sample data only. This academic demo is not a clinical triage system, and browser local storage is not suitable for sensitive real patient records.
