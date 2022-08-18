// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Finally, import document & object schemas
import gallery from './documents/gallery';
import blockContent from './objects/blockContent';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	name: 'default',
	types: schemaTypes.concat([gallery, blockContent])
});
