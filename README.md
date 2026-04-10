# AirSix – Application mobile de contrôle robot

Prototype React Native (Expo) d'une app mobile permettant:

- Splash screen avec transition.
- Connexion / inscription sécurisée (stockage sécurisé local + hash des mots de passe côté demo).
- Tableau de robots connectés, ajout via scan Bluetooth simulé.
- Navigation latérale (profil / paramètres).
- Pilotage robot en paysage avec zone caméra, joystick gauche/droite, position, batterie, bouton déconnexion.

## Lancer le projet

```bash
cd airsix-app
npm install
npm run start
```

## Architecture

- `src/screens`: écrans (auth, home, scan, appairage, contrôle, profil, paramètres)
- `src/store`: états globaux (auth et robots)
- `src/services`: logique auth et bluetooth (mock)
- `src/components`: cartes robots et joysticks virtuels

## Sécurité (important)

Cette version est un prototype mobile: 

- Session stockée dans `expo-secure-store`.
- Mot de passe stocké hashé + salé (SHA-256) dans un stockage local sécurisé.
- Validation minimale des mots de passe.

Pour une version production **très sécurisée**, il faut impérativement:

- Backend dédié avec hash Argon2id ou bcrypt cost élevé.
- Auth JWT court + refresh token rotatif.
- Chiffrement TLS pinning côté mobile.
- Gestion RBAC et audit logs.
- Flux Bluetooth chiffré/appairé avec clé device unique.
