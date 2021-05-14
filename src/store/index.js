import Vue from "vue";
import Vuex from 'vuex'
import router from "../router";
import { getToken, getUser } from "../helpers/auth";
import { logout } from "../api/authApi";
import { getSkillsList } from "../api/skillApi";
import { FETCH_SKILLS, LOGOUT } from "./actionsTypes";
import {
  ADD_SKILL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_SKILLS_LIST,
  SET_TITLE,
  SET_USER,
} from "./mutationsTypes";

Vue.use(Vuex);

const token = getToken();
const user = getUser();

const projectTypes = new Map([
  ['ongoing', 'Ongoing project'],
  ['onetime', 'One-time project'],
  ['none', 'I\'m mot sure'],
]);

const studentsCounts = new Map([
  ['one', 'One student'],
  ['many', 'More than one student'],
]);

const durations = new Map([
  ['lessone', 'Less than 1 months'],
  ['onethree', '1 to 3 months'],
  ['threesix', '3 to 6 months'],
  ['oversix', 'More than 6 months'],
]);

export default new Vuex.Store({
  state: {
    token: token,
    user: user,
    isLoggedIn: !!token,
    title: 'Freelance',
    skillsList: [],
    projectTypes: projectTypes,
    studentsCounts: studentsCounts,
    durations: durations,
  },
  getters: {
    getUser: ({ user = {} }) => ({
      ...user,
      avatarUrl: user?.avatarUrl || '/img/default.png',
    }),
    getToken: ({ token }) => token,
    getIsLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    getTitle: ({ title }) => title,
    getSkillsList: ({ skillsList }) => skillsList.map(({ name }) => name),
    isStudent: ({ user }) => user ? user.role === 'student' : false,
    isTeacher: ({ user }) => user ? user.role === 'teacher' : false,
    getProjectTypes: ({ projectTypes }) => projectTypes,
    getStudentsCounts: ({ studentsCounts }) => studentsCounts,
    getDurations: ({ durations }) => durations,
  },
  actions: {
    [LOGOUT](context) {
      logout().finally(() => {
        context.commit(LOGOUT_USER);
        router.push('/login');
      });
    },
    [FETCH_SKILLS](context) {
      if (!context.state.isLoggedIn) return;

      getSkillsList().then(({ data }) => {
        context.commit(SET_SKILLS_LIST, data);
      });
    },
  },
  mutations: {
    [LOGIN_SUCCESS](state, { user, access_token: token }) {
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [SET_USER](state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    [LOGOUT_USER](state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    [SET_TITLE](state, title) {
      state.title = title;
    },
    [SET_SKILLS_LIST](state, skills) {
      state.skillsList = skills;
    },
    [ADD_SKILL](state, skillName) {
      state.skillsList = [...state.skillsList, {
        id: state.skillsList.length + 1,
        name: skillName,
      }];
    },
  },
});
