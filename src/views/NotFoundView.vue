<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import logo from "@/assets/Header/Logo-wit-header.png";

const route = useRoute();
const router = useRouter();
const attemptedPath = route.fullPath;

const pages = {
  home: "/home",
  about: "/about",
  projects: "/projects",
  "fun-facts": "/facts",
  facts: "/facts",
  contact: "/contact",
  privacy: "/privacy",
};

const quickLinks = [
  { key: "home", to: "/home" },
  { key: "projects", to: "/projects" },
  { key: "about", to: "/about" },
  { key: "fun-facts", to: "/facts" },
  { key: "contact", to: "/contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/N-Chidiac" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nour-chidiac-41632a387/" },
  { label: "E-mail", href: "mailto:nour.chidiac@hotmail.com" },
];

const COMMANDS = [
  "help",
  "ls",
  "cd",
  "open",
  "whoami",
  "pwd",
  "about",
  "projects",
  "contact",
  "echo",
  "date",
  "history",
  "clear",
  "sudo",
  "exit",
  "coffee",
  "matrix",
];

const banner = [
  "██╗  ██╗ ██████╗ ██╗  ██╗",
  "██║  ██║██╔═══██╗██║  ██║",
  "███████║██║   ██║███████║",
  "╚════██║██║   ██║╚════██║",
  "     ██║╚██████╔╝     ██║",
  "     ╚═╝ ╚═════╝      ╚═╝",
];

const boot = [
  ...banner.map((text) => ({ kind: "art", text })),
  { kind: "out", text: "" },
  { kind: "err", text: `zsh: geen bestand of map: ${attemptedPath}` },
  { kind: "muted", text: "Je bent van het pad af. Typ 'help', of klik een bestemming onderaan." },
];

const lines = ref([...boot]);
const input = ref("");
const inputEl = ref(null);
const bodyEl = ref(null);
const history = ref([]);
let historyIndex = -1;
const partyMode = ref(false);

const konami = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiProgress = 0;

function print(text, kind = "out") {
  if (Array.isArray(text)) {
    for (const t of text) lines.value.push({ kind, text: t });
  } else {
    lines.value.push({ kind, text });
  }
  scrollToEnd();
}

function scrollToEnd() {
  nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight;
  });
}

function navigate(target) {
  print(`cd ${target} — onderweg…`, "muted");
  setTimeout(() => router.push(target), 450);
}

function run(raw) {
  const trimmed = raw.trim();
  lines.value.push({ kind: "cmd", text: trimmed });
  if (!trimmed) return scrollToEnd();

  history.value.push(trimmed);
  historyIndex = history.value.length;

  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
      print([
        "navigatie",
        "  ls                    toon de pagina's",
        "  cd <pagina>           ga naar een pagina   (ook: open, goto)",
        "  home | projects |",
        "  about | contact |",
        "  privacy              spring direct naar die pagina",
        "  exit                 terug naar home",
        "",
        "info",
        "  whoami               wie ben ik",
        "  pwd                  het pad dat je zocht",
        "  date                 datum en tijd",
        "  history              je eerdere commando's",
        "  echo <tekst>         herhaal tekst",
        "  clear                maak het scherm leeg",
        "",
        "speeltjes",
        "  coffee               ☕",
        "  matrix               wake up, Neo",
        "  sudo <iets>          tevergeefs",
        "  (en ergens zit een Konami-code verstopt)",
      ]);
      break;
    case "ls":
      print(
        Object.keys(pages)
          .filter((p) => p !== "facts")
          .join("   "),
      );
      break;
    case "cd":
    case "open":
    case "goto": {
      const key = arg.toLowerCase().replace(/^\/+/, "");
      if (!key) print("gebruik: cd <pagina>. Typ 'ls' voor de opties.", "err");
      else if (pages[key]) navigate(pages[key]);
      else print(`cd: geen pagina '${arg}'. Typ 'ls'.`, "err");
      break;
    }
    case "home":
    case "about":
    case "projects":
    case "contact":
    case "privacy":
      navigate(pages[cmd.toLowerCase()]);
      break;
    case "whoami":
      print("Nour Chidiac — junior web developer. Creatief, precies, blijft leren.");
      break;
    case "pwd":
      print(attemptedPath);
      break;
    case "echo":
      print(arg);
      break;
    case "date":
      print(new Date().toLocaleString("nl-BE"));
      break;
    case "history":
      print(history.value.map((h, i) => `  ${i + 1}  ${h}`));
      break;
    case "clear":
    case "cls":
      lines.value = [];
      break;
    case "sudo":
      print("Nice try. Je hebt hier geen rechten. 😏", "err");
      break;
    case "rm":
      print("Bestanden verwijderen… grapje. Er staat hier toch niks.", "muted");
      break;
    case "exit":
    case "q":
      navigate("/home");
      break;
    case "coffee":
      print([
        "      ( (",
        "       ) )",
        "    ........",
        "    |      |]",
        "    \\      /",
        "     `----'",
        "espresso onderweg.",
      ]);
      break;
    case "matrix":
      partyMode.value = true;
      print("wake up, Neo…", "muted");
      setTimeout(() => (partyMode.value = false), 4000);
      break;
    default:
      print(`zsh: command not found: ${cmd}. Typ 'help'.`, "err");
  }
  scrollToEnd();
}

function submit() {
  run(input.value);
  input.value = "";
}

