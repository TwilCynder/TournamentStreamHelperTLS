# Tuto stream TLS

## Installation (au début du tournoi)

### Physique
- On commence par placer les 5 écrans (2 régie, 1 caster, 2 joueurs), et brancher leurs alim
- On branche le HUB USB au PC
- On branche
  - sur le PC obligatoirement : carte capture, cam logitech
  - sur le PC ou le HUB peu importe : la carte son, le casque régie, la souris, le clavier, la cam casters
- On branche 6 HDMIs : deux entre les écrans régie et le PC, un entre la switche et le IN de la carte capture, un entre le OUT de la carte capture et le IN du splitter, deux entre les sorties du splitter HDMI et les écrans joueurs. 
- On branche les casques à la carte son : il faut trouver le splitter jack dans le sac des câbles, c'est un splitter normal mais avec des grosses prises jack, et on le branche sur la prise en bas à droite de la carte son. Puis, pour chaque casque, on branche son bros embout jack au splitter, et l'autre embout à la prise correspondante sur l'avant de la carte son.
- On branche le cable ethernet de la box (sous la table des casters) au PC.
- On sort aussi l'ampli jack (le truc sur lequel les joueurs doivent brancher leurs casques) : on n'oublie pas son bloc chargeur, et on met le jack sur un des deux écrans. 
- On place le PC portable qui va servir aux cams joueurs, on y branche les 2 cams joueur, dessus on ouvre [VDO Ninja](https://VDO.ninja) dans un navigateur. Une fois ouvert on clique sur "Add your camera to OBS", on sélectionne une des 2 cams, pour le son "No Audio", on clique sur "START", *et on répète le process pour la 2ème cam*. Pour les deux cams, on copie l'URL qui s'affiche maintenant en vert en haut (pas dans la barre d'URL du navigateur, juste en dessous) et on l'envoie sur le serveur discord "en général dans le channel #régie-stream".  

### Logicielle
Si tout n'est pas déjà installé, voir section "Première installation" plus bas

On commence par lancer OBS.

Dans OBS : 

- On commence par vérifier les caméras (à savoir : les "cam joueurs" c'est les cams devant eux, la "cam joueurs 2" c'est la cam en contre-plongée).
  - Pour la cam joueurs 2, cam casters, et puis le jeu (la carte de capture compte comme une cam), si y en a une qui marche pas on va dans une scène qui les contient (respectivement, "Cam Joueurs 2", "Casters", "TLS In Game"), dans la liste des sources on double-clique sur la source vidéo (c'est celle qui a une icône d'appareil photo), et on fait "désactiver" puis "activer". Si ça marche toujours pas, dans la liste déroulante en haut des propriétés, on choisit un autre périphérique puis on remet l'ancien.
  - Pour les cam joueurs, on va dans les scènes "Cam Joueur Face x only", double clic sur la source navigateur, et on colle l'URL qu'on avait envoyé sur discord quand on a setup VDO Ninja.
- Ensuite IMPORTANT on vérifie le son
  - Dans les paramèrtres, partie Audio, dans "périphérique de monitoring" on choisit bien le casque de régie (CORSAIR machin là)
  - Ensuite on regarde le panneau de contrôle du son (en bas de l'écran de base d'OBS)
  - On vérifie qu'OBS entend bien les casters = quand ils parlent la barre verte o grise correspondant à "Casque casters" s'anime. Si ce n'est pas le cas on clic droit dessus -> propriétés, dans la liste déroulante on choisir celui qui contient "Scarlett" et/ou "2i2"
  - Pareil pour le casque régie
  - Si le casque régie n'entend pas le jeu et/ou les casters : clic droit dans la partie vide du panneau de contrôle du son, Propriétés Audio Avancées, pour les 2 sources "Casque Casters" et "Switch" on change "Monitoring et Sortie" en "Monitoring Désactivé" PUIS on remet à "Monitoring et Sortie"
  - ENSUITE on s'assure que OBS entend bien la switch et que le son du jeu le sort pas des écrans. Dans le cas contraire on branche le jack de l'ampli jack à l'autre écran et ça devrait être bon. 

On ouvre ensuite le dossier TLSStream qui se trouve sur le bureau.

Pour obtenir la dernière version de l'environement de stream (optionel donc, genre ce soir ne le faites aps):
- clic droit sur le dossier "TournamentStreamHelperTLS" > `Git Bash here`
- dans le terminal on tape `git checkout main` puis `git pull origin main`. En cas de message d'erreur, on demande à une personne qui s'y connait en git et si pas dispo tant pis on oublie

On ouvre le dossier TournamentStreamHelperTLS et on lance TSH (TSH.exe) : 

Dans TSH, cliquer sur "Set tournament", et entrer l'URL du bracket, qui sera toujours de forme `https://start.gg/tournament/.../events/...` (most likely `https://start.gg/tournament/stock-o-clock-x/events/1v1-ultimate`). 

Enfin (truc chiant mais ça va changer, pas obligatoire mais nécesaire pour avoir le truc qui affiche les derniers sets), on va voir dans le dossier "TournamentStreamHelperTLS/layout/last_results/", on ouvre "config.json", et on remplace l'URL de tournoi déjà présente par l'URL qu'on avait déjà mis dans TSH. 

## Utilisation (pendant le tournoi)

### Explication générales
Voir section suivante pour avoir juste la liste des chose à faire step by step. Lisez juste au moins la partie "OBS" ici.

**OBS** : 
- On est en mode studio, donc quand on sélectionne une scène elle s'affiche à gauche, le stram voit ce qui s'affiche à droite, pour passer la scène sélectionnée à gauche vers le stream il faut faire une transition (cliquer sur le bouton transition ou appuyer sur Maj+>. Ca utilise la transition par défaut, voir juste en dessous)
- On a différentes transitions entre les scènes, pour choisir la transition il y a un bouton par transition entre les 2 previews. En gros
  - On évite de trop utiliser les scènes "stingers", trop de transition cool tue la transition cool, perso je me calque sur la règle "Pas plus d'un stinger par minute et en priorité en début de fin de game"
  - Pour toutes passage d'une scène vers une scène qui a des éléments en commun, on peut utiliser la transition "Move".  
  - Et pis sinon la transition "Fondu" c'est le dernier recours, quand la Move est pas pertinente mais qu'on a fait trop de Stinger récemment
- Pour prendre un clip, Maj+!

**Scène OBS** :  
Je ne vais pas lister les scènes ici, si vous ne les connaissez pas bien le mieux c'est de toutes les regarder pour voir ce qu'elles affichent, ou de suivre le guide en section suivante ! QUelques scène spéciales : 
- BracketTLS : affiche le bracket du top 8 uniquement, bien joli et tout, voir dans la partie TSH juste en dessous pour voir comment faire pour le bracket s'affiche bien
- TLS Bracket : là c'est juste une page startgg avec le bracket mais en plus joli, on ouvre le bracket sur startgg et on copie l'URL pour la coller dans les propriétés de la source navigateur présente dans cette scène (elle met du temps à bien s'afficher) ; pour scroll sur le bracket on sélectionne la source navigateur, on clique sur le bouton "Interagir" juste au dessus des sources, et on scroll
- Les scènes avec replay dans le nom affichent le dernier replay, pour prendre un replay on appuie sur "Maj+!"


**Utilisation de TSH**
- Pour chaque match, le sélectionner dans la liste des matchs du tournoi en cliquant sur `Load sets from xxx` en bas
- Presque tout est alors mis à jour automatiquement, il faut juste remplir manuellement : 
  - Les persos
  - Le champ "Best of" au milieu, pour indiquer si on est en BO3 ou BO5
  - Les commentateurs : pour ça il faut aller chercher dans l'onglet "Commentary"  
Le score s'update tout seul si vous le mettez à jour sur startgg  
- Quand on veut afficher le bracket (Scène BracketTLS), déjà on se prépare à ce que ça fasse crash TSH, ça arrive c pas grave faut juste le relancer et remettre toutes les infos, on va dans l'onglet "arbre", dans le menu déroulant en haut à gauche on sélectionne "Top 8", on attend un peu (on ne touche surtout pas à TSH tant qu'il n'affiche pas le bracket), et normalement c'est bon

### Guide concret
**Entre les games**
- on affiche une des scènes "multi", un peu comme on veut, avec les casters en grand le plus souvent, avec les joueurs en grand quand ils arrivent etc, perso j'ai une petite préférences pour les multi avec 2 sources (et la liste des derniers sets) mais c'est bien de changer  
- une fois qu'on a le match sélectionné dans TSH on peut afficher la scène "Head2Head"
- sinon le bracket des fois c'est bien (voir scènes BracketTLS et TLS BRacket dans section précédente)
- dès qu'on sait qui joue on sélectionne le match dans TSH
- si changement de caster on pense à changer le nom dans TSH

**Début de match**
- on lance le match sur startgg, on clique sur "report game data", on choisit les persos (faut bien être sur l'écran avec une liste des games, les persos et stages et tout)
- on lance l'enregistrement
- éventuellement on affiche la scène "VSScreenTLS" juste avant qu'ils lancent

**Game**
- Dans startgg on renseigne le stage choisi, si besoin on change les persos pour la game en cours
- dès que la game commence on passe sur "TLS In-Game"
- On pense à prendre des clips avec Maj+! (souvent la dernière stock mais des fois c'est pas le + intéressant)
- Quand la game se termine, si on a pris un replay on passe sur une scène avec "replay" dans le nom, par contre en cas de popoff ça peut être bien de passer (en fondu carrément) sur une scène avec les joueurs en grand, puis ensuite de montrer le replay
- On update le score en choisissant le vainqueur pour cette game, sur startgg

**Fin de match**
- On pense à valider le résultat du match sur startgg

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
