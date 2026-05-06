<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheButton from "@/components/TheButton.vue";
</script>

<template>
  <header>
    <TheHeader>
      <template #title>ABOUT ME</template>
      <template #subtitle>BALANCING CREATIVITY </template>
      <template #subtitle2>WITH PRECISION</template>
    </TheHeader>
  </header>
  <main>
    <section class="background">
      <div class="img-container">
        <img src="../assets/about-me/painter.png" alt="Image of hand pinting wall" />
      </div>
      <div class="text-container">
        <h2 class="title">My background</h2>
        <p>
          Mijn parcours startte in een creatieve richting, met een opleiding in schilder- en
          decoratietechnieken. Daar ontwikkelde ik niet alleen een sterk gevoel voor esthetiek, maar
          ook een groot oog voor detail en afwerking. Creatief denken en nauwkeurig werken vormden
          van in het begin de rode draad doorheen alles wat ik doe.
        </p>
        <p>
          Na mijn opleiding deed ik ervaring op in een administratieve functie. In die omgeving
          leerde ik gestructureerd werken, efficiënt omgaan met informatie en verantwoordelijkheid
          opnemen binnen een professionele context. Mijn organisatorische vaardigheden werden er
          verder verfijnd, net zoals mijn aandacht voor detail en mijn vermogen om overzicht te
          bewaren.
        </p>
        <p>
          Gaandeweg groeide mijn interesse in technologie en digitale toepassingen. Wat begon als
          nieuwsgierigheid, evolueerde al snel naar een echte passie voor coderen. Het logisch
          denken, het analyseren van problemen en het uitwerken van doordachte oplossingen gaven mij
          dezelfde voldoening als mijn eerdere creatieve werk — maar dan in een digitale context.
        </p>
        <p>
          Daarom besloot ik mij om te scholen tot junior developer. Vandaag combineer ik mijn
          creatieve achtergrond met mijn analytische vaardigheden om digitale oplossingen te bouwen
          die niet alleen functioneel zijn, maar ook visueel sterk en gebruiksvriendelijk. Ik haal
          energie uit het vertalen van ideeën naar concrete toepassingen en blijf mezelf voortdurend
          uitdagen om bij te leren en te groeien binnen het vakgebied.
        </p>
        <p>
          Mijn achtergrond stelt mij in staat om zowel vanuit een creatief als gestructureerd
          perspectief te werken — een combinatie die ik bewust inzet om kwalitatieve en doordachte
          digitale projecten te realiseren.
        </p>
      </div>
    </section>
    <section class="profile-img">
      <img src="../assets/about-me/profile-img.png" alt="profile image of me" />
    </section>
    <section class="hobbies-interests">
      <div class="text-container">
        <h2 class="title">My hobbies and interests</h2>
        <p>
          In mijn vrije tijd blijf ik graag creatief en leergierig bezig. Ik schilder met olieverf
          en lees voornamelijk fictie en fantasy, wat mijn verbeelding en gevoel voor storytelling
          versterkt. Daarnaast heb ik meerdere jaren vrijwilligerswerk gedaan bij de voedselbank,
          een ervaring die mijn betrokkenheid bij mensen en mijn verantwoordelijkheidsgevoel heeft
          verdiept.
        </p>
        <p>
          Ik maak ook deel uit van een audio-videoteam, waar ik tijdens live evenementen in sta voor
          het geluid en werk met een mengpaneel. Deze rol heeft mijn technische inzicht,
          stressbestendigheid en aandacht voor detail verder ontwikkeld.
        </p>
        <p>
          Verder ga ik graag wandelen met mijn hond, wat voor mij een ideale manier is om te
          ontspannen en mijn hoofd leeg te maken. Tot slot werk ik regelmatig aan eigen projecten,
          waarbij ik nieuwe frameworks, tools en programmeertalen verken. Op die manier blijf ik
          mezelf continu uitdagen en mijn technische vaardigheden verder ontwikkelen.
        </p>
        <div class="btn">
          <TheButton text="Contact me" color="#4e765d" path="/contact" />
          <TheButton text="Fun facts" color="#000" path="/facts" />
        </div>
      </div>
      <div class="img-container">
        <img src="../assets/about-me/paint-pallete.png" alt="image of a paint pallette" />
      </div>
    </section>
  </main>
  <footer>
    <TheFooter />
  </footer>
</template>
<style scoped>
.background,
.hobbies-interests,
.profile-img {
  display: flex;
  gap: 120px;
  justify-content: center;
  margin: 100px;
}

.img-container img,
.profile-img img {
  width: 100%;
  max-width: 1200px;
  height: auto;
  object-fit: cover;
}

.text-container {
  max-width: 720px;
}

.title {
  font-family: var(--subtitle-font);
  font-weight: 700;
  font-size: 32px;
  font-style: bold;
  line-height: 100%;
  letter-spacing: 0%;
  color: var(--accent-color);
  margin-bottom: 20px;
}

p {
  font-family: var(--body-font);
  color: var(--secondary-color);
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  margin-bottom: 20px;
  max-width: 720px;
}

.btn {
  margin-top: 120px;
  display: flex;
  gap: 15px;
}

@media (max-width: 1024px) {
  .background,
  .hobbies-interests,
  .profile-img {
    gap: 40px;
    margin: 72px 48px;
  }

  .background,
  .hobbies-interests {
    align-items: flex-start;
  }

  .title {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .background,
  .hobbies-interests,
  .profile-img {
    margin: 40px 20px;
    gap: 24px;
  }

  .background,
  .hobbies-interests {
    flex-direction: column;
  }

  .hobbies-interests .img-container {
    order: -1;
  }

  .title {
    font-size: 24px;
  }

  p {
    font-size: 15px;
    line-height: 130%;
  }
  .btn {
    flex-direction: column;
    margin-top: 30px;
  }
}
</style>
