# Tuto stream TLS

## Installation

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

Il faut avoir l'environement de stream (c'est à dire l'ensemble des fichiers nécessaires ou utiles au stream) à jour. Ce dernier est géré avec git, donc : 
- Si il n'est pas déjà présent sur le PC, deux solutions.
  - La première, beaucoup plus simple, ne permettra cependant pas de mettre à jour par la suite (faudra tout re-DL) : aller sur https://gitlab.com/TwilCynder/TournamentStreamHelperTLS, bouton de téléchargement en bas à droite
  - La seconde est recommandée sur un PC qui va resservir : si ce n'est pas déjà fait, installer [Git](https://www.git-scm.com/downloads) (garder les options par défaut dans l'installeur), puis clic droit sur le dossier dans lequel l'environement de stream sera installé, "Git bash here", puis taper "`git clone --recurse-submodules https://gitlab.com/TwilCynder/TournamentStreamHelperTLS `" dans le terminal qui vient de s'ouvrir. 
- Si l'environement de stream est déjà installé, clic droit sur le dossier (qui doit s'appeller `TournamentStreamHelperTLS`), `Git Bash Here`, puis taper `git pull origin main`. Si un message d'erreur s'affiche, demander à une personne qui s'y connait en Git, si pas dispo on cherche pas à comprendre, on supprime et on réinstalle à zéro. 

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

Ensuite on lance TSH (TSH.exe) : la première fois qu'on le lance il faut télécharger les assets de smash ultimate, pour ça : dans TSH, bouton de menu en haut à droite, "Downlad assets", sélectionner Super Smash bros. utimate en haut de la fenêtre qui vient de s'ouvrir, installer le premier pack dans la liste, ainsi que le 2ème si on veut pouvoir utiliser la scène "VS Screen"

## Utilisation
Maintenant que tout est installé : 

- A chaque début de tournoi, dans TSH, cliquer sur "Set tournament", et entrer l'URL du bracket, qui sera toujours de forme `https://start.gg/tournament/.../events/...` (most likely `https://start.gg/tournament/stock-o-clock-x/events/1v1-ultimate`). 
- Pour chaque match, le sélectionner dans la liste des matchs du tournoi en cliquant sur `Load sets from xxx` en bas
- Presque tout est mis à jour automatiquement, il faut juste remplir manuellement : 
  - Les persos
  - Le champ "Best of" au milieu, pour indiquer si on est en BO3 ou BO5
  - Le score : des fois il se met à jour tout seul si les TOs le rentrent en temps réel sur smashgg, et des fois il refuse d'être changé manuellement, auquel cas cliquer sur la petite croix à droite de "Auto update" tout en bas le calmera
  - Les commentateurs : pour ça il faut aller chercher dans l'onglet "Commentary"


## Annexe
 
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