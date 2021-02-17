const pool = require('./db.js');
const crc32 = require('crc32');

import { PrismaClient } from '@prisma/client';
import { response } from 'express';
const prisma = new PrismaClient();

const getHomes = async (request, response) => {
	const homes = await prisma.home.findMany();
	response.status(200).json(homes);
};

const getHome = async (request, response) => {
	const hash = request.params.hash;
	const home = await prisma.home.findUnique({
		where: {
			hash,
		},
	});
	response.status(200).json(home);
};

const createHome = async (request, response) => {
	const { label } = request.body;
	const hash = crc32(label);
	const newHome = await prisma.home.create({
		data: {
			label: label,
			hash: hash,
		},
	});
	response.status(201).json(newHome);
};

const deleteHome = async (request, response) => {
	const hash = request.params.hash;

	const deletedHome = await prisma.home.delete({
		where: {
			hash,
		},
	});

	response.status(204).json(deleteHome);
};

module.exports = { getHomes, getHome, createHome, deleteHome };
