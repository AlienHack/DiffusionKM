const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	safelist: [
		'badge-primary',
		'badge-secondary',
		'badge-success',
		'badge-error',
		'badge-warning',
		'badge-accent',
		'badge-ghost',
		'badge-info'
	],

	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};

module.exports = config;
