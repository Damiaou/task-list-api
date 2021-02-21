import { startOfWeek, formatISO } from 'date-fns';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getHistories = async (request, response) => {
	const histories = await prisma.history.findMany();
	response.status(200).json(histories);
};

const getHistory = async (request, response) => {
	const { id } = request.body;
	const history = await prisma.history.findUnique({
		where: {
			id,
		},
	});
	response.status(200).json(history);
};

const createHistory = async (request, response) => {
	const { id_user, id_task, when } = request.body;
	const newHistory = await prisma.history.create({
		data: {
			id_user: id_user,
			id_task: id_task,
			when: formatISO(when),
		},
	});
	response.status(201).json(newHistory);
};

const deleteHistory = async (request, response) => {
	const id = request.params.id;
	const deletedHistory = await prisma.history.delete({
		where: {
			id,
		},
	});
	response.status(204).json(deletedHistory);
};

/**
 * Get all histories for a specific task since the beginning of the current week
 * @param {*} request
 * @param {*} response
 */
const getHistoryForTaskForWeek = async (request, response) => {
	const { task } = request.body;
	if (!task) {
		response.status(422).json({ code: 'Missing task param' });
		return;
	}
	const currentWeekStart = startOfWeek(Date.now());
	console.log(currentWeekStart);
	const histories = await prisma.history.findMany({
		where: {
			when: {
				gt: currentWeekStart,
			},
			task: {
				id: task,
			},
		},
		include: {
			user: true,
		},
	});
	response.status(200).json(histories);
};

/**
 * Get full history for last week for a home
 * @param {*} request
 * @param {*} response
 */
const getHistoryForLastWeek = async (request, response) => {
	const home = request.body.length ? request.body.home : null;
	if (!home) {
		response.status(422).json({ code: 'Missing home param' });
		return;
	}
	const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
	const histories = await prisma.history.findMany({
		where: {
			when: {
				gt: currentWeekStart,
			},
			home: {
				hash: home,
			},
		},
	});
};

module.exports = {
	getHistoryForTaskForWeek,
	getHistoryForLastWeek,
	getHistories,
	getHistory,
	createHistory,
	deleteHistory,
};
