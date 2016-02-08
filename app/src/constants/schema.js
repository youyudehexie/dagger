import { Schema, arrayOf, normalize } from 'normalizr';

const projects = new Schema('projects', {idAttribute: 'id'});

export const Schemas = {
    PROJECT: projects,
};

