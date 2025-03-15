//  Recuperer les elements html

const formulaire = document.getElementById('formulaire');
const titreActivite = document.getElementById('titreActivite');
const descriptionActivite = document.getElementById('descriptionActivite');
const btnAjouter = document.getElementById('btnAjouter');
let message = document.querySelector('.message');
const list = document.querySelector('.list');

// verifier si les champs obligatoires sont saisis
function checkInput(){
    
    let inputIsvalid = true;

    if (titreActivite.value.trim() === "") {
        titreActivite.style.border = "1px solid red";
        message.textContent = "Veuillez renseigner les champs obligatoires";
        message.style.backgroundColor = "#f5ab0a";
        message.style.display = "block";
        reset();
        inputIsvalid = false;
    } else {
        message.textContent = "Activité ajouter avec succés."
        message.style.backgroundColor = "#72f172";
        message.style.display = "block";
        reset();
    } 

    return inputIsvalid;
}


// gestion du formulaire


formulaire.addEventListener('submit', function(envent) {
    // empecher le rechargement de la page
    envent.preventDefault();

    if (checkInput() === true) {
        // afficher la liste des activités
        list.style.display ="block";
    
        // ajouter un activité 
            // créer l'indicateur d'état de l'activité
            const badge = document.createElement("div");
            badge.className = "badge badge-a-faire";
            list.appendChild(badge);

            // créer le conteneur des informations de l'activité
            const listInfo = document.createElement("div");
            listInfo.className = "list-info";
            badge.appendChild(listInfo);

            // créer le titre de l'activité
            let infoTitle = document.createElement("h2");
            infoTitle.className = "info-title";
            infoTitle.textContent = titreActivite.value.trim();
            listInfo.appendChild(infoTitle);

            // créer la description de l'activité
            let infoDescription = document.createElement("p");
            infoDescription.className = "info-description";
            infoDescription.textContent = descriptionActivite.value.trim();
            listInfo.appendChild(infoDescription);

            // créer les différents etas de l'activité
            const select = document.createElement("select");
            select.className = "info-etat";
            listInfo.appendChild(select);

            // créer les différents etat de l'activité
                // à faire
                const aFaire = document.createElement("option");
                aFaire.textContent = "à faire";
                aFaire.value = "à faire";
                aFaire.getAttribute("selected");
                select.appendChild(aFaire);
                // en cours
                const enCours = document.createElement("option");
                enCours.textContent = "en cours";
                enCours.value = "en cours";
                select.appendChild(enCours);
                // terminé
                const termine = document.createElement("option");
                termine.textContent = "terminé";
                termine.value = "terminé";
                select.appendChild(termine);
            // créer le boutton supprimer
            const container = document.createElement("p");
            container.className = "icon-supprimer";
            listInfo.appendChild(container);

            const btnSupprimer = document.createElement("i");
            btnSupprimer.className = ("ri-delete-bin-line");
            btnSupprimer.id = "btnSupprimer";
            container.appendChild(btnSupprimer);
            
            // changer l'état d'un activité 

            select.addEventListener('change', function() {

                if(select.value === "en cours") {
                    badge.classList.add("badge-en-cours");
                    badge.classList.remove("badge-a-faire");
                    badge.classList.remove("badge-termine");
                } 
                
                else if(select.value === "à faire") {
                        badge.classList.remove("badge-en-cours");
                        badge.classList.add("badge-a-faire");
                        badge.classList.remove("badge-termine");
                } 
                
                else if(select.value === "terminé") {
                    badge.classList.remove("badge-en-cours");
                    badge.classList.remove("badge-a-faire");
                    badge.classList.add("badge-termine");
                }
            });
           
            // supprimer une activité
            btnSupprimer.addEventListener("click", function() {
                badge.remove();
                // cacher la liste s'il n'y a aucune activé
                if(!list.lastElementChild){
                    list.style.display = "none";
                }
                // afficher un message de confirmation
                message.textContent = "L'activité à été supprimer."
                message.style.backgroundColor = "#369ee4";
                message.style.display = "block";
                reset();
            });

            // réinitialiser les champ de saisie
            titreActivite.value = "";
            descriptionActivite.value = "";
            titreActivite.focus();
    }
});


// enlever les messages  aprés 5 secondes
function reset() {
    
    let seconds = 5;

    let interval = setInterval(function()  {
        seconds--;

        if(seconds <= 0) {
            message.style.display = "none";
            clearInterval(interval);
        }
    }, 1000);
}