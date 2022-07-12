<template>
  <aside
      :class="`${isExpanded && 'is-expanded'}`"
  >
    <div class="logo">
      <img src="../assets/logo.png" alt="vue">
    </div>

    <div class="menu-toggle-wrap">
      <button
          class="menu-toggle"
          @click="toggleMenu"
      >
        <span class="material-icons material-symbols-outlined">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <h3>Menu</h3>
    
    <div class="menu">
      <router-link
          to="/"
          class="button"
      >
        <span class="material-icons material-symbols-outlined">
           other_houses
        </span>
        <span class="text">Home</span>
      </router-link>
      <router-link
          to="/about"
          class="button"
      >
        <span class="material-icons material-symbols-outlined">
          visibility
        </span>
        <span class="text">About</span>
      </router-link>
      <router-link
          to="/weight"
          class="button"
      >
        <span class="material-icons material-symbols-outlined">
          weight
        </span>
        <span class="text">Weight</span>
      </router-link>
      <router-link
          to="/rock-paper-scissors"
          class="button"
      >
        <span class="material-icons material-symbols-outlined">
          sports_esports
      </span>
        <span class="text">Game</span>
      </router-link>
      <router-link
          to="/tic-tac-toe"
          class="button"
      >
        <span class="material-icons material-symbols-outlined">
          sports_esports
      </span>
        <span class="text">Game</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons material-symbols-outlined">
          settings
        </span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
  import {ref} from "vue";

  const isExpanded = ref(localStorage.getItem('is__expanded') === 'true');

  const toggleMenu = () => {
    isExpanded.value = !isExpanded.value;
    localStorage.setItem('is__expanded', `${isExpanded.value}`);
  }
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px); //padding + width img
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;

  .flex {
    //прижиаем к низу settings
    flex: 1 1 auto;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {

        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3, .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--light);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }


  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons, .text {
          color: var(--primary);
        }
      }

      &.active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);
        .material-icons, .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  //раскрыли сайдбар
  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3, .button .text {
      opacity: 1;
    }

    .button {

      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }
  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
