<template>
  <div class="page__emplyeers">
    <div class="page__cards-view">
      <CardGroup
        :class="[{selectGroupMode: isSelectGroupMode}]"
        v-for="department in allDepartments"
        @click.native="selectDepartment(department)"
        :label="department.name"
        :items="getDepartmentEmploeers(department)"
        :key="department.id"/>
    </div>

    <div id="float-controls" class="float-controls">
      <div class="float-controls__add-btn" @click="addNew()">
        Добавить
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import CardGroup from '@/components/CardGroup.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'emplyeers',
  components: { CardGroup },
  data: () => ({
    isSelectGroupMode: false,
  }),
  computed: {
    ...mapGetters(['getDepartmentEmploeers']),
    ...mapState(['allDepartments', 'allEmplyeers']),
  },
  methods: {
    ...mapActions(['addEmploeerToDepartment']),
    addNew() {
      this.isSelectGroupMode = true;
    },
    selectDepartment(department) {
      if (!this.isSelectGroupMode) return;
      this.isSelectGroupMode = false;
      this.addEmploeerToDepartment(department);
    },
  },
};
</script>

<style lang="stylus" scoped>
.page {
  &__emplyeers {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    max-width: 860px;
    flex: 1;
  }

  &__cards-view {
    max-width: 600px;
    width: 100%;
  }
}

.selectGroupMode {
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075), 0 0 0 0.2em rgba(3, 102, 214, 0.3);
}

.float-controls {
  position: absolute;
  right: 0;
  bottom: 0;

  &__add-btn {
    padding: var(--gutter-size-x);
    margin: var(--gutter-size-x);
    background-color: var(--color-acent);
    color: white;
    border-radius: var(--border-radius-x);
    box-shadow: var(--base-shadow);
    cursor: pointer;
  }
}
</style>
