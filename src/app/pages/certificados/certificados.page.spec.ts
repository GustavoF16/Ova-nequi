:host {
  display: block;
}

ion-content {
  --padding-bottom: 5rem;
}

.page-card {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: var(--ion-border-radius);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
}

.intro-text {
  color: var(--ion-color-medium);
  margin-bottom: 1rem;
}

.certificate-form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.certificate-field {
  display: grid;
  gap: 0.4rem;
  padding: 0.9rem 1rem;
  border-radius: 0.85rem;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.certificate-field label {
  color: #111827;
  font-size: 0.9rem;
  font-weight: 600;
}

.certificate-field ion-input {
  width: 100%;
  min-height: 44px;
  --background: #ffffff;
  --color: #111827;
  --placeholder-color: #64748b;
  --placeholder-opacity: 1;
  --padding-start: 0.8rem;
  --padding-end: 0.8rem;
  --highlight-height: 0;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 0.75rem;
}

/* Input nativo usado en Android para mostrar bien nombre y fecha */
.certificate-native-input {
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 0.75rem;
  background: #ffffff;
  color: #111827;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
}

.certificate-native-input:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.14);
}

.certificate-preview {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 2px dashed rgba(13, 110, 253, 0.25);
  border-radius: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
}

.certificate-header {
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ion-color-primary);
  margin-bottom: 1rem;
}

.certificate-recipient {
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  color: var(--ion-color-medium);
  text-align: center;
}

.certificate-preview h3 {
  margin: 0.7rem 0 0.5rem;
  font-size: 1.7rem;
  text-align: center;
}

.certificate-id {
  color: #111827;
}

.certificate-course {
  text-align: center;
  color: var(--ion-color-dark);
  margin-bottom: 1rem;
}

.certificate-date {
  text-align: center;
  color: var(--ion-color-medium);
  font-size: 0.95rem;
}

.button-group {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.4rem;
}

.back-button {
  margin-top: 1rem;
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .certificate-form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .page-card {
    padding: 1.2rem;
  }

  .certificate-preview {
    padding: 1rem;
  }

  .certificate-header {
    font-size: 1rem;
    line-height: 1.4;
  }

  .certificate-preview h3 {
    font-size: 1.35rem;
    line-height: 1.3;
  }

  .certificate-course {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .back-button {
    margin-bottom: 5rem;
  }
}

@media print {
  ion-header,
  .button-group,
  ion-button[routerlink],
  .status-note,
  .certificate-form-grid {
    display: none !important;
  }

  ion-content {
    background: #ffffff !important;
    color: #000000 !important;
    padding: 0 !important;
  }

  .page-card,
  .certificate-preview {
    box-shadow: none !important;
    border: 1px solid #000 !important;
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0.8rem !important;
  }

  .certificate-preview {
    border-style: solid !important;
    border-width: 2px !important;
  }
}