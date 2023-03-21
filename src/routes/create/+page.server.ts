import { ToPOJO } from '$lib/helpers';
import { prisma } from '$lib/prisma';
import type { km_category } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	let categories = await prisma.km_category.findMany();
	return {
		categories: ToPOJO<km_category[]>(categories)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	async create({ request, fetch }) {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const categoryId = formData.get('category_id') as string;
		const link = formData.get('link') as string;
		const author = formData.get('author') as string;
		const hCaptchaToken = formData.get('h-captcha-response') as string;

		const captchaRequest = await fetch('https://hcaptcha.com/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `secret=0x11e8f53D672f59E6F6C8660AEAdBf9C1b8Dffb92&response=${hCaptchaToken}`
		});

		const captchaResponse = await captchaRequest.json();

		if (!captchaResponse.success) {
			return fail(500, {
				captchaFailed: true,
				message: 'Captcha failed',
				title,
				content,
				category_id: categoryId,
				link,
				author
			});
		}

		await prisma.km_content.create({
			data: {
				title,
				content,
				km_category_id: categoryId,
				link,
				author
			}
		});

		return { success: true };
	}
};
