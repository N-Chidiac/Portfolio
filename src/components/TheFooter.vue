<template>
  <div class="footer">
    <div class="links">
      <div class="col1">
        <RouterLink to="/home">HOME</RouterLink>
        <RouterLink to="/projects">PROJECTS</RouterLink>
        <RouterLink to="/about">ABOUT</RouterLink>
        <RouterLink to="/contact">CONTACT</RouterLink>
      </div>
      <div class="col2">
        <RouterLink to="/facts">FUN FACTS </RouterLink>
        <RouterLink to="/wpl">WPL</RouterLink>
        <RouterLink to="/privacy">PRIVACY POLICY</RouterLink>
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
    <div class="logo">
      <img src="../assets/Header/Logo-wit-header.png" alt="Logo" />
    </div>
  </div>
</template>
<style scoped>
.footer {
  background-color: var(--secondary-color);
  min-width: 100vw;
  height: 400px;

  display: flex;
  justify-content: space-between;

  padding: 80px;
  align-items: center;
}

.links {
  display: flex;
  flex-direction: row;
  gap: 62px;
}

.col1,
.col2 {
  display: flex;
  flex-direction: column;
  gap: 15px;
  a {
    text-decoration: none;
    color: var(--white);
    font-family: var(--body-font);
    font-weight: 700;
    font-style: bold;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
  }
}

.socials {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .footer {
    min-width: 100%;
    height: auto;
    padding: 56px 40px;
    gap: 40px;
    align-items: flex-start;
  }

  .links {
    gap: 40px;
  }

  .logo img {
    width: 180px;
    height: auto;
  }
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    justify-content: flex-start;
    padding: 40px 20px;
    gap: 32px;
  }

  .links {
    width: 100%;
    flex-direction: column;
    gap: 24px;
  }

  .col1,
  .col2 {
    gap: 12px;
  }

  .socials {
    justify-content: flex-start;
    gap: 16px;
  }

  .logo img {
    width: 150px;
  }
}
</style>
