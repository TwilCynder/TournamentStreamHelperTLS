# Tuto stream TLS

## Installation (au début du tournoi)

### Physique
- On commence par placer les 5 écrans (2 régie, 1 caster, 2 joueurs), et brancher leurs alim
- On branche le HUB USB au PC
- On branche
  - sur le PC obligatoirement : carte capture, cam logitech
  - sur le PC ou le HUB peu importe : la carte son, le casque régie, la souris, le clavier, la cam casters
- On branche le cable ethernet au PC
- On place le PC portable qui va servir aux cams joueurs, on branche les 2 cams joueur, on lance OBS dessus, on se met sur la scène avec les cams joueur (SUITE A VENIR)

### Logicielle
Si tout n'est pas déjà installé, voir section "Première installation" plus bas

On commence par lancer Logi Capture sur le PC, puis OBS.

Dans OBS : 
- On commence par passer par toutes les sources caméra, double clic sur la source et on choisit la bonne cam
- Pour les cams joueur, c'est une source NDI, il faut simplement sélectionner le nom qui est indiqué dans le menu NDI sur le pc portable 
- Ensuite IMPORTANT on vérifie le son
  - Dans les paramètres de son, dans "périphérique de monitoring" on choisit bien le casque de régie
  - Ensuite on regarde le panneau de contrôle du son (en bas de l'écran de base d'OBS)
  - On vérifie qu'OBS entend bien les casters = quand ils parlent la barre verte correspondant à "Casque casters" s'anime. Si ce n'est pas le cas on clic droit dessus -> propriétés, dans la liste déroulante on choisir celui qui contient "Scarlett" et/ou "2i2"
  - Pareil pour le casque régie
  - Si le casque régie n'entend pas le jeu et/ou les casters : clic droit dans la partie vide du panneau de contrôle du son, Propriétés Audio Avancées, pour les 2 sources "Casque Casters" et "Switch" on change "Monitoring et Sortie" en "Monitoring Désactivé" PUIS on remet à "Monitoring et Sortie"


On ouvre ensuite le dossier TLSStream qui se trouve sur le bureau.

Pour obtenir la dernière version de l'environement de stream (optionel donc):
- clic droit sur le dossier "TournamentStreamHelperTLS" > `Git Bash here`
- dans le terminal on tape `git checkout main` puis `git pull origin main`. En cas de message d'erreur, on demande à une personne qui s'y connait en git et si pas dispo tant pis on oublie

On ouvre le dossier TournamentStreamHelperTLS et on lance TSH (TSH.exe) : 

Au chaque début de tournoi, dans TSH, cliquer sur "Set tournament", et entrer l'URL du bracket, qui sera toujours de forme `https://start.gg/tournament/.../events/...` (most likely `https://start.gg/tournament/stock-o-clock-x/events/1v1-ultimate`). 

Enfin (truc chiant mais ça va changer, pas obligatoire mais nécesaire pour avoir le truc qui affiche les derniers sets), on va voir dans le dossier "TOurnamentStreamHelperTLS/layout/last_results/", on ouvre "overlay.js", et dans le code on cherche une URL de tournoi, on la remplace par l'URL du tournoi actuel

## Utilisation (pendant le tournoi)

**TSH** : 
- Pour chaque match, le sélectionner dans la liste des matchs du tournoi en cliquant sur `Load sets from xxx` en bas
- Presque tout est mis à jour automatiquement, il faut juste remplir manuellement : 
  - Les persos
  - Le champ "Best of" au milieu, pour indiquer si on est en BO3 ou BO5
  - Le score : des fois il se met à jour tout seul si les TOs le rentrent en temps réel sur smashgg, et des fois il refuse d'être changé manuellement, auquel cas cliquer sur la petite croix à droite de "Auto update" tout en bas le calmera
  - Les commentateurs : pour ça il faut aller chercher dans l'onglet "Commentary"



## Première installation

Résumé : 
- clone ou pull de ce repository
- installation d'OBS
	- importer TLS.json
	- mettre en place les scripts countdown.lua et instant-replay.lua
- installation des plugins OBS :
	- transition matrix
- installation des resources externes
	- Animated Lower Thirds -> installer le dock

Version longue : 

Il faut avoir l'environement de stream (c'est à dire l'ensemble des fichiers nécessaires ou utiles au stream) à jour. Ce dernier est géré avec git, donc deux solutions
  - La première, beaucoup plus simple, ne permettra cependant pas de mettre à jour par la suite (faudra tout re-DL) : aller sur https://gitlab.com/TwilCynder/TournamentStreamHelperTLS, bouton de téléchargement en bas à droite
  - La seconde est recommandée sur un PC qui va resservir : si ce n'est pas déjà fait, installer [Git](https://www.git-scm.com/downloads) (garder les options par défaut dans l'installeur), puis clic droit sur le dossier dans lequel l'environement de stream sera installé, "Git bash here", puis taper "`git clone --recurse-submodules https://gitlab.com/TwilCynder/TournamentStreamHelperTLS `" dans le terminal qui vient de s'ouvrir. 

Ensuite, si les scènes ne sont pas déjà faites dans OBS : 
- Dans OBS, menu "Scene Collection" > "Import"; sélectionner `Scenes/TLS.json` dans l'environement de stream (CàD le fichier TLS.json dans le sous-dossier "Scenes" dans le dossier de stream). 
- Il va râler parce qu'il ne trouve pas certains fichiers : l'emplacement de chaque fichier est disponible à la fin de ce document.  

Ensuite, installer les add-ons pour OBS : 
- [Transition Matrix](https://visualsbyimpulse.com/obs-transition-matrix/)
  - Lancer l'installeur qui vient avec puis relancer OBS

Ajout du dock Animated Lower Thirds (pour les po-ups) : 
- Dans un navigateur, ouvrir `tools/Animated-Lower-Thirds/lower thirds/control-panel.html`, copier l'URL qui s'affiche dans la barre d'URL
- Dans OBS, menu Docks>Custom Browser Docks, entrer l'URL copiée
- Même process dans le navigateur avec `tools/Animated-Lower-Thirds/lower thirds/browser-source.html`
- Dans la scène TLS In-Game, ouvrir les propriétés de la source "Pop Up", et entrer l'URL copiée 

En suite on lance TSH (TSH.exe, dans le dossier TournamentStreamHelperTLS).
La première fois qu'on le lance il faut télécharger les assets de smash ultimate, pour ça : dans TSH, bouton de menu en haut à droite, "Downlad assets", sélectionner Super Smash bros. utimate en haut de la fenêtre qui vient de s'ouvrir, installer le premier pack dans la liste, ainsi que le 2ème si on veut pouvoir utiliser la scène "VS Screen"

### Dossiers à check pour les fichiers d'obs
Avec le bouton "Search Directory" 

- layout/
  - alternating_logos
  - bracketTLS
  - castersTLS
  - last_results
  - recents_setsTLS
  - soreboardTLS
  - timer
- ResourcesTLS/common/
  - Transitions
  - Overlay
- tools/Animated-Lower-Thirds/lower thirds

Après avoir check tous ces dossiers il va manquer encore des fichiers, osef