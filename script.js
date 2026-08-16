/* =========================================================
   1. ELEMENTS
========================================================= */

const confirmBox = document.querySelector(".confirm");
const home = document.querySelector(".home");
const continuer = document.getElementById("continue");

const popupSettings = document.getElementById("popup_settings");
const settings = document.getElementById("settings");

const popupContact = document.getElementById("popup_contact");
const contact = document.getElementById("contact");

const soundToggle = document.querySelector(".sound-toggle");
const soundIcon = document.querySelector(".sound-toggle i");
const soundText = document.querySelector(".sound-toggle .text");

const curseur = document.getElementById("curseur");
const volumeValue = document.getElementById("volume-value");


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
  preload: true,
});


/* =========================================================
   3. CONDITIONS
========================================================= */

const conditionsAccepted =
  localStorage.getItem("conditions") === "acceptées";

if (conditionsAccepted) {

  if (confirmBox) {
    confirmBox.style.display = "none";
  }

  if (home) {
    home.style.display = "flex";
  }

} else {

  if (confirmBox) {
    confirmBox.style.display = "flex";
  }

  if (home) {
    home.style.display = "none";
  }
}


/* =========================================================
   4. ETAT DU SON
========================================================= */

/*
   SON ACTIVE PAR DEFAUT.

   Si aucune préférence n'existe :
   => activé

   Si "activé" :
   => activé

   Si "désactivé" :
   => désactivé
*/

let soundEnabled =
  localStorage.getItem("son") !== "désactivé";


/* =========================================================
   5. VOLUME
========================================================= */

const savedVolume = localStorage.getItem("volume");

let currentVolume = 1;

if (savedVolume !== null) {

  const parsedVolume = Number(savedVolume);

  if (
    Number.isFinite(parsedVolume) &&
    parsedVolume >= 0 &&
    parsedVolume <= 1
  ) {
    currentVolume = parsedVolume;
  }
}


/* =========================================================
   6. APPLIQUER LE VOLUME
========================================================= */

sound.volume(currentVolume);

if (curseur) {
  curseur.value = currentVolume;
}

if (volumeValue) {
  volumeValue.textContent =
    Math.round(currentVolume * 100) + "%";
}


/* =========================================================
   7. MISE A JOUR DU SWITCH
========================================================= */

function updateSoundSwitch() {

  if (soundEnabled) {

    /* ICON ON */

    if (soundIcon) {
      soundIcon.classList.remove("fa-toggle-off");
      soundIcon.classList.add("fa-toggle-on");
    }

    /* TEXTE ON */

    if (soundText) {
      soundText.textContent = "Sound on";
    }

    /* ACCESSIBILITE */

    if (soundToggle) {
      soundToggle.setAttribute(
        "aria-label",
        "Disable sound"
      );

      soundToggle.setAttribute(
        "aria-pressed",
        "true"
      );
    }

  } else {

    /* ICON OFF */

    if (soundIcon) {
      soundIcon.classList.remove("fa-toggle-on");
      soundIcon.classList.add("fa-toggle-off");
    }

    /* TEXTE OFF */

    if (soundText) {
      soundText.textContent = "Sound off";
    }

    /* ACCESSIBILITE */

    if (soundToggle) {
      soundToggle.setAttribute(
        "aria-label",
        "Enable sound"
      );

      soundToggle.setAttribute(
        "aria-pressed",
        "false"
      );
    }
  }
}


/* =========================================================
   8. INITIALISER LE SWITCH
========================================================= */

updateSoundSwitch();


/* =========================================================
   9. DEMARRER LA MUSIQUE
========================================================= */

function startMusic() {

  /*
     Ne rien faire si le son est désactivé.
  */

  if (!soundEnabled) {
    return;
  }

  /*
     Ne pas relancer la musique
     si elle joue déjà.
  */

  if (sound.playing()) {
    return;
  }

  /*
     S'assurer que le son n'est pas mute.
  */

  sound.mute(false);

  /*
     Appliquer le volume actuel.
  */

  sound.volume(currentVolume);

  /*
     Lancer la musique.
  */

  sound.play();
}


/* =========================================================
   10. ACTIVER LE SON
========================================================= */

function soundOn() {

  soundEnabled = true;

  /*
     Sauvegarde.
  */

  localStorage.setItem("son", "activé");

  /*
     Retirer mute.
  */

  sound.mute(false);

  /*
     Mettre à jour le bouton.
  */

  updateSoundSwitch();

  /*
     Essayer de démarrer la musique.
  */

  startMusic();
}


/* =========================================================
   11. DESACTIVER LE SON
========================================================= */

function soundOff() {

  soundEnabled = false;

  /*
     Sauvegarde.
  */

  localStorage.setItem("son", "désactivé");

  /*
     Arrêter complètement la musique.
  */

  sound.stop();

  /*
     Sécurité supplémentaire.
  */

  sound.mute(true);

  /*
     Mettre à jour le bouton.
  */

  updateSoundSwitch();
}


/* =========================================================
   12. SWITCH SON
========================================================= */

if (soundToggle) {

  soundToggle.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();

    if (soundEnabled) {
      soundOff();
    } else {
      soundOn();
    }

  });
}


/* =========================================================
   13. VOLUME
========================================================= */

if (curseur) {

  curseur.addEventListener("input", () => {

    const volume = Number(curseur.value);

    /*
       Vérification.
    */

    if (
      !Number.isFinite(volume) ||
      volume < 0 ||
      volume > 1
    ) {
      return;
    }

    /*
       Mise à jour de la variable.
    */

    currentVolume = volume;

    /*
       Mise à jour Howler.
    */

    sound.volume(currentVolume);

    /*
       Mise à jour du texte.
    */

    if (volumeValue) {

      volumeValue.textContent =
        Math.round(currentVolume * 100) + "%";
    }

    /*
       Sauvegarde.
    */

    localStorage.setItem(
      "volume",
      currentVolume
    );
  });
}


