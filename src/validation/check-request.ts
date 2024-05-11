import Request from '../request.js';
import error from './error.js';
import {
  EMPTY
} from '../constants.js';
import warn from './warn.js';

interface Property {
    name: string;
    type: string|string[];
    required: boolean;
}

const properties: Property[] = [
    {
        name: 'method',
        type: 'string',
        required: true,
    },
    {
        name: 'headers',
        type: 'object',
        required: false,
    },
    {
        name: 'cookies',
        type: 'object',
        required: false,
    },
    {
        name: 'body',
        type: [
            'string',
            'object',
        ],
        required: false,
    },
    {
        name: 'autohandle',
        type: 'string',
        required: false,
    },
    {
        name: 'url',
        type: 'string',
        required: true,
    },
    {
        name: 'maxDuration',
        type: 'number',
        required: false,
    },
];

const validateProperty = (property: Property, id: string, main: Request) => {
    if (property.required && typeof main[property.name] === 'undefined') {
        error('invalid_request_property', id, property.name,);
        return false;
    }
    const allowedTypes: string[] = Array.isArray(property.type) ? property.type : [property.type];
    if (! allowedTypes.includes(typeof main[property.name])) {
        error('invalid_request_property', id, property.name,);
        delete main[property.name];
        return false;
    }
    delete main[property.name];
    return true;
};
const checkRequest = (main: Request, id: string,): {
  invalid: boolean,
  risky: boolean,
} => {
    let valid = true;
    for (const property of properties) {
        valid = validateProperty(property, id, main) && valid;
    }
    if (Object.keys(main,).length !== EMPTY) {
        warn('invalid_request', id,);
        return {
            invalid: !valid,
            risky: true,
        };
    }
    return {
        invalid: !valid,
        risky: false,
    };
};
export default checkRequest;