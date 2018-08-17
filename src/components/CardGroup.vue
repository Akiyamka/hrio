<template>
  <div class="card-group">
      <h2>{{label}}</h2>
        <Card v-for="(item, key) in items"
              @edit="$emit('edit', { key, item })"
              @delete="$emit('delete', { key, item })"
              :name="item.name"
              :surname="item.surname"
              :position="item.registration.position"
              :key="key"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'CardGroup',
  components: { Card },
  props: {
    label: String,
    items: Object,
  },
};
</script>

<style scoped lang="stylus">
@require './../theme/global.styl';

.card-group {
  padding: var(--gutter-size-x);
}
</style>
