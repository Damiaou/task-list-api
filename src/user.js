const pool = require('./db.js');

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const login = async (request, response) => {
	const { email, home_hash } = request.body;
	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser.count > 0) {
		return response.status(200).json(existingUser);
	} else {
		const newUser = await prisma.user.create({
			data: {
				email,
				home_hash,
				color: 'FFFFF',
			},
		});
		return response.status(201).json(newUuser);
	}
};

const getUsers = async (request, response) => {
	const users = await prisma.user.findMany();
	response.status(200).json(users);
};

const getUser = async (request, response) => {
	const email = request.params.email;
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	response.status(200).json(user);
};

const createUser = async (request, response) => {
	const { email, color, home_hash } = request.body;
	const newUser = await prisma.user.create({
		data: {
			email,
			home_hash,
			color,
		},
	});
	response.status(200).json(newUser);
};

const deleteUser = async (request, response) => {
	const id = request.params.id;
	const deletedUser = await prisma.user.delete({
		where: {
			id,
		},
	});
	response.status(204).json(deletedUser);
};

module.exports = { login, getUsers, getUser, createUser, deleteUser };
