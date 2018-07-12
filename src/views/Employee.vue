<template>
  <div class="page-emplyeer">
    <div class="page-emplyeer__profile">
        <hgroup class="page-emplyeer__header">
          <div class="card page-emplyeer__avatar">
            <img src="" alt="photo">
          </div>
          <h1>
            <CTEditableField label="" v-model="model.name" :editable="isEdit" />
            <CTEditableField label="" v-model="model.surname" :editable="isEdit" />
          </h1>
          <button class="page-emplyeer__edit-btn" @click="() => { isEdit = !isEdit }">Редактировать</button>
        </hgroup>
        <article class="page-emplyeer__body">

          <div class="page-emplyeer__group">
            <h2>Контакты</h2>
            <ul>
              <li><CTEditableField label="E-mail личный" v-model="model.contacts.personalMail" :editable="isEdit" /></li>
              <li><CTEditableField label="E-mail корпоративный" v-model="model.contacts.workMail" :editable="isEdit" /></li>
              <li><CTEditableField label="Телефон" v-model="model.contacts.phone" :editable="isEdit" /></li>
              <li><CTEditableField label="Мессенджер" v-model="model.contacts.messanger" :editable="isEdit"/></li>
            </ul>
          </div>

          <div class="page-emplyeer__group">
            <h2>Пасспортные данные</h2>
            <ul>
              <li><CTEditableField label="Индетификационный номер" v-model="model.passport.id" :editable="isEdit" /></li>
              <li><CTEditableField label="Серия и номер пасспорта" v-model="model.passport.number" :editable="isEdit" /></li>
              <li><CTEditableField label="Срок действия" v-model="model.passport.dateOfValidity" :editable="isEdit" type="date" /></li>
              <li><CTEditableField label="Ими и фамилия латиницей" v-model="model.passport.latinName" :editable="isEdit" /></li>
            </ul>
          </div>

          <div class="page-emplyeer__group">
            <h2>Оформление</h2>
              <ul>
                <li><CTEditableField label="Должность" v-model="model.registration.position" :editable="isEdit" /></li>
                <li><CTEditableField label="Дата начала работы" v-model="model.registration.started" :editable="isEdit" type="date"/></li>
                <li><CTEditableField label="Дата оформления" v-model="model.registration.registrationDate" :editable="isEdit" type="date"/></li>
                <li><CTEditableField label="Вид оформления" v-model="model.registration.typeOfRegistration" :editable="isEdit"/></li>
                <li><CTEditableField label="Номер договора" v-model="model.registration.сontractNumber" :editable="isEdit"/></li>
                <li><CTEditableField label="Зарплата" v-model="model.registration.salary" :editable="isEdit"/></li>
              </ul>
          </div>



          <div class="page-emplyeer__group">
            <h2>Образование</h2>
            <ul>
              <li><CTEditableField label="Учебное заведение" v-model="model.aducation.institution" :editable="isEdit" /></li>
              <li><CTEditableField label="Факультет" v-model="model.aducation.faculty" :editable="isEdit" /></li>
              <li><CTEditableField label="Специальность" v-model="model.aducation.specialty" :editable="isEdit" /></li>
              <li><CTEditableField label="Дата поступления" v-model="model.aducation.started" :editable="isEdit" type="date" /></li>
              <li><CTEditableField label="Дата окончания" v-model="model.aducation.ended" :editable="isEdit" type="date" /></li>
              <li><CTEditableField label="Форма обучения" v-model="model.aducation.format" :editable="isEdit" /></li>
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

export default {
  name: 'emplyeer',
  components: { CTEditableField },
  data: () => ({
    isEdit: false,
    model: {
      id: 0,
      name: 'Вася Пупкин',
      surname: 'Иванович',
      hireDate: '',
      DOB: '',
      contacts: {
        personalMail: '',
        workMail: '',
        phone: '',
        messanger: '',
      },
      passport: {
        id: '',
        number: '',
        dateOfValidity: '',
        latinName: '',
      },
      aducation: {
        institution: '',
        faculty: '',
        specialty: '',
        format: '',
        ended: '',
        started: '',
      },
      registration: {
        position: '',
        started: '',
        registrationDate: '',
        typeOfRegistration: '',
        сontractNumber: '',
        salary: '',
      }
    },
  }),
  methods: {},
};
</script>

<style lang="stylus" scoped>
@require './../theme/global.styl';

.page-emplyeer
  display: flex;
  flex-flow: column nowrap
  align-items: center
  overflow: hidden
  flex-basis: 100%

  &__profile
    max-width: 860px
    width: 100%
    display: flex
    flex-flow: column nowrap

  &__avatar
    width: 100px
    height: 100px
    margin: 0 var(--gutter-size-xl) 0 0

  &__header
    display: flex
    flex-flow: row nowrap
    padding: var(--gutter-size-xl) 0
    border-bottom: var(--main-border-style)
    align-items: flex-start
    flex-shrink: 0
    h1
      flex: 1
      .ct-editable-field
        margin: 0
  &__body
    display: grid
    grid: auto-flow / 1fr 1fr
    grid-gap: var(--gutter-size-x)
    overflow: auto
    margin: var(--gutter-size-xl) 0
    ul
      padding: 0
      margin: 0

    li
      list-style: none
      padding: 0
      margin: 0

  &__edit-btn
    background: none
    border: none
    padding: var(--gutter-size-xs)
    display: block

</style>
