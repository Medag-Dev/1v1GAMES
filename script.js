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
   3. ELEMENTS SETTINGS
========================================================= */

const popupSettings = document.getElementById("popup_settings");
const settings = document.getElementById("settings");

/* =========================================================
   4. ELEMENTS CONTACT
========================================================= */

const popupContact = document.getElementById("popup_contact");
const contact = document.getElementById("contact");

/* =========================================================
   5. ELEMENTS SON
========================================================= */

const toggle = document.querySelector(".sound-toggle i");
const soundText = document.querySelector(".sound-toggle .text");

const curseur = document.getElementById("curseur");
const volumeValue = document.getElementById("volume-value");

/* =========================================================
   6. ETAT INITIAL
========================================================= */

if (home) {
  home.style.display = "none";
}

/* =========================================================
   7. ETAT DU SON
========================================================= */

/*
  Par défaut :
  - son activé
  - volume à 100%

  Si une préférence existe dans localStorage,
  elle est utilisée.
*/

let soundEnabled = localStorage.getItem("son") !== "désactivé";

/* =========================================================
   8. VOLUME SAUVEGARDE
========================================================= */

const savedVolume = localStorage.getItem("volume");

if (savedVolume !== null) {
  const volume = Number(savedVolume);

  sound.volume(volume);

  if (curseur) {
    curseur.value = volume;
  }

  if (volumeValue) {
    volumeValue.textContent = Math.round(volume * 100) + "%";
  }
}

/* =========================================================
   9. METTRE A JOUR L'INTERFACE DU SON
========================================================= */

function updateSoundState() {
  if (!toggle || !soundText) {
    return;
  }

  /* ---------- SON ACTIVE ---------- */

  if (soundEnabled) {
    toggle.classList.remove("fa-toggle-off");
    toggle.classList.add("fa-toggle-on");

    soundText.textContent = "Sound on";

    sound.mute(false);
  } else {

  /* ---------- SON DESACTIVE ---------- */
    toggle.classList.remove("fa-toggle-on");
    toggle.classList.add("fa-toggle-off");

    soundText.textContent = "Sound off";

    sound.mute(true);
  }
}

/* =========================================================
   10. DEMARRER LA MUSIQUE
========================================================= */

function startMusic() {
  /*
    Si le son est désactivé,
    on ne fait absolument rien.
  */

  if (!soundEnabled) {
    return;
  }

  /*
    Evite de lancer plusieurs fois
    la même musique.
  */

  if (!sound.playing()) {
    sound.play();
  }
}

/* =========================================================
   11. CONTINUER
========================================================= */

if (continuer) {
  continuer.addEventListener("click", () => {
    clickSound.play();

    localStorage.setItem("conditions", "acceptées");

    if (confirmBox) {
      confirmBox.style.display = "none";
    }

    if (home) {
      home.style.display = "flex";
    }

    /*
      L'utilisateur vient de cliquer.
      Le navigateur autorise donc normalement
      la lecture audio.
    */

    startMusic();
  });
}

/* =========================================================
   12. VERIFICATION CONDITIONS
========================================================= */

if (localStorage.getItem("conditions") === "acceptées") {
  if (confirmBox) {
    confirmBox.style.display = "none";
  }

  if (home) {
    home.style.display = "flex";
  }
}

/* =========================================================
   13. SETTINGS
========================================================= */

if (settings) {
  settings.addEventListener("click", () => {
    if (popupSettings) {
      popupSettings.style.display = "flex";
    }
  });
}

/* =========================================================
   14. CONTACT
========================================================= */

if (contact) {
  contact.addEventListener("click", () => {
    if (popupContact) {
      popupContact.style.display = "flex";
    }
  });
}

/* =========================================================
   15. FERMETURE DES POPUPS
========================================================= */

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (popupSettings) {
      popupSettings.style.display = "none";
    }

    if (popupContact) {
      popupContact.style.display = "none";
    }
  });
});

/* =========================================================
   16. FERMER POPUP EN CLIQUANT SUR LE FOND
========================================================= */

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

/* =========================================================
   17. SON ON / OFF
========================================================= */

