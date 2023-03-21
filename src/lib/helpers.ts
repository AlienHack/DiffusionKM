export function trimToLength(str: string, length: number) {
	if (str.length > length) {
		return str.substring(0, length) + '...';
	}
	return str;
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
