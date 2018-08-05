<template>
  <div id="app">
    <div class="spinner" v-if="!$data">
      <div class="lds-ellipsis" >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <section class="app" v-cloak>
      <aside class="app__side-menu" id="nav">
        <router-link to="/">Сотрудники</router-link>
        <router-link to="/organization">О Компании</router-link>
      </aside>
      <section class="app__main-field">
        <router-view/>
      </section>
    </section>

  </div>
</template>

<style lang="stylus">
@require './theme/variables.styl'
@require './theme/spinner.styl'
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&subset=cyrillic');

[v-cloak]
  display: none

html, body
  height: 100%
  margin: 0
  padding: 0
  font-family var(--font)
  font-weight: 400
  background-color: #E9EDED

.spinner
  position: absolute
  width: 100%
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: center
  height: 80%

#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  height: 100%;
  font-size: var(--font-size-x);
  color: var(--font-color);

.app
  display: grid
  height: 100%
  grid-template-columns: minmax(160px, 0.5fr) 3fr
  grid-template-rows: 62px 1fr
  grid-template-areas: 'aside main' 'aside main'

  &__side-menu
    display: flex
    flex-flow: column nowrap
    border-right: var(--main-border-style)
    height: 100%
    overflow: auto
    grid-area: aside
    box-sizing: border-box
    padding: var(--gutter-size-x)
    // https://coolors.co/c2d3cd-e9eded-9fa4a9-847e89-56494c
    background-color: var(--color-dark)
    a
      padding: var(--gutter-size-xs)
      text-decoration: none
      color: white

  &__main-field
    grid-area: main
    margin: var(--gutter-size-x)
    display: flex
    justify-content: center
</style>
