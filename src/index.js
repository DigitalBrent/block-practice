const {registerBlockType} = wp.blocks;
const {
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload
} = wp.editor;
const {PanelBody, IconButton} = wp.components;

registerBlockType('brent/custom-cta', {
    // built-in attributes
    title: 'Call to Action',
    description: 'Block to generate a custom CTA',
    icon: 'format-image',
    category: 'layout',

    // custom attributes
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h2'
        },
        titleColor: {
            type: 'string',
            default: 'black'
        },
        body: {
            type: 'string',
            source: 'html',
            selector: 'p'
        },
        backgroundImage: {
            type: 'string',
            default: null
        }
    },

    


    // built-in functions
    edit({attributes, setAttributes}) {
        const {
            title,
            body,
            titleColor,
            backgroundImage
        } = attributes;

        // custom functions
        function onChangeTitle(newTitle) {
            setAttributes({title: newTitle});
        }

        function onChangeBody(newBody) {
            setAttributes({body: newBody});
        }

        function onTitleColorChange(newColor) {
            setAttributes({titleColor: newColor});
        }

        function onSelectImage(newImage) {
            setAttributes({backgroundImage: newImage.sizes.full.url});
        }


        return ([
            <InspectorControls style={{marginBottom: '40px'}}>
                <panelBody title={'Font Color Settings'}>
                    <p><strong>Select a Title Color:</strong></p>
                    <ColorPalette value={titleColor} onChange={onTitleColorChange}/>
                </panelBody>
                <panelBody title={'Background Image Settings'}>
                    <p><strong>Select Background Image:</strong></p>
                    <MediaUpload
                        onSelect={onSelectImage}
                        type="image"
                        value={backgroundImage}
                        render={({open}) => (
                            <IconButton
                                onClick={open}
                                icon="upload"
                                className="editor-media-placeholder__button is-button is-default is-large">
                                Background Image
                            </IconButton>
                        )}/>
                </panelBody>
            </InspectorControls>,
            <div class="cta-container">
                <RichText key="editable"
                          tagName="h2"
                          placeholder="Your CTA Title"
                          value={attributes.title}
                          onChange = {onChangeTitle}
                          style={{color: titleColor}}/>

                <RichText key="editable"
                          tagName="p"
                          placeholder="Your CTA Description"
                          value={attributes.body}
                          onChange = {onChangeBody}/>
            </div>
        ]); 
    },

    save({attributes}) {
        const {
            title,
            body,
            titleColor
        } = attributes;
        
        return (
            <div class="cta-container">
                <h2 style={{color: titleColor}}>{title}</h2>
                <RichText.Content tagName="p" value={body}/>
            </div>
        );
    }
});