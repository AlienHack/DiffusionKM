import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const id = event.params.id;
	let content = await prisma.km_content.update({
		where: {
			id: id
		},
		data: {
			views: {
				increment: 1
			}
		}
	});
	return json({
		success: true,
		views: content.views
	});
};
