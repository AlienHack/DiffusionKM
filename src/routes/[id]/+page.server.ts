import { ToPOJO } from '$lib/helpers';
import { prisma } from '$lib/prisma';
import type { km_category, km_content } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	let id = event.params.id;
	let content = await prisma.km_content.findUnique({
		where: {
			id
		},
		include: {
			km_category: true
		}
	});
	return {
		content: ToPOJO<km_content & { km_category: km_category }>(content)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	async create({ request }) {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const categoryId = formData.get('category_id') as string;
		const link = formData.get('link') as string;

		await prisma.km_content.create({
			data: {
				id: undefined,
				title,
				content,
				km_category_id: categoryId,
				link
			}
		});

		return { success: true };
	}
};
