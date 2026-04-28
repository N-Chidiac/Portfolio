<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function close() {
  if (router.previousRoute) {
    router.push(router.previousRoute);
  } else {
    router.push("/home");
  }
}
</script>
<template>
  <div class="wrapper">
    <div class="logo"></div>

    <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="close">
      <line x1="0" y1="0" x2="24" y2="24" stroke="currentColor" stroke-width="2" />
      <line x1="24" y1="0" x2="0" y2="24" stroke="currentColor" stroke-width="2" />
    </svg>

    <div class="sidebar">
      <h4 class="menu-label">MENU</h4>
      <div class="nav-and-socials">
        <nav class="links">
          <RouterLink to="/home"><h1>HOME</h1></RouterLink>
          <RouterLink to="/projects"><h1>PROJECTS</h1></RouterLink>
          <RouterLink to="/about"><h1>ABOUT</h1></RouterLink>
          <RouterLink to="/contact"><h1>CONTACT</h1></RouterLink>
          <RouterLink to="/facts"><h1>FUN FACTS</h1></RouterLink>
          <RouterLink to="/wpl"><h1>WPL</h1></RouterLink>
        </nav>
        <div class="socials">
          <a href="https://github.com/N-Chidiac" target="_blank">
            <img src="../assets/menu/github.png" alt="GitHub logo" />
          </a>
          <a href="https://www.linkedin.com/in/nour-chidiac-41632a387/" target="_blank">
            <img src="../assets/menu/linkedin.png" alt="LinkedIn logo" />
          </a>
          <RouterLink to="/contact">
            <img src="../assets/menu/contact.png" alt="Email logo" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--secondary-color);
  width: 100vw;
  height: 100vh;
  color: var(--white);
  position: relative;
  overflow: hidden;
}

.logo {
  background-image: url("../assets/menu/Logo-grijs.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 950px;
  height: 640px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.close {
  position: absolute;
  top: 130px;
  right: 300px;
  width: 24px;
  height: 24px;
  z-index: 2;
  cursor: pointer;
  color: var(--white);
  transition: color 0.2s ease;
}

.close:hover {
  color: var(--accent-color);
}

.sidebar {
  position: absolute;
  top: calc(50% - 320px);
  left: 50%;
  transform: translateX(-50%);
  width: 950px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.nav-and-socials {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.menu-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: var(--white);
  font-size: 24px;
  align-self: flex-start;
  margin-right: 1rem;
}

.links {
  display: flex;
  flex-direction: column;
}

.links a {
  text-decoration: none;
  color: var(--white);

  :hover {
    color: var(--accent-color);
    transform: scale(1.02);
  }
}

.links h1 {
  margin: 0;
  line-height: 1.1;
  font-size: 64px;
}

.socials {
  display: flex;
  gap: 35px;
}

.socials img:hover {
  filter: invert(50%) sepia(1) saturate(1) hue-rotate(100deg);
}
@media (max-width: 1024px) {
  .logo {
    width: 700px;
    height: 500px;
  }

  .sidebar {
    width: 700px;
    top: calc(50% - 250px);
    left: 48%;
    transform: translateX(-50%);
  }
  .links h1 {
    font-size: 56px;
  }

  .close {
    top: 30px;
    right: 30px;
  }
}
@media (max-width: 768px) {
  .logo {
    width: 324px;
    height: 218px;
    top: 376px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sidebar {
    width: fit-content;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
  }

  .menu-label {
    font-size: 24px;
    top: 0;
    left: -2rem;
  }

  .links h1 {
    font-size: 48px;
    line-height: 1;
  }

  .links {
    gap: 20px;
  }

  .nav-and-socials {
    gap: 30px;
  }

  .close {
    top: 30px;
    right: 30px;
  }
}
</style>
