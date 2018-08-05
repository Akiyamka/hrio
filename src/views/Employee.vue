<template>
  <div class="page-emplyeer">
    <div class="page-emplyeer__profile">
        <hgroup class="page-emplyeer__header">
          <div class="card page-emplyeer__avatar">
            <img src="" alt="photo">
          </div>
          <h1>
            <CTEditableField label="" v-model="employer.name" :editable="isEdit" />
            <CTEditableField label="" v-model="employer.surname" :editable="isEdit" />
          </h1>
          <button v-if="!isEdit" class="page-emplyeer__btn" @click="() => { isEdit = true }">Редактировать</button>
          <button v-if="isEdit" class="page-emplyeer__btn" @click="() => { isEdit = false; save(); }">Сохранить</button>
          <button v-if="isEdit" class="page-emplyeer__btn" @click="() => { isEdit = false }">Отмена</button>
        </hgroup>
        <article class="page-emplyeer__body">

          <div class="page-emplyeer__group">
            <h2>Контакты</h2>
            <ul>
              <li><CTEditableField label="E-mail личный" v-model="employer.contacts.personalMail" :editable="isEdit" /></li>
              <li><CTEditableField label="E-mail корпоративный" v-model="employer.contacts.workMail" :editable="isEdit" /></li>
              <li><CTEditableField label="Телефон" v-model="employer.contacts.phone" :editable="isEdit" /></li>
              <li><CTEditableField label="Мессенджер" v-model="employer.contacts.messanger" :editable="isEdit"/></li>
            </ul>
          </div>

          <div class="page-emplyeer__group">
            <h2>Пасспортные данные</h2>
            <ul>
              <li><CTEditableField label="Индетификационный номер" v-model="employer.passport.id" :editable="isEdit" /></li>
              <li><CTEditableField label="Серия и номер пасспорта" v-model="employer.passport.number" :editable="isEdit" /></li>
              <li><CTEditableField label="Срок действия" v-model="employer.passport.dateOfValidity.seconds" :editable="isEdit" type="date" /></li>
              <li><CTEditableField label="Ими и фамилия латиницей" v-model="employer.passport.latinName" :editable="isEdit" /></li>
            </ul>
          </div>

          <div class="page-emplyeer__group">
            <h2>Оформление</h2>
              <ul>
                <li><CTEditableField label="Должность" v-model="employer.registration.position" :editable="isEdit" /></li>
                <li><CTEditableField label="Дата начала работы" v-model="employer.registration.started.seconds" :editable="isEdit" type="date"/></li>
                <li><CTEditableField label="Дата оформления" v-model="employer.registration.registrationDate.seconds" :editable="isEdit" type="date"/></li>
                <li><CTEditableField label="Вид оформления" v-model="employer.registration.typeOfRegistration" :editable="isEdit"/></li>
                <li><CTEditableField label="Номер договора" v-model="employer.registration.сontractNumber" :editable="isEdit"/></li>
                <li><CTEditableField label="Зарплата" v-model="employer.registration.salary" :editable="isEdit"/></li>
              </ul>
          </div>

          <div class="page-emplyeer__group">
            <h2>Образование</h2>
            <ul>
              <li><CTEditableField label="Учебное заведение" v-model="employer.aducation.institution" :editable="isEdit" /></li>
              <li><CTEditableField label="Факультет" v-model="employer.aducation.faculty" :editable="isEdit" /></li>
              <li><CTEditableField label="Специальность" v-model="employer.aducation.specialty" :editable="isEdit" /></li>
              <li><CTEditableField label="Дата поступления" v-model="employer.aducation.started.seconds" :editable="isEdit" type="date" /></li>
              <li><CTEditableField label="Дата окончания" v-model="employer.aducation.ended.seconds" :editable="isEdit" type="date" /></li>
              <li><CTEditableField label="Форма обучения" v-model="employer.aducation.format" :editable="isEdit" /></li>
            </ul>
          </div>

        </article>

    </div>

    <!-- <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import CTEditableField from '@/components/CTEditableField.vue';
import { mapState, mapActions } from 'vuex';
import { newPrefix } from './../constants.js';

export default {
  name: 'emplyeer',
  components: { CTEditableField },
  created: function() {
    const currentId = this.$route.params.id;
    const isNewEmployee = currentId.slice(0, newPrefix.length) === newPrefix;
    if (isNewEmployee) {
      this.isEdit = true;
      return;
    }
    this.isLoading = true;
    Promise.all([this.readEmploeer(currentId)]).then(
      () => (this.isLoading = false)
    );
  },
  data: () => ({
    isEdit: false,
  }),
  computed: {
    ...mapState(['employer']),
  },
  methods: {
    ...mapActions(['editEmploeer', 'readEmploeer']),
    save() {
      this.editEmploeer(this.model);
    },
  },
};
</script>

<style lang="stylus" scoped>
@require './../theme/global.styl';

.page-emplyeer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  overflow: hidden;
  flex-basis: 100%;

  &__profile {
    max-width: 860px;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  &__avatar {
    width: 100px;
    height: 100px;
    margin: 0 var(--gutter-size-xl) 0 0;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    padding: var(--gutter-size-xl) 0;
    border-bottom: var(--main-border-style);
    align-items: flex-start;
    flex-shrink: 0;

    h1 {
      flex: 1;

      .ct-editable-field {
        margin: 0;
      }
    }
  }

  &__body {
    display: grid;
    grid: auto-flow / 1fr 1fr;
    grid-gap: var(--gutter-size-x);
    overflow: auto;
    margin: var(--gutter-size-xl) 0;

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }

  &__btn {
    background: none;
    border: none;
    padding: var(--gutter-size-xs);
    display: block;
  }
}
</style>
