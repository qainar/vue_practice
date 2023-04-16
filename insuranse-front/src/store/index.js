import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Cookies from "js-cookie";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        profile: {},
        insurances: [],
        orders: [],
        estates: [],
        users: [],
        allOrders: []
    },
    getters: {
        getProfile: (state) => state.profile,
        getInsurances: (state) => state.insurances,
        getOrders: state => state.orders,
        getEstates: state => state.estates,
        getUsers: state => state.users,
        getAllOrders: state => state.allOrders
    },
    mutations: {
        setToken: (state, payload) => {
            state.token = payload
        },
        setProfile: (state, payload) => {
            state.profile = payload
        },
        setInsurances: (state, payload) => {
            state.insurances = payload
        },
        setOrders: (state, payload) => {
            state.orders = payload
        },
        setEstates: (state, payload) => {
            state.estates = payload
        },
        setUsers: (state, payload) => {
            state.users = payload
        },
        setUserRole(state, { userId, role }) {
            const user = state.users.find(user => user._id === userId);
            if (user) {
                user.role = role;
            }
        },
        setAllOrders: (state, payload) => {
            state.allOrders = payload
        }
    },
    actions: {
        async registration({commit}, user) {
            console.log(user)
            await axios.post('/api/registration', user).then(({data}) => {
                Cookies.set('token', data.accessToken)
                Cookies.set('token', data.refreshToken)
                commit('setProfile', data.user)
                commit('setToken', data.accessToken)
            })
        },
        async login({commit}, {user, callback}) {
            await axios.post('/api/login', user).then(({data}) => {
                Cookies.set('token', data.accessToken)
                Cookies.set('refreshToken', data.refreshToken)
                commit('setProfile', data.user)
                commit('setToken', data.accessToken)
                axios.defaults.headers.common = {'Authorization': `Bearer ${data.accessToken}`}
                callback()
            }).catch(e => {
                console.log(e)
            })
        },
        async profile({commit}) {
            await axios.get('/api/profile').then(({data}) => {
                commit('setProfile', data)
                commit('setToken', Cookies.get('token'))
            })
        },
        async car({getters}, {car, callback}) {
            car.userId = getters.getProfile.id
            await axios.post('/api/car', car).then(({data}) => {
                console.log(data)
                callback()
            })
        },
        async property({getters}, {property,callback}) {
            property.userId = getters.getProfile.id
            await axios.post('/api/property', property).then(({data}) => {
                console.log(data)
                callback()
            })
        },
        async life({getters}, {life,callback}) {
            life.userId = getters.getProfile.id
            await axios.post('/api/life', life).then(({data}) => {
                console.log(data)
                callback()
            })
        },
        async allInsurance({commit}) {
            await axios.get('/api/insurances').then(({data}) => {
                commit('setInsurances', data)
            })
        },

        async getUser({commit}){
            await axios.get('/api/users').then(({data}) => {
                commit('setUsers', data)
                console.log(data)
            })
        },
        async updateUserRole({ commit }, { userId, callback }) {
            console.log(userId)
            return axios.put(`/api/user/${userId}/role`)
                .then(() => {
                    commit('setUserRole', { userId });
                    callback()
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async createOrder({getters}, {order, callback}) {
            await axios.post(`/api/order?estate_id=${order}`, {userId: getters.getProfile.id,order}).then(({data}) => {
                console.log(data)
                callback()
            })
        },
        async getOrderByUser({commit}){
            await axios.get('/api/order').then(({data}) => {
                commit('setOrders', data)
            })
        },
        async getEstates({commit}, isRent){
            const params = isRent !== undefined ? {isRent} : null
            const response =  await axios.get('/api/estate', {params})
            const estates = response.data
            commit('setEstates', estates)
        },
        // eslint-disable-next-line no-empty-pattern
        async createEstates({}, {data, callback}){
            console.log(data)
             await axios.post('/api/estate', data).then(({data}) => {
                 console.log(data)
                 callback()
             })
        },
        async getOrders({commit}){
            await axios.get('/api/get_all_order').then(({data})=>{
                commit('setAllOrders', data)
            })
        },
    },
})

export default store