function onKeydown(event) {
  if (event.key === konami[konamiProgress]) {
    konamiProgress += 1;
    if (konamiProgress === konami.length) {
      konamiProgress = 0;
      partyMode.value = !partyMode.value;
      print(partyMode.value ? "party mode aan" : "party mode uit", "muted");
    }
  } else {
    konamiProgress = event.key === konami[0] ? 1 : 0;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (history.value.length) {
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history.value[historyIndex] ?? "";
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (history.value.length) {
      historyIndex = Math.min(history.value.length, historyIndex + 1);
      input.value = history.value[historyIndex] ?? "";
    }
  } else if (event.key === "Tab") {
    event.preventDefault();
    const [head, ...rest] = input.value.split(/\s+/);
    const pool = rest.length ? Object.keys(pages) : COMMANDS;
    const frag = rest.length ? rest.join(" ") : head;
    const hit = pool.find((c) => c.startsWith(frag));
    if (hit) input.value = rest.length ? `${head} ${hit}` : hit;
  }
}

function focusInput() {
  inputEl.value?.focus();
}

function goLink(to, key) {
  print(`cd ${key}`, "cmd");
  navigate(to);
}

onMounted(() => {
  focusInput();
  console.log(
    "%c404 %cvind je weg via de terminal — of typ hier 'nour.hire()' 😉",
    "color:#4e765d;font-weight:700",
    "color:#888",
  );
});

onBeforeUnmount(() => {
  partyMode.value = false;
});
</script>

<template>
  <main class="screen" :class="{ party: partyMode }" @click="focusInput">
    <div class="bar bar--top">
      <span class="whoami"
        ><span class="prompt-user">guest@nourchidiac</span><span class="cwd">:~/404</span></span
      >
      <RouterLink to="/home" class="brand" @click.stop>
        <img :src="logo" alt="Nour Chidiac — naar de startpagina" />
        <span>404 · PAGE NOT FOUND</span>
      </RouterLink>
    </div>

    <div class="body" ref="bodyEl">
      <p v-for="(line, i) in lines" :key="i" class="line" :class="`line--${line.kind}`">
        <span v-if="line.kind === 'cmd'" class="prompt" aria-hidden="true"
          >&#10148;&nbsp;~&nbsp;</span
        ><span class="line-text">{{ line.text }}</span>
      </p>

      <form class="input-row" @submit.prevent="submit">
        <label for="term-input" class="sr-only">Terminal-commando</label>
        <span class="prompt" aria-hidden="true">&#10148;&nbsp;~&nbsp;</span>
        <input
          id="term-input"
          ref="inputEl"
          v-model="input"
          class="term-input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          aria-label="Terminal-commando, typ help"
          @keydown="onKeydown"
        />
      </form>
    </div>

    <div class="bar bar--bottom">
      <nav class="links" aria-label="Naar een bestaande pagina">
        <span class="prompt" aria-hidden="true">cd&nbsp;</span>
        <button
          v-for="link in quickLinks"
          :key="link.to"
          type="button"
          class="link"
          @click.stop="goLink(link.to, link.key)"
        >
          {{ link.key }}
        </button>
      </nav>
      <nav class="socials" aria-label="Externe links">
        <a
          v-for="s in socials"
          :key="s.href"
          :href="s.href"
          target="_blank"
          rel="noopener"
          @click.stop
        >
          {{ s.label }}
        </a>
      </nav>
    </div>
  </main>
</template>

<style scoped>
/* Vast aan de viewport en uit de documentflow gehaald, zodat alleen .body
   intern scrollt en er geen tweede (pagina-)scrollbalk of witte strip ontstaat. */
.screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #0b0b0b;
  color: #d7d7d7;
  font-family: "Courier New", ui-monospace, monospace;
}

.bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  font-size: 13px;
  flex-shrink: 0;
}

.bar--top {
  border-bottom: 1px solid #262626;
}

.bar--bottom {
  border-top: 1px solid #262626;
  flex-wrap: wrap;
  gap: 10px 26px;
  padding-bottom: 16px;
}

.prompt-user {
  color: var(--accent-color);
  font-weight: 700;
}

.cwd {
  color: #8f8f8f;
}

.brand {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #5f5f5f;
  letter-spacing: 0.03em;
}

.brand img {
  height: 22px;
  width: auto;
}

.brand:hover {
  color: #9a9a9a;
}

.body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 22px;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
}

.line {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.line--err {
  color: #e06a76;
}

.line--muted {
  color: #7f7f7f;
}

.line--cmd .line-text {
  color: var(--white);
}

.line--art {
  color: var(--accent-color);
  line-height: 1;
  font-size: clamp(11px, 2.6vw, 15px);
}

.prompt {
  color: var(--accent-color);
}

.input-row {
  display: flex;
  align-items: baseline;
}

.term-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--white);
  font: inherit;
  caret-color: var(--accent-color);
}

.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  font-size: 14px;
}

.link {
  background: transparent;
  border: 1px solid #333;
  color: #d7d7d7;
  font: inherit;
  padding: 4px 10px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease;
}

.link::before {
  content: "./";
  color: #6f6f6f;
}

.link:hover,
.link:focus-visible {
  border-color: var(--accent-color);
  color: var(--white);
  background: rgba(78, 118, 93, 0.16);
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-left: auto;
  font-size: 13px;
}

.socials a {
  color: #7f7f7f;
  text-decoration: none;
}

.socials a::before {
  content: "↗ ";
  color: #4f4f4f;
}

.socials a:hover {
  color: var(--accent-color);
}

.screen.party {
  animation: party 0.9s linear infinite;
}

@keyframes party {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .screen.party {
    animation: none;
  }
}

@media (max-width: 768px) {
  .bar {
    padding: 12px 16px;
  }

  .bar--top {
    flex-wrap: wrap;
  }

  .brand span {
    display: none;
  }

  .body {
    padding: 16px;
    font-size: 13px;
  }

  .socials {
    margin-left: 0;
  }
}
</style>
