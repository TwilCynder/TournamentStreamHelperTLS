# Tuto stream TLS

## Installation

Il faut avoir l'environement de stream (c'est à dire l'ensemble des fichiers nécessaires ou utiles au stream) à jour. Ce dernier est géré avec git, donc : 
- Si il n'est pas déjà présent sur le PC, deux solutions.
  - La première, beaucoup plus simple, ne permettra cependant pas de mettre à jour par la suite (faudra tout re-DL) : aller sur https://gitlab.com/TwilCynder/TournamentStreamHelperTLS, bouton de téléchargement en bas à droite
  - La seconde est recommandée sur un PC qui va resservir : si ce n'est pas déjà fait, installer [Git](https://www.git-scm.com/downloads) (garder les options par défaut dans l'installeur), puis clic droit sur le dossier dans lequel l'environement de stream sera installé, "Git bash here", puis taper "`git clone --recurse-submodules https://gitlab.com/TwilCynder/TournamentStreamHelperTLS `" dans le terminal qui vient de s'ouvrir. 
- Si l'environement de stream est déjà installé, clic droit sur le dossier (qui doit s'appeller `TournamentStreamHelperTLS` ou `TournamentStreamHelperTLS-main`), `Git Bash Here`, puis taper `git pull origin main`. Si un message d'erreur s'affiche, demander à une personne qui s'y connait en Git, si pas dispo on cherche pas à comprendre, on supprime et on réinstalle à zéro. 

Ensuite, si les scènes ne sont pas déjà faites dans OBS : 
- Dans OBS, menu "Scene Collection" > "Import"; sélectionner `Scenes/TLS.json` dans l'environement de stream (CàD le fichier TLS.json dans le sous-dossier "Scenes" dans le dossier de stream). 
- Il va râler parce qu'il ne trouve pas certains fichiers : l'emplacement de chaque fichier (et la nécesité ou non de les chercher selon la situation) est disponible à la fin de ce document.  

Pour les réglages dans OBS, je vais pas pouvoir expliquer tout ça ici, faudra qu'il y ait quelqu'un qui sache le faire à chaque fois pour l'instant.

Il faut maintenant lancer Tournament Stream Helper (TSH): ce dernier existe en 2 version dans l'environement de stream
- La première, la version publique normale, ne permet pas d'utiliser les scènes "VS Screen" et "Animated VS Screen". Mais au moins c'est pas compliqué, suffit de double cliquer sur `TSH_.exe`.
- La seconde, modifiée par moi, permet d'utiliser toutes les scènes, mais doit se lancer via le source python : 
  - Ouvrir l'invite de commande
  - S'assurer que python est bien installé et dispo depuis le terminal, CàD taper `python`, et si ça ouvre le windows store, cliquer sur installer.
  - Une fois python installé, taper `pip install -r ./dependencies/requirements.txt`, puis `python main.py`

La première fois qu'on lance TSH il faut télécharger les assets de smash ultimate, pour ça : dans TSH, bouton de menu en haut à droite, "Downlad assets", sélectionner Super Smash bros. utimate en haut de la fenêtre qui vient de s'ouvrir, installer le premier pack dans la liste.

## Utilisation
Maintenant que tout est installé : 

- A chaque début de tournoi, dans TSH, cliquer sur "Set tournament", et entrer l'URL du bracket, qui sera toujours de forme `https://start.gg/tournament/.../events/...` (most likely `https://start.gg/tournament/stock-o-clock-x/events/1v1-ultimate`). 
- Pour chaque match, le sélectionner dans la liste des matchs du tournoi en cliquant sur `Load sets from xxx` en bas
- Presque tout est mis à jour automatiquement, il faut juste remplir manuellement : 
  - Les persos
  - Le champ "Best of" au milieu, pour indiquer si on est en BO3 ou BO5
  - Le score : des fois il se met à jour tout seul si les TOs le rentrent en temps réel sur smashgg, et des fois il refuse d'être changé manuellement, auquel cas cliquer sur la petite croix à droite de "Auto update" tout en bas le calmera
  - Les commentateurs : pour ça il faut aller chercher dans l'onglet "Commentary"