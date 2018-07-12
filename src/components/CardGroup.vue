<template>
  <div class="card-group">
      <h2>{{label}}</h2>
      <div v-for="item in items" class="card card-group__card" :key="item.id">
        <div class="card-group__avatar"></div>
        <div class="card-group__info">
          <span class="card-group__name">{{item.name}}&nbsp;</span>
          <span class="card-group__surname">{{item.surname}}</span> -
          <span class="card-group__position">{{item.position}}</span>
        </div>
        <div class="card-group__card-actions">
          <div class="card-group__action-btn" @click="editEmployer(item.id)" >
            Открыть
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CardGroup',
  props: {
    label: String,
    items: Array,
  },
  methods: {
    editEmployer(id) {
      this.$router.push({ name: 'Employee', params: { id } });
    },
  },
};
</script>

<style scoped lang="stylus">
@require './../theme/global.styl';

.card-group {
  padding: var(--gutter-size-x);

  &__card {
    padding: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;

    &:hover {
      .card-group__card-actions {
        transform: translateX(0);
        transition: ease transform 0.1s;
      }
    }
  }

  &__info {
    padding: var(--gutter-size-x);
  }

  &__avatar {
    background-color: var(--color-dark);
    width: 50px;
  }

  &__card-actions {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    background-color: var(--color-dark);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: ease transform 0.3s;
  }

  &__action-btn {
    padding: var(--gutter-size-x);
    color: white;
    font-size: var(--font-size-xs);
    font-weight: bold;
    cursor: pointer;
  }

  &__position {
    font-size: var(--font-size-xs);
  }
}
</style>
