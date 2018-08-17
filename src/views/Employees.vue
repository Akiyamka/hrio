<template>
  <div class="page__emplyeers">
    <CTSpinner v-if="isLoading" />
    <div class="page__cards-view" v-else>
      <CardGroup
        :class="[{selectGroupMode: isSelectGroupMode}]"
        v-for="(department, id) in allDepartments"
        @click.native="selectDepartment(id)"
        @edit="editEmployer($event)"
        @delete="deleteEmployer($event)"
        :label="department.name"
        :items="getDepartmentEmploeers(department)"
        :key="department.id"/>
    </div>

    <div id="float-controls" class="float-controls">
      <div class="float-controls__add-btn" @click="addNewEmployer()">
        Добавить
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import CardGroup from '@/components/CardGroup.vue';
import CTSpinner from '@/components/CTSpinner.vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import { newEmployerPrefix } from '@/constants';

export default {
  name: 'emplyeers',
  components: { CardGroup, CTSpinner },
  created: function() {
    this.isLoading = true;
    Promise.all([this.readAllDepatments(), this.readAllEmploeers()]).then(
      () => (this.isLoading = false)
    );
  },
  data: () => ({
    isSelectGroupMode: false,
    isLoading: true,
  }),
  computed: {
    ...mapGetters(['getDepartmentEmploeers']),
    ...mapState(['allDepartments', 'allEmplyeers']),
  },
  methods: {
    ...mapActions([
      'addEmploeerToDepartment',
      'readAllDepatments',
      'readAllEmploeers',
      'deleteEmployer',
    ]),
    addNewEmployer() {
      this.isSelectGroupMode = true;
    },
    editEmployer({ key: id }) {
      this.$router.push({ name: 'Employee', params: { id } });
    },
    selectDepartment(id) {
      if (!this.isSelectGroupMode) return;
      this.isSelectGroupMode = false;
      this.$router.push({
        name: 'Employee',
        params: { id: newEmployerPrefix + id },
      });
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
    position: relative;
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
