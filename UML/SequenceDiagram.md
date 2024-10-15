sequenceDiagram
  participant Utilisateur as Utilisateur
  participant repos entitie as repos entitie
  participant lang entitie as lang entitie
  participant status entitie as status entitie
 
Utilisateur ->>+ repos entitie: Demande la liste des repos
repos entitie -->>- Utilisateur: Afficher la liste des repos

repos entitie ->>+ lang entitie: Demande les langues associées au repo
  
lang entitie -->>- repos entitie: Retourne les langues du repo
  
repos entitie ->>+ status entitie: Demande le statut du repo
status entitie -->>- repos entitie: Retourne le statut du repo

Utilisateur ->>+ repos entitie: Sélectionne un repo spécifique
repos entitie ->>+ lang entitie : Demande detail de language
repos entitie ->>+ status entitie : Demande détail de status

Note over status entitie : Recherche detail des repos... (2s)
status entitie -->>- repos entitie: Retourne les infos du repo
  
  
  
  
Utilisateur ->>+ repos entitie: Filtre la liste des repos par langue
repos entitie ->>+ lang entitie : Demande les repos correspondant à la langue sélectionnée
lang entitie -->>- repos entitie: Retourne la liste filtrée des repos

repos entitie -->>- Utilisateur: Afficher les détails du repo (langues et statut)
