<?php 

/**
 * Custom Gutenberg Funtions
 */

function brent_gutenberg_default_colors() {
    add_theme_support(
        'editor-color-palette', 
        array(
            array(
                'name' => 'White',
                'slug' => 'white',
                'color' => '#ffffff'
            ),
            array(
                'name' => 'Black',
                'slug' => 'black',
                'color' => '#000000'
            ),
            array(
                'name' => esc_attr__('Key Lime'),
                'slug' => 'keylime',
                'color' => '#00fc50'
            )
        )
    );

    add_theme_support(
        'editor-font-sizes',
        array(
            array(
                'name' => 'Large',
                'slug' => 'large',
                'size' => 24,
            ),
            array(
                'name' => 'Normal',
                'slug' => 'normal',
                'size' => 16,
            ),
            array(
                'name' => 'Small',
                'slug' => 'small',
                'size' => 12,
            )
        )
    );
}

 add_action('init', 'brent_gutenberg_default_colors');


 function brent_gutenberg_blocks() {
     wp_register_script('custom-cta-js', get_template_directory_uri() . '/js/gutenberg-cta-block.js', array('wp-blocks'));

     register_block_type('brent/custom-cta', array(
         'editor_script' => 'custom-cta-js'
     ));
 }

 add_action('init', 'brent_gutenberg_blocks');