<template>
	<div class="home">
		<myTable />
		<customDialog />
	</div>
</template>

<script>
// @ is an alias to /src
import myTable from '@/components/myTable.vue';
import customDialog from '@/components/customDialog.vue';
import img from '../assets/warning.png';

export default {
	name: 'home',
	components: {
		myTable,
		customDialog
	},

	mounted() {
		this.notifyMe();
	},

	methods: {
		notifyMe() {
			var options = {
				body: 'Put some text here',
				icon: img
				// requireInteraction: true
			};

			// Let's check if the browser supports notifications
			if (!('Notification' in window)) {
				alert('This browser does not support desktop notification');
			}

			// Let's check whether notification permissions have already been granted
			else if (Notification.permission === 'granted') {
				// If it's okay let's create a notification
				var notification = new Notification('Notification Title', options);
			}

			// Otherwise, we need to ask the user for permission
			else if (Notification.permission !== 'denied') {
				Notification.requestPermission().then(function(permission) {
					// If the user accepts, let's create a notification
					if (permission === 'granted') {
						var notification = new Notification('Notification Title', options);
					}
				});
			}

			// At last, if the user has denied notifications, and you
			// want to be respectful there is no need to bother them any more.
		}
	}
};
</script>
