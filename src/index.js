const {registerBlockType} = wp.blocks;
const {RichText, InspectorControls, ColorPalette, MediaUpload} = wp.blockEditor;
const {PanelBody, Button, RangeControl} = wp.components;

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
        },
        overlayColor: {
            type: 'string',
            default: 'black'
        },
        overlayOpacity: {
            type: 'number',
            default: 0.3
        }
    },

    


    // built-in functions
    edit({attributes, setAttributes}) {
        const {
            title,
            body,
            titleColor,
            backgroundImage,
            overlayColor,
            overlayOpacity
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

        function onOverlayColorChange(newColor) {
            setAttributes({overlayColor: newColor});
        }

        function onOverlayOpactiyChange(newOpacity) {
            setAttributes({overlayOpacity: newOpacity});
        }

        return ([
            <InspectorControls style={{marginBottom: '40px'}}>
                <panelBody title={'Font Color Settings'}>
                    <p><strong>Text Color:</strong></p>
                    <ColorPalette value={titleColor} onChange={onTitleColorChange}/>
                </panelBody>
                <panelBody title={'Background Image Settings'}>
                    <p><strong>Background Image:</strong></p>
                    
                    <MediaUpload type="image" onSelect={onSelectImage} value={backgroundImage} render={({open}) => (
                        <Button className="editor-media-placeholder__button is-button is-default is-large" icon="upload" onClick={open}>
                            Background Image
                        </Button>
                    )}/>

                    <div style={{marginTop: '20px', marginBottom: '40px'}}>
                        <p><strong>Overlay Color:</strong></p>

                        <ColorPalette value={overlayColor} onChange={onOverlayColorChange}/>

                        <RangeControl
                            label={'Overlay Opacity'}
                            value={overlayOpacity}
                            onChange={onOverlayOpactiyChange}
                            min={0}
                            max={1}
                            step={0.05}
                        />
                    </div>
                </panelBody>
            </InspectorControls>,

            <div class="cta-container" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="cta-overlay" style={{background: overlayColor, opacity: overlayOpacity}}></div>

                <RichText 
                    key="editable"
                    tagName="h2"
                    placeholder="Your CTA Title"
                    value={attributes.title}
                    onChange = {onChangeTitle}
                    style={{color: titleColor}}
                />

                <RichText 
                    key="editable"
                    tagName="p"
                    placeholder="Your CTA Description"
                    value={attributes.body}
                    onChange = {onChangeBody}
                />
            </div>
        ]); 
    },

    save({attributes}) {
        const {
            title,
            body,
            titleColor,
            backgroundImage,
            overlayColor,
            overlayOpacity
        } = attributes;
        
        return (
            <div class="cta-container" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="cta-overlay" style={{background: overlayColor, opacity: overlayOpacity}}></div>

                <h2 style={{color: titleColor}}>{title}</h2>
                
                <RichText.Content tagName="p" value={body}/>
            </div>
        );
    }
});