<template>
  <header>
    <nuxt-link to="/">
      <h1>Jean Marquès</h1>
    </nuxt-link>
    <ul>
      <li>
        <nuxt-link to="/">
          home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/work">
          work
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/info">
        info
        </nuxt-link>
      </li>
      <li>
        <a href="https://www.instagram.com/jeanmarques.jm/">
          <img class="logo_instagram" src="@/static/instagram.png"/>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
header {
  font-size: 14px;
  display: flex;
  align-items: baseline;
  a {
    text-decoration: none;
    color: #222222;
    h1 {
      font-size: 14px;
      font-weight: normal;
    }
  }
  ul {
    display: flex;
    list-style: none;
    li {
      a {
        text-decoration: none;
        color: #222222;
        .logo_instagram {
          width: 10px;
          height: 10px;
        }
      }
      a:hover {
        border-bottom: 1px solid #222222;
      }
      .nuxt-link-exact-active {
        border-bottom: 1px solid #222222;
      }
    }
    li:not(:last-child):after {
      content: '/';
      font-size: 15px;
      padding: 0 5px;
    }
  }
}
</style>
