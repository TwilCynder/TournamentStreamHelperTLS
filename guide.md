# Guide de la régie en weekly TLS
## Installation
### Physique
- On commence par placer les 5 écrans (les 2 samsung pour la régie, le Viewsonic pour les casters, les 2 AOC pour les joueur.euses) ; on branche leurs alims  
- On sort le PC, et on lui branche le hub USB (boite en carton blanche) ; on branche l'alim du PC ainsi que celle du hub (qui doit se trouver dans sa boite ; le hub doit bien avec une alim + un cable USB connecté au PC)  
- On branche
  - Sur le PC obligatoirement ; la carte de capture (boite plastique),
  - Sur le PC ou sur le hub peu importe : la carte son (Scarlett 2i2, boitier rouge dans une boite en carton blanche, câble USB dans sa boite), le clavier, la souris, le stream deck, le casque de la régie (HyperX, il est sans-fil y a une clé USB à brancher, il faut aussi l'allumer avec le bouton plat à gauche)
- Pour les caméras : on va brancher 2 cams, une pour les joueurs et une pour les casters ; laquelle va où dépend de la venue
  - Entre les joueurs et les casters, ceux qui sont près de la régie prennent la Logi Stream Cam (branchée en USB-C direct sur le PC), ceux qui sont loin prennent la C992 (branchée à une rallong USB)
  - Si possible, on branche et place une autre cam à un endroit où elle peut voir les spectateur.ices ou alors un plan large des joueur.euses (on l'appelle "Cam Salle")
  - Branchement des HDMI : 
    - Si les joueurs sont près de la régie : 
      - Switch -> Carte de capture (in)
      - Carte de capture (out) -> splitter noir (in) (boite en carton bleue)
      - Les 2 out du splitter : écrans joueurs
    - Si les joueurs sont trop loin pour tout brancher comme ça avec des HDMI normaux
      - Switch -> splitter noir (in)
        - Sortie 1 du splitter noir -> Carte de capture (in) avec long HDMI
        - Sortie 2 du splitter noir -> Petit splitter (in)
        - Les 2 out du petit splitter -> écrans joueurs
- On sort les casques (housses noires dans valise câbles)
    - Les casques et leurs cables sont séparés, ils faut brancher le câble (prise rectangulaire) dans le casque, puis insérer la vis qui se trouve au fond de la housse dans l'orifice de la prise du casque (pour maintenir le câble)
    - Chaque casque possède 2 prises son : une grosse (XLR) et une plus petite (Jack)
    - La prise XLR va dans l'XLR de la carte son (y en a 2 donc c bon)
    - Par contre y a qu'un Jack sur la carte son, donc il faut utiliser le splitter jack qui se trouve dans une des housses de casque
  - On branche le câble ethernet à la box
  - On allume le casque régie (bouton plat à gauche)  
    Si possible, on le branche en USB-c avant le stream (c'est juste pour le charger, donc avec un chargeur de tel c'est bien)
- On sort l'ampli jack : c'est le boitier dans une boite en carton
  - On branche son alim, et on pense à l'allumer
  - On branche son petit cable jack à un des écrans joueurs. Il faut que ce soit l'écran qui fait du son (y en a qu'un des 2 normalement) ; la prise jack de l'écran se trouve tout à droite en regardant l'arrière (y a 2 prises jack faut bien prendre celle tout au bout)

### Sur le PC
- On commence par lancer OBS
  - On commence par vérifier les **caméras**
    - Sur la scène "Cam Joueurs Base NE PAS UTILISER", si rien ne s'affiche double cliquer sur la source caméra, et choisir la bonne cam dans la liste en haut (il est possible d'avoir l'impression que c'est déjà la bonne de sélectionner, mais qu'il faille quand même aller manuellement re sélectionner la bonne dans la liste. Si ça marche toujours pas, Désactiver -> Activer, toujours dans la propriétés de la source)
    - Pareil sur la scène Cam Casters, et la scène Cam Salle
  - Ensuite on vérifie **le son**
    - Dans les paramètres d'OBS, partie son, on sélectionne le périphérique "Hyper X" dans la partie "périphérique de monitoring"
    - Pour la suite on va regarder le panneau du son en bas de l'interface d'OBS : on y voit chacune des entrées, représentées, par une barre vertivale : si cette barre s'anime quand on parle dans un micro c'est que du son est capté. Sur la source "Casters", clic droit -> propriétés, et on choisit "Scarlett 2i2"
    - Pareil pour "Régie" -> "Hyper X" et "Jeu/Switch" -> "HD60S"
    - Maintenant, surtout faut vérifier qu'on entend tout le monde au bon endroit (parler dans un micro, ou faire du bruit sur le jeu, et vérifier que la bonne barre de son s'anime). Attention, le casque de la régie a un bouton mute, c'est le bouton un peu bombé.
    - Si le casque régie n'entend pas les casters et le jeu : clic droit sur le panneau de son -> propriétés avancées, puis en face des 2 sources, on change "Monitoring et Sortie" en "Monitoring Désactivé" PUIS on remet à "Monitoring et Sortie". On remet donc comme c'était à la base au final, c'est un bug d'OBS qui nous oblige à faire ça
    - Si les casters n'entendent pas le jeu et la régie, clic droit sur l'entrée casque régie, filtres, dans la liste à gauche "Audio monitor", dans le menu déroulant à droite on choisit "Scarlett 2i2", et pareil pour le jeu (clic droit -> filtres sur l'entrée jeu)
    - Rappel : le casque régie entend tout au même volume que le stream, mais les casters ça peut se paramétrer individuellement. Pour changer le volume du son du jeu dans leurs oreilles (mais pas sur le stream), on peut aller dans le filtre audio monitor qu'on vient de voir et changer le volume ici.

On ouvre ensuite le dossier TLSStream qui se trouve sur le bureau.

On ouvre le dossier TournamentStreamHelperTLS et on lance TSH (TSH.exe).

Dans TSH, cliquer sur "Set tournament", et entrer l'URL de l'event (pas le tournoi, l'event spécifiquement), qui sera toujours de forme `https://start.gg/tournament/.../events/...`.

Ensuite, si on a la tablette pour le stage strike
- on va dans l'onglet "Rules"/"Règles", et dans le dropdown tout en haut on choisit TLS.
- dans ce même onglet en bas, il doit y avoir un URL : on ouvre firefox sur la tablette et on rentre cet URL.

TODO : Partie Companion
