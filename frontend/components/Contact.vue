<template>
  <main role="main">
    <div class="banner bg-blue">
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

  color: black;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding-top: var(--space-xxxxl);

    @include mobile {
      padding-top: var(--space-xxl);
    }

    p {
      font-size: var(--text-md);
    }
  }
}

section.contact {
  margin: 3rem auto;
  overflow: auto;

  h3 {
    margin-top: 2rem;
  }
}

@include mobile {
  .col-6 {
    width: 100%;
  }
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
