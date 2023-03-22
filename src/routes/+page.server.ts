import { ToPOJO, trimToLength } from '$lib/helpers';
import { prisma } from '$lib/prisma';
import type { km_category, km_content } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const searchParam = event.url.searchParams.get('search') ?? '';
	const catParam = event.url.searchParams.get('category_id') ?? '';
	const pageParam = event.url.searchParams.get('page') ?? 1;
	const limitParam = event.url.searchParams.get('limit') ?? 15;

	let whereQuery: any = {
		OR: [
			{
				content: {
					contains: searchParam
				}
			},
			{
				author: {
					contains: searchParam
				}
			},
			{
				title: {
					contains: searchParam
				}
			}
		]
	};

	if (catParam) {
		whereQuery = {
			...whereQuery,
			km_category_id: {
				equals: catParam
			}
		};
	}

	let contents = await prisma.km_content.findMany({
		where: whereQuery,
		include: {
			km_category: true
		},
		orderBy: {
			created_at: 'desc'
		},
		skip: (+pageParam - 1) * +limitParam,
		take: +limitParam
	});

	const contentsCount = await prisma.km_content.count({
		where: whereQuery
	});

	const categories = await prisma.km_category.findMany();

	contents = contents.map((content) => {
		content.title = trimToLength(content.title ?? '', 50);
		content.content = trimToLength(content.content ?? '', 50);
		return content;
	});

	return {
		contents: ToPOJO<(km_content & { km_category: km_category })[]>(contents),
		categories: ToPOJO<km_category[]>(categories),
		page: +pageParam,
		limit: +limitParam,
		totalPage: Math.ceil(contentsCount / +limitParam),
		search: searchParam,
		category_id: catParam
	};
}) satisfies PageServerLoad;
