<template>
  <main role="main">
    <div class="banner blue-background">
      <div class="banner-content top-show col-wrap max-width">
        <h1>Kontakt oss</h1>

        <p class="margin-top--md">Har du noen problemer eller noe du lurer på? Ta kontakt under!</p>
      </div>
    </div>

    <section class="contact max-width col-wrap">
      <div class="container-info col-6">
        <h3 class="margin-bottom--sm">Kontaktinfo</h3>
        <div class="text-container accent--lg">
          <p>
            Epost:
            <br>
            kevin.midboe@gmail.com
          </p>
          <p>
            Telefon:
            <br>
            93 40 46 42
          </p>
        </div>
      </div>

      <div class="container-social col-6">
        <h3 class="margin-bottom--sm">Følg oss på sosiale medier</h3>
        <ul>
          <li>Email: kevin.midboe@gmail.com</li>
          <li>Address: Schleppegrells gate 18</li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'frontend/styles/variables';
@import 'frontend/styles/spacing';

#content {
  overflow: hidden;
  width: 100vw;
}

.banner {
  height: 100%;
  width: 100%;

  &.blue-background {
    background-color: var(--color-background-blue);
    color: black;
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: var(--space-xxxxl);

    p {
      font-size: var(--text-md);
    }

    @include mobile {
      flex-direction: column-reverse;
    }
  }
}

section.contact {
  margin: 6rem auto 0 auto;
}

img {
  padding-top: 1.5rem;

  @include mobile {
    display: block;
    margin: auto;
    width: 80%;
  }
}
</style>
