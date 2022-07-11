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
  </aside>
</template>

<script setup>
  import {ref} from "vue";

  const isExpanded = ref(false);

  const toggleMenu = () => {
    isExpanded.value = !isExpanded.value;
  }
</script>

<style scoped lang="scss">
  aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px); //padding + width img
    color: var(--light);
    background-color: var(--dark);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;
    
    transition: 0.2s ease-out;

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
      transition: 0.2s ease-out;

      .menu-toggle {
        transition: 0.2s ease-out;

        .material-icons {
          font-size: 2rem;
          color: var(--light);
        }

        &:hover {

          .material-icons {
            color: var(--primary);
            transform: translateX(0.5rem);
            transition: 0.2s ease-out;
          }
        }
      }
    }

    &.is-expanded {
      width: var(--sidebar-width);

      .menu-toggle-wrap {
        top: -3rem;

        .menu-toggle {
          transform: rotate(-180deg);
        }
      }
    }
  
  @media (max-width: 768px) {
      position: fixed;
      z-index: 99;
    };
  }
</style>