/* =========================================================
   14. CONTINUER
========================================================= */

if (continuer) {

  continuer.addEventListener("click", () => {

    /*
       Son du bouton.
    */

    clickSound.play();

    /*
       Accepter les conditions.
    */

    localStorage.setItem(
      "conditions",
      "acceptées"
    );

    /*
       Cacher l'écran de bienvenue.
    */

    if (confirmBox) {
      confirmBox.style.display = "none";
    }

    /*
       Afficher la page principale.
    */

    if (home) {
      home.style.display = "flex";
    }

    /*
       Démarrer la musique.

       Le clic sur Continue constitue une
       interaction utilisateur.
    */

    if (soundEnabled) {
      startMusic();
    }

  });
}


/* =========================================================
   15. SETTINGS
========================================================= */

if (settings) {

  settings.addEventListener("click", () => {

    if (popupSettings) {
      popupSettings.style.display = "flex";
    }

  });
}


/* =========================================================
   16. CONTACT
========================================================= */

if (contact) {

  contact.addEventListener("click", () => {

    if (popupContact) {
      popupContact.style.display = "flex";
    }

  });
}


/* =========================================================
   17. FERMER LES POPUPS
========================================================= */

const closeButtons =
  document.querySelectorAll(".close");

closeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const popup =
      button.closest(".popup");

    if (popup) {
      popup.style.display = "none";
    }

  });

});


/* =========================================================
   18. FERMER POPUP EN CLIQUANT SUR LE FOND
========================================================= */

document
  .querySelectorAll(".popup")
  .forEach((popup) => {

    popup.addEventListener("click", (event) => {

      if (event.target === popup) {
        popup.style.display = "none";
      }

    });

  });


/* =========================================================
   19. TERMS / PRIVACY
========================================================= */

const terms =
  document.querySelectorAll(".terms");

const privacy =
  document.querySelectorAll(".privacy");

const termsWindow =
  document.getElementById("termsWindow");

const privacyWindow =
  document.getElementById("privacyWindow");

const closeTerms =
  document.getElementById("closeTerms");

const closePrivacy =
  document.getElementById("closePrivacy");


/* =========================================================
   20. TERMS
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
   21. PRIVACY
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
   22. FERMER TERMS
========================================================= */

if (closeTerms) {

  closeTerms.addEventListener("click", () => {

    if (termsWindow) {
      termsWindow.style.display = "none";
    }

  });

}


/* =========================================================
   23. FERMER PRIVACY
========================================================= */

if (closePrivacy) {

  closePrivacy.addEventListener("click", () => {

    if (privacyWindow) {
      privacyWindow.style.display = "none";
    }

  });

}


/* =========================================================
   24. FERMER TERMS / PRIVACY EN DEHORS
========================================================= */

[termsWindow, privacyWindow].forEach(
  (windowBox) => {

    if (!windowBox) {
      return;
    }

    windowBox.addEventListener(
      "click",
      (event) => {

        if (event.target === windowBox) {

          windowBox.style.display = "none";

        }

      }
    );

  }
);


/* =========================================================
   25. CONTACT FORM
========================================================= */

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      /* INPUTS */

      const nameInput =
        document.getElementById("name");

      const emailInput =
        document.getElementById("email");

      const subjectInput =
        document.getElementById("subject");

      const messageInput =
        document.getElementById("message");


      /* VERIFICATION DES ELEMENTS */

      if (
        !nameInput ||
        !emailInput ||
        !subjectInput ||
        !messageInput
      ) {

        console.error(
          "Erreur : champs du formulaire introuvables."
        );

        return;
      }


      /* VALEURS */

      const name =
        nameInput.value.trim();

      const email =
        emailInput.value.trim();

      const subject =
        subjectInput.value.trim();

      const message =
        messageInput.value.trim();


      /* CHAMPS VIDES */

      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {

        alert(
          "Veuillez remplir tous les champs."
        );

        return;
      }


      /* EMAIL */

      if (!emailInput.checkValidity()) {

        alert(
          "Veuillez entrer une adresse e-mail valide."
        );

        emailInput.focus();

        return;
      }


      /* CORPS DU MAIL */

      const emailBody =
        `Nom : ${name}\n` +
        `Email : ${email}\n\n` +
        `Message :\n${message}`;


      /* MAILTO */

      const mailto =
        "mailto:medagdev@outlook.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(emailBody);


      /* OUVRIR LE CLIENT MAIL */

      window.location.href = mailto;

    }
  );
}


/* =========================================================
   26. AUTORISATION AUDIO APRES INTERACTION
========================================================= */

/*
   Certains navigateurs bloquent l'audio automatique.

   On profite donc d'une interaction utilisateur
   pour essayer de démarrer la musique.

   IMPORTANT :
   Si l'utilisateur a désactivé le son,
   on ne relance PAS la musique.
*/

function handleFirstInteraction() {

  if (!soundEnabled) {
    return;
  }

  if (
    localStorage.getItem("conditions") !==
    "acceptées"
  ) {
    return;
  }

  startMusic();
}


/* =========================================================
   27. PREMIERE INTERACTION
========================================================= */

document.addEventListener(
  "click",
  handleFirstInteraction,
  {
    once: true,
  }
);


/* =========================================================
   28. CLAVIER
========================================================= */

document.addEventListener(
  "keydown",
  handleFirstInteraction,
  {
    once: true,
  }
);