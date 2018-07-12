import Vue from 'vue';
import Router from 'vue-router';
import Employees from './views/Employees.vue';
import Employee from './views/Employee.vue';
import Organization from './views/Organization.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Employees',
      component: Employees,
    },
    {
      path: '/organization',
      name: 'Organization',
      component: Organization,
    },
    {
      path: '/employees/:id',
      name: 'Employee',
      component: Employee,
    },
  ],
});
