export function trimToLength(str: string, length: number) {
	if (str.length > length) {
		return str.substring(0, length) + '...';
	}
	return str;
}

export function nFormatter(num: number, digits: number) {
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' }
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value;
		});
	return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}

export function getColor(categoryName: string) {
	let sum = 0;
	for (let i = 0; i < categoryName.length; i++) {
		sum += categoryName.charCodeAt(i);
	}

	const colors = ['primary', 'secondary', 'accent', 'ghost', 'info', 'success', 'warning', 'error'];

	return colors[sum % colors.length];
}

export function getOutline(categoryName: string) {
	let sum = 0;
	for (let i = 0; i < categoryName.length; i++) {
		sum += categoryName.charCodeAt(i);
	}

	return sum % 2 === 0;
}

export function ToPOJO<T>(object: any) {
	return JSON.parse(JSON.stringify(object)) as T;
}
