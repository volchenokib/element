import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		guests: [],
		emptyGuest: {
			check_in_date: '',
			check_out_date: '',
			distance_to_event: null,
			email: '',
			gender: '',
			guestId: null,
			name: '',
			phone: '',
			max_payment: null,
			plus_one: false,
			ready_to_share_accommodation: false,
			ready_to_share_room: false,
			role: null,
			status: null
		},
		newGuest: {},
		currentGuest: {},
		selectedGuests: [],
		roles: [
			{ id: 1, name: 'stuff' },
			{ id: 2, name: 'pressa' },
			{ id: 3, name: 'speaker' },
			{ id: 4, name: 'customer' },
			{ id: 5, name: 'subscriber' },
			{ id: 6, name: 'other' }
		],
		statuses: [
			{ id: 1, name: 'common' },
			{ id: 2, name: 'vip' },
			{ id: 3, name: 'super vip' }
		],
		currentEvent: {
			startDate: '2019-07-08',
			endDate: '2019-07-15'
		},

		isDisable: false,
		isLoading: false,
		isVisible: false
	},

	mutations: {
		PENDING(state) {
			state.isDisable = true;
			state.isLoading = true;
		},
		SUCCESS(state, payload) {
			state.guests = payload;
			state.isDisable = false;
			state.isLoading = false;
			state.isVisible = false;
		},
		FAILURE(state, payload) {
			state.isDisable = false;
		},

		DIALOG(state, payload) {
			state.isVisible = payload;
		},
		CREATENEWGUEST(state) {
			state.newGuest = Object.assign({}, state.emptyGuest);
		},
		CLEARNEWGUEST(state) {
			state.newGuest = {};
		},
		CREATECURRENTGUEST(state, payload) {
			state.currentGuest = payload;
		},
		CLEARCURRENTGUEST(state) {
			state.currentGuest = {};
		},

		SELECTEDGUESTS(state, payload) {
			return (state.selectedGuests = payload);
		},

		addGuests(state, payload) {
			for (const key in payload) {
				state.guests.push(payload[key]);
			}
		}
	},

	actions: {
		// Create
		async createGuest({ commit }, guest) {
			commit('PENDING');
			try {
				const res = await axios.post('http://localhost:9000/api/user', guest);
				commit('SUCCESS', res.data);
			} catch (e) {
				commit('FAILURE', e);
			}
		},

		// Read
		readGuests({ commit }) {
			axios
				.get('http://localhost:9000/api/user')
				.then(response => {
					// handle success
					commit('SUCCESS', response.data);
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		},

		// Update

		// Delete
		async deleteGuests({ commit, state }) {
			commit('PENDING');
			try {
				const res = await axios.delete(
					`http://localhost:9000/api/user/${state.selectedGuests[0]}`
				);

				commit('SUCCESS', res.data);
			} catch (e) {
				commit('FAILURE', e);
			}
		}
	},

	getters: {
		// flatten guests object for table
		getGests(state) {
			return state.guests;
		},

		getSelectedGuests(state) {
			return state.selectedGuests;
		},

		getNewGuest(state) {
			return state.newGuest;
		},

		getCurrentGuest(state) {
			return state.currentGuest;
		},

		getIsDisable(state) {
			return state.isDisable;
		},
		getIsVisible(state) {
			return state.isVisible;
		}
	}
});
