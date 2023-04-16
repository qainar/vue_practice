<template>
  <div class="user-table">
    <table>
      <thead>
      <tr>
        <th>Имя пользователя</th>
        <th>Роль пользователя</th>
        <th>Почта</th>
        <th>Номер</th>
        <th>ИИН</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.name }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.number }}</td>
        <td>{{ user.IIN }}</td>
        <td>
          <button @click="onRoleUpdate(user._id)">Сделать админом</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Users',
  computed: {
    ...mapGetters({
      users: 'getUsers',
    }),
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions({
      fetchUsers: 'getUser',
      updateUserRole: 'updateUserRole',
    }),
    onRoleUpdate(user_id){
      const user = {
        userId: user_id
      }

      this.updateUserRole({userId: user.userId, callback: this.onUserRoleUpdated})
    },
    onUserRoleUpdated(){
      window.location.reload()
      console.log('user role updated')
    }
  },
  // data() {
  //   return {
  //     columns: [
  //       {
  //         name: "Id",
  //         field: "_id"
  //       },
  //       {
  //         name: "Имя",
  //         field: "name",
  //       },
  //       {
  //         name: "Email",
  //         field: "email",
  //       },
  //       {
  //         name: "Роль",
  //         field: "role",
  //       },
  //       {
  //         name: "Номер",
  //         field: "number"
  //       },
  //       {
  //         name: "ИИН",
  //         field: "IIN"
  //       },
  //       {
  //         name: "Действия",
  //         field: "actions",
  //         align: "right",
  //       },
  //     ],
  //   };
  // },
};
</script>


<style scoped lang="scss">
.user-table {
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 1rem;

    th {
      text-align: left;
      background-color: #f5f5f5;
      padding: 0.5rem;
      font-weight: bold;
    }

    td {
      border-bottom: 1px solid #ddd;
      padding: 0.5rem;

      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        text-align: center;
      }
    }
  }

  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      background-color: #0069d9;
    }
  }
}
</style>