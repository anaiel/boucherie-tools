# Documents de la Boucherie

## Enoncé du problème

### Contexte initial

L'intention initiale vient du fait que nous faisons une utilisation assez intensive de documents, mais que nous sommes régulièrement confrontés à des problématiques :

- les membres posent des questions, et ne savent pas qu'un document existent pour répondre à leur question
- les membres ont une vague idée qu'un document existe, ou imaginent qu'un document existent, mais n'arrivent pas à le retrouver
- les membres créent de nouveaux documents pour répondre à leurs besoins, ne sachant pas qu'un document similaire existe déjà
- les documents existant ne sont pas consultés
- les documents existant ne sont pas actualisés

Nous utilisons Google Drive pour stocker les documents, qui ne semble pas résoudre le problème. Des suppositions sur les raisons :

- Google Drive met en avant une structure hierarchisée avec des dossiers et sous dossiers. Cette strucutre est difficile à comprendre pour beaucoup de personnes.
- le lien vers le drive est lui même un lien parmis les mille autres liens, qu'il n'est pas facile de trouver.
- beaucoup de personnes n'ont pas recours à la feature de recherche parmis les documents (à confirmer ?)
- tous les documents ne sont malheureusement pas dans le même Drive

### Autres solutions envisagées

Une solution au problème de la complexité de la structure du Drive pourrait être d'en imaginer une refonte. Mais plusieurs difficultés indiquent que la solution serait certainement trop coûteuse :

- les membres pour qui trouver des documents est le plus difficile sont les nouvelleux membres. Il faudrait certainement imaginer une structure qui réponde à leur manque de connaissance de la structure interne du club. Or, ce serait certainement mettre en difficulté les membres plus expérimenté.es qui elleux se basent sur leur connaissance de la structure du club.
- une structure hierarchisée crée un coût d'entrée pour la création de nouveaux documents, car il faut savoir où bien les ranger. Le problème est déjà existant mais il faudrait privilégier une solution qui permette de contourner ce problème
- cette solution demanderait certainement d'avoir à disposition des ressources pour faire de la pédagogie sur l'organisation des documents. Mais où mettre ce nouveau document ?
- cela crée une nouvelle tâche de maintenance : s'assurer que les documents sont créés au bon endroit
- au fond, le Drive existe déjà et sa structure avait déjà été pensée pour être compréhensible, et l'expérience ne semble pas concluante. On aimerait une solution différente
- la hierarchie par dossier est unidimentionnelle (ou plutôt, la possibilité de faire des raccourcis vers d'autres documents n'est pas largement adoptée) et ne reflète pas les contextes d'utilisation multiples des documents

### Solution retenue

Créer une base de donnée des documents existant, à laquelle on assortirait une app qui permet de faire des recherches sur cette base de donnée.

Banque d'idées initiales :

- Base de données:
  - chaque document est représenté par :
    - son titre : pas forcément le même que celui du document lui même de manière à ce qu'il ait du sens sans le contexte initial d'utilisation du document
    - son lien
    - des tags :
      - pour permettre d'associer d'autres termes au document pour maximiser les chances d'aboutir de la requête. C'est particulièrement utile pour utiliser des termes différents de notre porpre jargon afin que les nouvelleaux puissent trouver les documents
      - pour pouvoir filtrer les documents facilement (par pôle, par équipe, pour les recrues, pour un événement particulier, etc.). Cela permet de montrer les affiliations multiples des documents
    - un complément d'information sur le document : lien vers un autre document qui en précise l'utilisation, lien vers un canal de discussion, précautions d'emploi, etc.
    - le nombre de clicks sur le document : pour ajouter un aspect social, voir facilement si un document est populaire ou non, etc.
  - utiliser une base de donnée Notion
    - Notion a une API simple d'utilisation
    - Cela permet d'avoir un autre format de présentation des ressources (via Notion) qui est lisible par l'humain, et donc multiplier les formats de sorte que si l'un ne convient pas pour quelqu'un, d'autres sont disponibles
- La recherche :
  - permet d'afficher simplement les résultats
