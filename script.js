/* =========================================================
   1. ELEMENTS
========================================================= */

const confirmBox = document.querySelector(".confirm");
const home = document.querySelector(".home");
const continuer = document.getElementById("continue");

/* =========================================================
   2. SONS
========================================================= */

const clickSound = new Howl({
  src: ["click.mp3"],
  volume: 1,
});

const sound = new Howl({
  src: ["sound.ogg", "sound.mp3"],
  loop: true,
  volume: 1,
});

/* =========================================================
   3. ETAT INITIAL
========================================================= */

home.style.display = "none";

/* =========================================================
   4. CONTINUER
========================================================= */

if (continuer) {
  continuer.addEventListener("click", () => {
    clickSound.play();

    localStorage.setItem("conditions", "acceptées");

    confirmBox.style.display = "none";
    home.style.display = "flex";

    startMusic();
  });
}

/* =========================================================
   5. VERIFICATION CONDITIONS
========================================================= */

if (localStorage.getItem("conditions") === "acceptées") {
  confirmBox.style.display = "none";
  home.style.display = "flex";

  /*
    Le navigateur peut bloquer la lecture automatique
    du son. Il sera donc lancé après une interaction.
  */
}

/* =========================================================
   6. DEMARRER LA MUSIQUE
========================================================= */

function startMusic() {
  if (localStorage.getItem("son") !== "désactivé") {
    if (!sound.playing()) {
      sound.play();
    }
  }
}

/* =========================================================
   7. SETTINGS
========================================================= */

const popupSettings = document.getElementById("popup_settings");
const settings = document.getElementById("settings");

if (settings) {
  settings.addEventListener("click", () => {
    popupSettings.style.display = "flex";
  });
}

/* =========================================================
   8. CONTACT
========================================================= */

const popupContact = document.getElementById("popup_contact");
const contact = document.getElementById("contact");

if (contact) {
  contact.addEventListener("click", () => {
    popupContact.style.display = "flex";
  });
}

/* =========================================================
   9. FERMETURE DES POPUPS
========================================================= */

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    popupSettings.style.display = "none";
    popupContact.style.display = "none";
  });
});

/* Fermer en cliquant sur le fond */

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

/* =========================================================
   10. SON ON / OFF
========================================================= */

const toggle = document.querySelector(".sound-toggle i");
const soundText = document.querySelector(".sound-toggle .text");

if (toggle) {
  toggle.addEventListener("click", () => {
    if (toggle.classList.contains("fa-toggle-on")) {
      toggle.classList.remove("fa-toggle-on");
      toggle.classList.add("fa-toggle-off");

      soundText.textContent = "Sound off";

      sound.mute(true);

      localStorage.setItem("son", "désactivé");
    } else {
      toggle.classList.remove("fa-toggle-off");
      toggle.classList.add("fa-toggle-on");

      soundText.textContent = "Sound on";

      sound.mute(false);

      localStorage.setItem("son", "activé");

      startMusic();
    }
  });
}

/* =========================================================
   11. VOLUME
========================================================= */

const curseur = document.getElementById("curseur");
const volumeValue = document.getElementById("volume-value");

if (curseur) {
  curseur.addEventListener("input", () => {
    const volume = Number(curseur.value);

    sound.volume(volume);

    volumeValue.textContent = Math.round(volume * 100) + "%";

    localStorage.setItem("volume", volume);
  });
}

/* =========================================================
   12. CHARGER LES PARAMETRES
========================================================= */

window.addEventListener("load", () => {
  /* ---------- SON ---------- */

  if (localStorage.getItem("son") === "désactivé") {
    toggle.classList.remove("fa-toggle-on");
    toggle.classList.add("fa-toggle-off");

    soundText.textContent = "Sound off";

    sound.mute(true);
  } else {
    toggle.classList.remove("fa-toggle-off");
    toggle.classList.add("fa-toggle-on");

    soundText.textContent = "Sound on";

    sound.mute(false);
  }

  /* ---------- VOLUME ---------- */

  const savedVolume = localStorage.getItem("volume");

  if (savedVolume !== null) {
    curseur.value = savedVolume;

    sound.volume(Number(savedVolume));

    volumeValue.textContent = Math.round(Number(savedVolume) * 100) + "%";
  }
});

/* =========================================================
   13. TERMS / PRIVACY
========================================================= */

const terms = document.querySelectorAll(".terms");
const privacy = document.querySelectorAll(".privacy");

const termsWindow = document.getElementById("termsWindow");
const privacyWindow = document.getElementById("privacyWindow");

const closeTerms = document.getElementById("closeTerms");
const closePrivacy = document.getElementById("closePrivacy");

/* Terms */

terms.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    termsWindow.style.display = "flex";
  });
});

/* Privacy */

privacy.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    privacyWindow.style.display = "flex";
  });
});

/* Fermer Terms */

if (closeTerms) {
  closeTerms.addEventListener("click", () => {
    termsWindow.style.display = "none";
  });
}

/* Fermer Privacy */

if (closePrivacy) {
  closePrivacy.addEventListener("click", () => {
    privacyWindow.style.display = "none";
  });
}

/* Fermer en cliquant dehors */

[termsWindow, privacyWindow].forEach((windowBox) => {
  if (!windowBox) return;

  windowBox.addEventListener("click", (event) => {
    if (event.target === windowBox) {
      windowBox.style.display = "none";
    }
  });
});

/* =========================================================
   14. CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!emailInput.checkValidity()) {
      alert("Veuillez entrer une adresse e-mail valide.");
      emailInput.focus();

      return;
    }

    const emailBody =
      `Nom : ${name}\n` + `Email : ${email}\n\n` + `Message :\n${message}`;

    const mailto =
      `mailto:medagdev@outlook.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailto;
  });
}

/* =========================================================
   15. DEMARRER LE SON APRES UNE INTERACTION
========================================================= */

document.addEventListener(
  "click",
  () => {
    if (
      localStorage.getItem("conditions") === "acceptées" &&
      localStorage.getItem("son") !== "désactivé"
    ) {
      startMusic();
    }
  },
  { once: true },
);
