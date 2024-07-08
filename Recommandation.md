# Recommandation

Durant la mission Marmelab, des recommandations ont été identifiées pour améliorer le code et la qualité de l'application.

## Front

De manière générale, le front était over-engineered. Il y avait beaucoup d'abstraction de composant ainsi que de la mémoisation inutile. Nous avons simplifié le code pour le rendre plus lisible et plus facile à maintenir.
Nous recommandons d'utiliser la stratégie du KISS (Keep It Simple Silly) en priorité. Et d'utliser le DRY (Don't Repeat Yourself) avec parcimonie.
Material-ui ayant été mis en place avec un theme, il est préférable de l'utiliser pour la cohérence visuelle et de ne pas partir sur des composants custom. Et il est préférable de ne pas utiliser des feuilles de style car Material-ui permet de tout faire via le theme ou via ses props [SX](https://mui.com/system/getting-started/the-sx-prop/).
Il faudrait a terme remplacer les différents services mis en place pour les appels API par une gestion via des hooks. Il y a notamment React-query sur le projet. Se baser sur ceux existant avec.

## Backend

Le backend a été mis en place avec NestJS. NestJS est un framework NodeJS qui permet de structurer son code. Il est donc recommandé de suivre les conventions de NestJS pour la création de nouveaux modules, services, controllers, etc. Il suffit de "recopier" ce qui a été fait pour les autres modules.

## React-admin

Une nouvelle version de React-admin est sortie (v5). Il est recommandé de mettre à jour la version de React-admin pour bénéficier des dernières fonctionnalités et des dernières corrections de bugs. Il y a quelques breaking changes, mais elles sont mineures.
On recommande aussi de mutualiser les composants de formulaire entre les pages `Create` et `Edit`, car elles sont souvent dupliqués. Encore fois, faire prevue de logique quand à la mutualisation des composants.

## Types

Certaines méthodes ont été migrées sans typage faute de temps. Elles sont trouvable via les balises `biome-ignore lint/suspicious/noExplicitAny`. Nous recommandons d'inclure le `noExplicitAny` dans les règles de linting. Et donc de repasser sur ces méthodes pour les typer. Néamoins ce sera un travail fastidieux, surtout qu'il faut s'assurer des retours de l'API Ebsco.

## SEO

Actuellement, le front est une SPA. Pour améliorer le SEO, il faudrait rendre le site plus "crawlable" par les moteurs de recherche. Pour cela, il faudrait rendre le site en SSR (Server Side Rendering) ou en Static Site Generator. Nous recommandons d'utiliser Remix ou Next qui utilisent React et donc assez facile à transformer.

Toutefois, si celà est trop couteux, il est toujours possible de me mettre en place une redirection pour les Bots via un reverse proxy du style Nginx. Avec une regle de redirection pour les bots, on pourrait les renvoyer sur une route publique de l'API qui retournerait du HTML avec les bonnes meta tags.

## Tests E2E

Playwright a été mis en place pour les tests E2E. Il est recommandé de continuer à écrire des tests E2E pour garantir le bon fonctionnement de l'application.
Le front est testé entièrement, donc continuer à les alimenter à chaque nouvelle fonctionnalité.
Etant particulièrement simple, il n'est pas nécessaire de tester chaque composant individuellement. Cependant si une logique métier est présente, comme pour la priorisation des ressources, il est recommandé de tester cette logique unitaire mais aussi en e2e.
Il existe des outils pour [générer automatiquement](https://playwright.dev/docs/codegen#introduction) des tests playwright