if (toggle) {
  toggle.addEventListener("click", (event) => {
    /*
      Empêche le clic de remonter
      jusqu'aux autres listeners.
    */

    event.stopPropagation();

    /* Inverser l'état */

    soundEnabled = !soundEnabled;

    /* Sauvegarder */

    localStorage.setItem("son", soundEnabled ? "activé" : "désactivé");

    /* Mettre à jour l'interface */

    updateSoundState();

    /* ---------- SON ACTIVE ---------- */

    if (soundEnabled) {
      startMusic();
    } else {

    /* ---------- SON DESACTIVE ---------- */
      /*
        Ici on arrête réellement la musique.
        Elle ne reste pas en arrière-plan.
      */

      sound.stop();
    }
  });
}

/* =========================================================
   18. VOLUME
========================================================= */

if (curseur) {
  curseur.addEventListener("input", () => {
    const volume = Number(curseur.value);

    /* Modifier le volume */

    sound.volume(volume);

    /* Afficher le pourcentage */

    if (volumeValue) {
      volumeValue.textContent = Math.round(volume * 100) + "%";
    }

    /* Sauvegarder */

    localStorage.setItem("volume", volume);
  });
}

/* =========================================================
   19. INITIALISER LE SON
========================================================= */

updateSoundState();

/* =========================================================
   20. TERMS / PRIVACY
========================================================= */

const terms = document.querySelectorAll(".terms");

const privacy = document.querySelectorAll(".privacy");

const termsWindow = document.getElementById("termsWindow");

const privacyWindow = document.getElementById("privacyWindow");

const closeTerms = document.getElementById("closeTerms");

const closePrivacy = document.getElementById("closePrivacy");

/* =========================================================
   21. TERMS
========================================================= */

terms.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (termsWindow) {
      termsWindow.style.display = "flex";
    }
  });
});

/* =========================================================
   22. PRIVACY
========================================================= */

privacy.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (privacyWindow) {
      privacyWindow.style.display = "flex";
    }
  });
});

/* =========================================================
   23. FERMER TERMS
========================================================= */

if (closeTerms) {
  closeTerms.addEventListener("click", () => {
    if (termsWindow) {
      termsWindow.style.display = "none";
    }
  });
}

/* =========================================================
   24. FERMER PRIVACY
========================================================= */

if (closePrivacy) {
  closePrivacy.addEventListener("click", () => {
    if (privacyWindow) {
      privacyWindow.style.display = "none";
    }
  });
}

/* =========================================================
   25. FERMER TERMS / PRIVACY EN CLIQUANT DEHORS
========================================================= */

[termsWindow, privacyWindow].forEach((windowBox) => {
  if (!windowBox) {
    return;
  }

  windowBox.addEventListener("click", (event) => {
    if (event.target === windowBox) {
      windowBox.style.display = "none";
    }
  });
});

/* =========================================================
   26. CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    /* ---------- INPUTS ---------- */

    const nameInput = document.getElementById("name");

    const emailInput = document.getElementById("email");

    const subjectInput = document.getElementById("subject");

    const messageInput = document.getElementById("message");

    /* ---------- VALEURS ---------- */

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const subject = subjectInput.value.trim();

    const message = messageInput.value.trim();

    /* ---------- CHAMPS VIDES ---------- */

    if (!name || !email || !subject || !message) {
      alert("Veuillez remplir tous les champs.");

      return;
    }

    /* ---------- EMAIL ---------- */

    if (!emailInput.checkValidity()) {
      alert("Veuillez entrer une adresse e-mail valide.");

      emailInput.focus();

      return;
    }

    /* ---------- CONTENU ---------- */

    const emailBody =
      `Nom : ${name}\n` + `Email : ${email}\n\n` + `Message :\n${message}`;

    /* ---------- MAILTO ---------- */

    const mailto =
      `mailto:medagdev@outlook.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    /* ---------- OUVRIR EMAIL ---------- */

    window.location.href = mailto;
  });
}

/* =========================================================
   27. DEMARRER LE SON APRES UNE INTERACTION
========================================================= */

/*
  IMPORTANT :

  Ce listener ne relance pas la musique
  si l'utilisateur vient de la couper.

  Il sert uniquement à permettre au navigateur
  de démarrer la musique après une interaction.
*/

document.addEventListener(
  "click",
  () => {
    if (localStorage.getItem("conditions") === "acceptées" && soundEnabled) {
      startMusic();
    }
  },
  {
    once: true,
  },
);
