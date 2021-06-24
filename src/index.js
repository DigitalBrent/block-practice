const {registerBlockType} = wp.blocks;

registerBlockType('brent/custom-cta', {
    // built-in attributes
    title: 'Call to Action',
    description: 'Block to generate a custom CTA',
    icon: 'format-image',
    category: 'layout',

    // custom attributes
    attributes: {},

    // custom functions


    // built-in functions
    edit() {
        return <div>Test</div>; 
    },

    save() {}
});