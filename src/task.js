const pool = require('./db.js');

import { PrismaClient } from '@prisma/client';
import { response } from 'express';
const prisma = new PrismaClient();

const getTasksForHome = async (request, response) => {
	const hash = request.params.hash;
	const tasks = await prisma.task.findMany({
		where: {
			home: {
				hash: hash,
			},
		},
	});
	response.status(200).json(tasks);
};

const getTasks = async (request, response) => {
	const tasks = await prisma.task.findMany();
	response.status(200).json(tasks);
};

const getTask = async (request, response) => {
	const { id } = request.body;
	const task = await prisma.task.findUnique({
		where: {
			id: id,
		},
	});
	response.status(200).json(task);
};

const createTask = async (request, response) => {
	const { label, repeat, home_hash } = request.body;
	const task = await prisma.task.create({
		data: {
			label: label,
			done: done,
			home_hash: home_hash,
		},
	});
	response.status(201).json(task);
};

const deleteTask = async (request) => {
	const { id } = request.params.id;
	const deleteTask = await prisma.task.delete({
		where: {
			id: id,
		},
	});
	response.status(204).json(deleteTask);
};

module.exports = { getTasks, getTask, createTask, deleteTask, getTasksForHome };
