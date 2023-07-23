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

On ouvre le dossier TournamentStreamHelperTLS et on lance TSH (TSH.exe) : 

Dans TSH, cliquer sur "Set tournament", et entrer l'URL du bracket, qui sera toujours de forme `https://start.gg/tournament/.../events/...` (most likely `https://start.gg/tournament/stock-o-clock-x/events/1v1-ultimate`). 

Ensuite, si on a la tablette pour le stage strike
- on va dans l'onglet "Rules"/"Règles", et dans le dropdown tout en haut on choisit TLS. 
- dans ce même onglet en bas, il doit y avoir un URL : on ouvre firefox sur la tablette et on rentre cet URL. 

Enfin (truc chiant mais ça va changer, pas obligatoire mais nécesaire pour avoir le truc qui affiche les derniers sets sur les scènes Duo), on va voir dans le dossier "TournamentStreamHelperTLS/layout/last_results/", on ouvre "config.json", et on remplace l'URL de tournoi déjà présente par l'URL qu'on avait déjà mis dans TSH. 

## Utilisation (pendant le tournoi) 
### Explication générales
Voir section suivante pour avoir juste la liste des chose à faire step by step, là c'est la partie explications (c'est bien d'avoir lu ça au moins une fois quand même). Lisez juste au moins la partie "OBS" ici. Les parties précédées d'un 🅰️ sont les trucs un peu "avancés" : c'est bien de les connaître mais pas besoin de les maîtriser dès le début.

**OBS** : 
- Rappel du système / concept de base : une **Scène** est basiquement un layout, un "écran" du stream avec ses éléments et leur placement (caméras, overlay, etc). La base de la régie ça va être d'afficher la bonne scène au bon moment.
- On est en mode studio, avec preview à gauche et stream à droite ; quand on sélectionne une scène elle s'affiche à gauche, le stram voit ce qui s'affiche à droite, pour passer la scène sélectionnée en preview vers le stream il faut faire une transition. Pour ça vous pouvez utiliser le bouton transition entre la preview et le stream (ou faire Maj+>). 
- On a différentes transitions entre les scènes ; si vous utilsez le bouton "transition" ça fait une transi par défaut mais on peut choisir la transition qu'on utilise (je recommande mais pour le début vous embêtez pas), avec les boutons en dessous du bouton transition. En gros : 
  - Les transitions "Stinger" c'est les animations stylées avec le logo TLS ; à utiliser modérément, trop de transition cool tue la transition cool. Voir section suivante pour des indications plus précises à ce niveau là.
  - "Move" c'est une transition qui déplace les éléments, en gros à utiliser entre 2 scènes qui ont des éléments en commun. 
  - Et pis sinon la transition "Fondu" c'est juste un fondu normal, à utiliser quand move est pas pertinent et qu'on veut pas faire de Stinger.
