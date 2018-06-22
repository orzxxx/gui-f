import { normalize, schema } from 'normalizr';

const testSchema = new schema.Entity('templates');
const testsSchema = new schema.Array(testSchema);

const Schemas = {
    TEST: testsSchema
};

export default Schemas;
