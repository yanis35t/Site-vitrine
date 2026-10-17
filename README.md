# Pousse — site vitrine

Site vitrine fictif de l'application de livraison de repas healthy « Pousse ».
Le design suit la charte graphique (téléphone et ordinateur, mêmes tokens et textes).

## Lancer le site

Aucun build n'est nécessaire : ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

## Structure

- `index.html` : accueil, menus, comment ça marche, histoire, barre d'onglets et feuilles mobiles
- `css/styles.css` : tokens (clair et sombre), verre, assiettes CSS, mouvement, accessibilité
- `js/main.js` : données des menus, panier, feuilles mobiles glissables

Le site ne prend aucune commande réelle : le bouton « Commander » affiche « Démo : rien n’est commandé. »
