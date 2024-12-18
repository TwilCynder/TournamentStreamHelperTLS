# Guide de la régie en weekly TLS
## Installation
### Physique
- On commence par placer les 5 écrans (les 2 samsung pour la régie, le Viewsonic pour les casters, les 2 AOC pour les joueur.euses) ; on branche leurs alims  
- On sort le PC, et on lui branche le hub USB (boite en carton blanche) ; on branche l'alim du PC ainsi que celle du hub (qui doit se trouver dans sa boite ; le hub doit bien avec une alim + un cable USB connecté au PC)  
- On branche
  - Sur le PC obligatoirement ; la carte de capture (boite plastique),
  - Sur le PC ou sur le hub peu importe : le casque de la régie (HyperX, il est sans-fil y a une clé USB à brancher), la carte son* (Scarlett 2i2, boite en carton blanche, câble USB dans la boite), le clavier, la souris, le stream deck
- Pour les caméras : on va brancher 2 cams, une pour les joueurs et une pour les casters ; laquelle va où dépend de la venue
  - On branche la Logi Stream Cam (cam grise carrée, se branche en USB-c sur le PC)
  - On branche une cam C992 (cams noires dans la boite plastique) sur une rallonge USB 
  - Entre les joueurs et les casters, ceux qui sont près de la régie prennent la Logi Stream Cam, ceux qui sont loin prennent la C992
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
    - Les casques et leurs cables sont séparés, ils faut brancher le câble (prise rectangulaire) dans le casque, puis insérer placer vis qui se trouve au fond de la housse dans l'orifice de la prise du casque (pour maintenir le câble)
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
    - Sur la scène "Cam Joueurs Base NE PAS UTILISER", si rien ne s'affiche double cliquer sur la source caméra, et choisir la bonne cam dans la liste en haut (il est possible d'avoir l'impression que c'est déjà la bonne de sélectionner, mais qu'il faille quand même aller manuellement re sélectionner la bonne dans la liste. Si ça marche toujours pas, Désactiver -> Activer toujours dans la propriétés de la source)
    - Pareil sur la scène Cam Casters, et la scène Cam Salle
  - Ensuite on vérifie **le son**
Dans les paramètres d'OBS, partie son, on sélectionne le périphérique "Hyper X" dans la partie "périphérique de monitoring"
Pour la suite on va regarder le panneau du son en bas de l'interface d'OBS : on y voir chacune des entrées, représentées, par une barre : si cette abrre s'anime quand on parle dans un micro c'est que du son est capté

