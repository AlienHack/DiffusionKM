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

	let reports = await prisma.km_report.findMany({
		where: {
			km_content_id: id
		}
	});

	return {
		content: ToPOJO<km_content & { km_category: km_category }>(content),
		reports: ToPOJO(reports)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	async create({ request, fetch }) {
		const formData = await request.formData();
		const contentId = formData.get('content_id') as string;
		const reportCategory = formData.get('report_category') as string;
		const reportDetail = formData.get('description') as string;
		const author = formData.get('author') as string;

		await prisma.km_report.create({
			data: {
				km_content_id: contentId,
				title: reportCategory,
				description: reportDetail,
				author: author ?? ''
			}
		});

		return { success: true };
	}
};
