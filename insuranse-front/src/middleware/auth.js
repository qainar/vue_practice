import Cookies from "js-cookie";
import store from "../store/index";

export default function ({to, next}) {
    if (!Cookies.get('token') && (to.path == '/auth/login' && to.path == '/auth/registation')) {
        return next({
            path: '/auth/login'
        })
    } else if (Cookies.get('token') && Object.keys(store.getters.getProfile).length === 0) {
        store.dispatch('profile')
    }

    return next();
}