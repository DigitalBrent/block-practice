const {registerBlockType} = wp.blocks;

registerBlockType('brent/custom-cta', {
    // built-in attributes
    title: 'Call to Action',
    description: 'Block to generate a custom CTA',
    icon: 'format-image',
    category: 'layout',

    // custom attributes
    attributes: {
        author: {
            type: 'string'
        }
    },

    


    // built-in functions
    edit({attributes, setAttributes}) {
        // custom functions
        function updateAuthor(event) {
            setAttributes({author: event.target.value})
        }


        return <input type="text" value={attributes.author} onChange={updateAuthor} />; 
    },

    save({attributes}) {
        return <p>Author Name: <i>{attributes.author}</i></p>;
    }
});