- **Replays/Clip** (c'est pareil) : pour prendre un clip, c'est Maj+!. Si vous utilisez que ce raccourci, vous allez toujours avoir seulement le dernier clip pris qui s'affiche ; souvent ça suffit, et si vous voulez pas vous compliquer la vie on peut s'en contenter. 🅰️*Cependant*, il y a un système de playlist, c'est à dire que vous pouvez enregistrer plusieurs clips pour qu'ils soient joués à la suite. Maj+! prend un clip et vide la playlist avant de mettre le nouveau clip dedans ; Maj+: ajoute juste un nouveau clip dans la playlist. Donc concrètement on va faire Maj+! pour le premier clip de la game, et si y en a d'autres on fait Maj+: à chaque fois.
- "Downstream Keyer" : dans les panneaux en bas d'IBS vous en avez un qui s'appelle "Downstream Keyer". Ca vous permet de superposer des trucs sur la scène actuelle (peu importe sur quelle scène vous êtes). Vous avez la liste des éléments que vous pouvez afficher, cliquez sur l'un d'eux pour l'afficher (par dessus la scène actuelle). Pour le faire disparaître, cliquez sur l'icône "pause" en bas de la liste (non ça ne fait pas de sens).
- **Stage Strike** : pour le stage strike, en gros dès que les joueurs utilisent la tablette pour faire le stage strike, si vous cliquez sur "Stage strike" dans la liste du Downstream Keyer ça va afficher le stage strike en bas (peu importe la scène où vous êtes, vu que c'est le Downstream Keyer).

**Scènes OBS** :  
Je ne vais pas lister les scènes ici, si vous ne les connaissez pas bien le mieux c'est de toutes les regarder pour voir ce qu'elles affichent (j'ai un doute sur telle scène, je clique juste dessus pour la voir dans la preview), ou de suivre le guide en section suivante pour savoir quand mettre quoi !  Quelques scène spéciales : 
- Les scènes avec "Replay" dans le nom affichent le replay/clip (ou plus précisément, si vous avez tout lu dans la partie sur les clips, la playlist des replays).
- BracketTLS 🅰️ : affiche le bracket du top 8 uniquement, bien joli et tout, voir dans la partie TSH juste en dessous pour voir comment faire pour le bracket s'affiche bien
- TLS Bracket 🅰️ : là c'est juste une page startgg avec le bracket mais en plus joli, on ouvre le bracket sur startgg et on copie l'URL pour la coller dans les propriétés de la source navigateur présente dans cette scène (elle met du temps à bien s'afficher) ; pour scroll sur le bracket on sélectionne la source navigateur, on clique sur le bouton "Interagir" juste au dessus des sources, et on scroll (avec la molette de la souris normal)

**Utilisation de TSH**
- On va charger les matchs avec la liste qui s'ouvre en cliquant sur `Load sets from xxx` en bas. Les sets qui nous intéressent sont ceux qui ont le nom de la chaine indiqué à gauche (c'est ceux qui sont streamés) ; vous pouvez faire double clic sur la colonne "Stream" pour afficher ces sets là en haut. En général vous sélectionnez juste le premier set streamé de la liste.
- Presque tout est alors mis à jour automatiquement, il faut juste remplir manuellement : 
  - Les persos 
  - Le champ "Best of" au milieu, pour indiquer si on est en BO3 ou BO5
  - Les commentateurs : pour ça il faut aller chercher dans l'onglet "Commentary"  
Le score s'update tout seul si vous le mettez à jour sur startgg (donc faut ouvrir le set sur firefox à côté, et mettre à jour game par game au fur et à mesure du set. Sur la "fenêtre" du set startgg on
- Quand on veut afficher le bracket (Scène BracketTLS), déjà on se prépare à ce que ça fasse crash TSH, ça arrive c pas grave faut juste le relancer et remettre toutes les infos, on va dans l'onglet "arbre", dans le menu déroulant en haut à gauche on sélectionne "Top 8", on attend un peu (on ne touche surtout pas à TSH tant qu'il n'affiche pas le bracket), et normalement c'est bon

### Guide concret
Là c'est la partie à relire si vous voulez vous rafraichir un peu/avez un doute sur la marche à suivre pendant le tournoi.

**Début de stream**
- On ouvre sur la scène casters en général, jusqu'à ce que les joueurs arrivent (also j'aime bien passer sur casters + scoreboard dès que les casters demandent inévitablement qui joue en premier)

**Début de match/Avant match**
- On sélectionne le match dans TSH
- Dès que les joueurs sont là on passe sur une des scènes Trio/Duo (voir partie "Entre les games") histoire d'avoir les joueurs et les casters affichés (en général on met les joueurs en grand quand ils sont installés)
- on lance le match sur startgg, on clique sur "report game data". Pas besoin de mettre les persos pour l'instant.
- on lance l'enregistrement
- En général on essaie d'afficher la scène "Head2Head", et/ou "Result History" pour les infos, et "VSScreen Cams" un peu avant qu'ils lancent. 

**Game**
- Quand vous voyez que les joueurs sont en train de faire le ban des stages sur la tablette, vous affichez le Downstream Keyer "Stage Strike" (c'est bien avec une scène qui montre la cam joueurs 2 en grand, voire carrément de mettre la scène Cam Joueurs 2 basique).
- Dans startgg on renseigne le stage choisi. Pas besoin de mettre les persos.
- dès que la game commence on passe sur "TLS In-Game"
- On pense à prendre des clips (Maj+! pour le premier clip de la game, et si jamais y d'autres clips dans la même game Maj+: pour l'ajouter par dessus le précédent au lieu de le remaplcer)
- Quand la game se termine, si on a pris des clips on passe sur une scène avec "replay" dans le nom, par contre en cas de popoff ça peut être bien de passer (en fondu carrément pour aller vite) sur une scène avec les joueurs en grand, puis ensuite de montrer le replay. 
- On update le score en choisissant le vainqueur pour cette game, sur startgg.

**Entre les games**
- on affiche une des scènes "Trio" ou "Duo", un peu comme on veut, avec les casters en grand le plus souvent, perso j'ai une petite préférences pour les Duo (qui affichent la liste des derniers sets) mais c'est bien de changer.
- dès qu'on sait qui joue on sélectionne le match dans TSH
- Si les casters ont demandé une info sur un des trucs qu'il y a dans la liste du Downstream Keyer, ou si ils ont dit de la merde (rappel : ceux qui commencent par "DSK" c'est les slides informatives, ça inclut le poids d'un perso, fonctionnement des pikmins, etc).

**Fin de match**
- Là seulement on met les persos sur startgg, et on fait "Submit Result".
- On arrête l'enregistrement

**Entre les matchs**
- C'est un peu comme pour entre les games, on met une scène Trio/Duo
- Si on est en Top 8, c'est le moment d'afficher le BracketTLS (voir section précédente)
- si changement de caster on pense à changer le nom dans TSH
- Et puis on repart à la partie "Début de match/Avant match"

Et surtout n'oubliez pas, je vous donne des indications sur les scènes à mettre, et si vous suivez mes indications normalement vous avez un stream propre, mais au final c'est à vous de juger quelle scène vous voulez mettre (hors des games en tout cas). Dans les scènes Duo/Trio mettez les casters en grand ou les joueurs en grand en fonction de ce qui vous paraît + intéressant / vivant sur le moment, et quand y a rien d'autre que les casters qui bouge on peut mettre la scène avec juste les casters, des fois le VSScreen Cams a la bonne vibe et des fois moins, bref.

## Première installation

Résumé : 
- clone ou pull de ce repository
- installation d'OBS
	- importer TLS.json
	- mettre en place les scripts countdown.lua et instant-replay.lua
- installation des plugins OBS :
	- transition matrix
 	- Move transition
    	- Downstream Keyer 
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
