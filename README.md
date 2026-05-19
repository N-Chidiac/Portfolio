# Portfolio — Nour Chidiac

Mijn persoonlijke portfolio website, gebouwd met Vue 3 en Vite.

## Live website

[nourchidiac.netlify.app](https://nourchidiac.netlify.app/)

## Pagina's

| Route          | Pagina         | Omschrijving                                                        |
| -------------- | -------------- | ------------------------------------------------------------------- |
| `/`            | Menu           | Fullscreen navigatiemenu met alle links en socials                  |
| `/home`        | Home           | Intro, skillsoverzicht en recente projecten                         |
| `/about`       | About          | Achtergrond, hobbies en interesses                                  |
| `/projects`    | Projects       | Volledig projectenoverzicht, gesorteerd op datum                    |
| `/project/:id` | Project detail | Projectomschrijving, gebruikte technieken en links                  |
| `/facts`       | Fun Facts      | Persoonlijke weetjes in kaartformaat                                |
| `/contact`     | Contact        | Contactkaarten (e-mail, telefoon, LinkedIn) en statusblok           |
| `/wpl`         | WPL            | WPL1 & WPL2 casebeschrijving, reflecties en downloadbare opdrachten |
| `/privacy`     | Privacy Policy | AVG/GDPR-conform privacybeleid                                      |

## Componenten

- **TheHeader** — Herbruikbare paginaheader met titels via named slots
- **TheFooter** — Sitewijde footer met navigatielinks en socials
- **TheButton** — Knop met configureerbare kleur, ondersteunt zowel interne routering als bestandsdownloads
- **TheProjectCard** — Projectkaart met afbeelding, titel en type; klikbaar naar detailpagina
- **TheSkill** — Icoon + label voor het weergeven van technische vaardigheden

## Tech Stack

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Vite

## Skills & tools

HTML · CSS · JavaScript · Vue.js · Node.js · VSCode · NPM · Figma · Illustrator · Photoshop

## Project setup

```bash
npm install
```

### Development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Auteur

Nour Chidiac
