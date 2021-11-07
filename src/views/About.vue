<template>
  <div class="container">
    <h1>Questions fréquentes</h1>
    <p class="text text-main">Ici vous pourrez voir différentes questions que l'on nous pose fréquemmment.<br /></p>

    <div v-for="element in listeQuestion" :key="element.title" v-on:click="element.show = !element.show" class="block">
      <div class="row">
        <p class="titre2" :style="element.show ? 'color:#3388AC' : ''">
          {{ element.title }}
        </p>
        <div :class="['button', element.show ? 'show' : '']">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
            <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
          </svg>
        </div>
      </div>
      <transition name="fade">
        <p v-if="element.show" class="description">{{ element.description }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      listeQuestion: [
        {
          title: 'Comment ça marche ?',
          description:
            "Notre Service s'adresse aux personnes qui souhaitent trouver l'inspiration, apprendre et progresser chaque jour. Que vous souhaitiez progresser professionnellement, gagner en efficacité, être plus heureux ou simplement apprendre de nouvelles choses.Notre Service est un service qui permet d'accéder aux idées des meilleurs livres de non-fiction, mais aussi des documentaires, des conférences… en seulement quelques minutes et sur tous les supports.",
          show: false,
        },
        {
          title: 'Quel est le but de notre application ?',
          description:
            "Nous avons créé notre service pour les esprits curieux qui ont besoin d'apprendre et de progresser. Contactez-nous si vous avez des difficultés pour apprendre, nous sommes là pour vous aider à atteindre votre objectif !",
          show: false,
        },
        {
          title: 'Pourquoi nous ?',
          description:
            "Nous sommes convaincus que la lecture est vitale pour progresser et devenir une meilleure personne. notre site internet vous permet d'accéder aux idées des meilleurs livres, et vous donne l'inspiration nécessaire pour générer ce progrès. Notre format vous permet d'optimiser vos journées au maximum, en accédant à du contenu à forte valeur ajoutée à tout moment de la journée, quelles que soient vos contraintes. Plutôt que de consulter les réseaux sociaux à longueur de journées, vous avez désormais accès à la crème des livres de non-fiction.",
          show: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.block .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

h1 {
  margin-top: 50px;
}

.button.show {
  fill: #3388ac;
  transform: rotate(0);
  transition: 1s;
  border-color: #3388ac;
}

.container {
  min-height: calc(100vh - 4em);
  display: flex;
  flex-direction: column;
}

.block {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 8px auto 7px auto;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 40%;
  min-width: 320px;
  max-width: 40%;
  height: auto;
  background-color: white;
  cursor: pointer;
  user-select: none;
  flex-direction: column;
}

.text {
  margin: 1% 5% 6% 5%;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.titre2 {
  align-self: left;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 37px;
  text-align: left;
  transition: 0.5s;
}

.button {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  cursor: pointer;
  border-radius: 50%;
  transform: rotate(180deg);
  border: 1px solid;
  border-color: grey;
  background-color: white;
  transition: 1s;
}
svg {
  width: 12px;
  height: 12px;
  position: absolute;
  transform: translateX(-50%) translateY(30%);
}

.description {
  padding-top: 3%;
  text-align: left;
  user-select: text;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>
