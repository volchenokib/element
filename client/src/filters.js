import Vue from 'vue';

Vue.filter('myFilter', value => {
	return value.toUpperCase();
});

// distance
Vue.filter('distance', value => {
	if (!value) {
		return '-';
	} else if (value == 2) {
		return 'less than 2km';
	} else if (value == 10) {
		return '2 - 10km';
	} else if (value == 99999) {
		return 'more than 10km';
	} else value;
});
