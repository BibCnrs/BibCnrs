# BibAdmin

Admin for BibApi

Interface d'administration pour [BibApi](https://github.com/BibCnrs/BibApi).
Elle utilise l'outil [react-admin](https://github.com/marmelab/react-admin).

Elle permet de gérer les droits d'accès par institut, unité, individu aux ressources documentaires exposées à travers [BibEzProxy](https://github.com/BibCnrs/BibEzProxy).

## Installation

```bash
make install
```

## Développement

Pré-requis : lancer BibApi

Ensuite démarrer BibAdmin : `make run-dev`

Ensuite rendez vous sur http://localhost:3011/public pour l'accès à l'interface Web de BibAdmin.
Logguez vous avec le login/mdp administrateur défini au moment de l'installation de BibApi.
