# Andreea — Portfolio

Portofoliu personal (React + Vite), cu design editorial, glassmorphism, axa timpului care se desenează la scroll și animații fine.

## Pornire în VS Code

```bash
npm install
npm run dev
```

Deschide linkul afișat în terminal (de obicei http://localhost:5173).

## Ce trebuie să înlocuiești

| Ce                       | Unde                                                            |
| ------------------------ | --------------------------------------------------------------- |
| Poza ta                  | pune fișierul în `public/andreea.jpg`                           |
| CV                       | pune fișierul în `public/cv.pdf`                                |
| Email, LinkedIn, texte   | `src/data/content.js` → `PROFILE`                               |
| Linkuri live la proiecte | `src/data/content.js` → `WORK` → `live` (gol = butonul dispare) |
| Timeline, skills, cifre  | `src/data/content.js`                                           |

Tot conținutul e în `src/data/content.js`; designul e în `src/App.jsx`.

## Publicare (gratuit)

1. Urcă proiectul pe GitHub.
2. Pe vercel.com: **Add New → Project**, alege repo-ul. Vercel detectează Vite automat.
3. Pune linkul rezultat în CV și pe LinkedIn.

Build manual: `npm run build` (rezultatul e în `dist/`).