- Features supplémentaires :
  - documents favoris
  - catégories suggérées (par exemple : premiers pas, péri-associatif, etc.)
  - explorer tous les documents (les + consultés, les - consultés, dernière mise à jour, etc. pour les personnes qui s'ennuient et favoriser la découverte aléatoire de documents)
  - autre base de données de FAQ
  - utiliser le petit chien de l'élite comme mascotte (faire une référence à Lycos ?)
  - mettre en avant un document à un moment précis (par exemple, le document de présence les premiers jours du mois ?)

[!WARNING]
Garder en tête que ce ne sont que des idées initiales, qu'il faut les confronter à l'étude plus pratique avec les utilisateur.ices de leurs besoins, et s'assurer que les features supplémentaires ne distraient pas de la résolution initiale du problème. Eviter les biais de confirmation.

Problème restant à résoudre :

- Privacy :
  - accès à l'application de recherche
  - accès à la base de données Notion
  - accès aux documents listés
- Contribution :
  - Qui peut alimenter la base de donnée et comment ?
- Maintenance :
  - Comment signaler des documents obsolètes, etc. ?
- Prise en compte des différentes typologies de documents et leurs spécificités :
  - documents de travail/éphémères (déplacements, organisation d'évent)
    - ne pas surcharger la recherche avec des résultats
      - passer par des dossiers contenant les fichiers ?
  - template de documents
  - bases de données (bibliothèques, liste de praticiens)
    - comment encourager le fait de les alimenter/mettre à jour ?
  - documents d'archive (comptes rendus de bootcamp, compte rendus de réunions)
    - cf documents de travail
  - documents explicatifs (tutoriels, playbook, etc.)
    - cf base de donnée

## Recherches UX

### Fogg Behavior Model

> Behavior happens when Motivation, Ability, and a Prompt come together at the same time. When a behavior does not occur, at least one of those three elements is missing.

[Source](https://behaviormodel.org/)

- **Motivation** : la motivation peut être haute ou basse suivant la situation : une personne souhaitant faire une tâche spécifique pour un pôle sera très motivée pour trouver le document, alors que quelqu'un qui a le devoir de remplir un document d'organisation (tableau de présence, document de déplacement) n'a pas le même degré de motivation intrinsèque
- **Ability** : Chercher un document est relativement difficile pour une personne, notamment si iel n'a pas connaissance de l'existence dudit document
- **Prompt** : Inexistant s'il s'agit d'une demande spontannée (demande de conseil de praticiens, etc.)

Ce modèle ne semble pas être très pertinent comme point de départ de l'exploration actuelle car il semble plutôt permettre de diagnostique un comportement/une absence de comportement. Ici nous avons une multitude de problèmes, mais nous souhaitons plutôt encourager un nouvel usage, changer un comportement. Il s'agit moins de diagnostiquer chaque comportement non souhaitable vis à vis des documents que de proposer un outil qui permet d'influencer efficacement les comportements.
Peut-être que ce modèle sera plus pertinent pour évaluer pour chaque persona si la solution finale permet de réunion les 3 conditions.

### COM-B Model for behaviour change

> The COM-B model is a behavior change framework that proposes three necessary components for any behavior (B) to occur. Through assessing capability (C), opportunity (O), and motivation (M), leaders, policymakers, and behavioral scientists can understand why a specific behavior occurs and how to create targeted interventions that lead to effective change.

[Source](https://thedecisionlab.com/reference-guide/organizational-behavior/the-com-b-model-for-behavior-change?utm_source=pocket_saves)

- **Capability** :
  - **Physical** : N/A
  - **Psychological** :
    - manque de connaissance des documents existants
    - manque de connaissance de la feature de recherche (dans le drive, dans discord)
    - charge cognitive pour créer un document (où ? quel drive, quel dossier ?)
    - charge cognitive pour partager un document (quel channel ?)
    - réticence à maintenir un document : sentiment de légitimité, malaisance avec la suite drive (édition, suggestion, commentaire)
- **Opportunity** :
  - **Social** :
    - Quand on parle d'un document en groupe, physiquement, on a rarement le lien sous la main et le trouver n'est pas aisé
    - Avantage des vidéos "1 jour 1 tips" lors du recrutement pour découvrir les documents importants, mais au delà de ça pas de prompt pour la découverte des documents
  - **Physical** : N/A
- **Motivation** :
  - **Automatic** :
    - Pas d'outil qui encourage la routine, pas de rappel, pas d'habitudes
    - La difficulté répétée à trouver les documents crée une habitude de découragement
    - C'est souvent les mêmes personnes qui pointent les documents, donc cela crée une habitude de se reposer sur elleux comme base de connaissance (alors que ces personnes se considèrent plutôt comme des personnes qui savent chercher, pas de connaissance a priori)
  - **Reflective** :
    - Il y a un bon sens du devoir chez la majorité des membres qui fait que les gens cherchent majoritairement à bien remplir les documents

1. **Stage 1** :
   a. **Define the problem in behavioral terms** : Les membres de la Boucherie ont la motivation pour échanger sur divers sujets (organisation, stratégie sportive, extra-associatif, etc.). La méthode privilégiée est l'utilisation de documents, mais on voit se répéter des comportements qui montrent une forme d'échec vis à vis de ces documents : difficultés à les trouver quand on le souhaite, méconnaissance des documents existants, création de nouveaux documents qui existent déjà, difficulté d'utilisation des documents existants, obsolescence de documents perdus qui finissent par ne plus être alimentés, etc.
   b. **Select the target behavior** : Les membres devraient avoir de la facilité à échanger sur les documents et la participation à la vie de ces documents devrait être agréable et valorisée. Les documents devraient évoluer vers une plus grande adaptation pour accomplir la tâche pour laquelle ils sont créés.

Je m'arrête là car j'ai encore l'impression de prendre le problème à l'envers. Mon idée part plutôt d'une solution, et il faudrait s'assurer que la solution a un impact en terme de behavior change et aussi voir comment ce framework permet d'inspirer de nouvelles idées.

### Enoncé de l'objectif

L'objectif est de valoriser la création de documents par et pour les membres de l'association, afin de favoriser leur adoption, leur partage et leur utilisation. Le but est d'encourager le plaisir et la fierté qu'ils nous apportent en s'assurant qu'ils sont faciles d'accès, connus, et entretenus par la communauté.

### Personas des membres

- **Nouvelle recrue**
- **Transfert**
- **Membre impliqué dans un pôle**
- **Membre lambda**
- **Membre à l'aise avec la technologie**
- **Membre créatif.ve**

### Typologies de documents
