<?php

function modify_contact_methods($profile_fields) {

    // Add new fields
    $profile_fields['domain'] = 'Domaine';

    return $profile_fields;
}
add_filter('user_contactmethods', 'modify_contact_methods');

/********************************************************************************************

Add Translation Option

********************************************************************************************/
load_theme_textdomain('bibcnrs', get_template_directory().'/languages');

/*********************************************************************************************

Register menu

*********************************************************************************************/
register_nav_menus([
    'principal' => __( 'Principal'),
    'secondaire' => __( 'Secondaire'),
]);

add_filter('timber_context', 'add_to_context');
/*********************************************************************************************

Add to context

*********************************************************************************************/

function add_to_context($context) {
    /* So here you are adding data to Timber's context object, i.e...
    $data['foo'] = 'I am some other typical value set in your functions.php file, unrelated to the menu';
    */
    /* add a Timber menu and send it along to the context. */
    $context['principal'] = new TimberMenu('principal');
    $context['secondaire'] = new TimberMenu('secondaire');
    if (function_exists('pll_the_languages')) {
        $context['language_switcher'] = pll_the_languages($args = [
        'dropdown' => 1,
        'show_names' => 1,
        'show_flags' => 0,
        'hide_if_empty' => 0,
        'hide_if_no_translation' => 0,
        'hide_current' => 1,
        'echo' => 0
        ] );
    }
    return $context;
}

/*********************************************************************************************

suppress tags <p>  in category description

*********************************************************************************************/
remove_filter('term_description','wpautop');

/*********************************************************************************************

add category class to body for posts

*********************************************************************************************/

// Add specific CSS class by filter
add_filter('body_class', 'my_class_names');
function my_class_names($classes) {
    // add 'class-name' to the $classes array
    $classes[] = 'class-name';
    // return the $classes array
    return $classes;
}

/*********************************************************************************************

Add Thumbnail Support

*********************************************************************************************/
add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size( 100, 100, true ); // Normal post thumbnails
add_image_size( 'single-post-image', 720, 320, TRUE );

/*********************************************************************************************

Replaces the excerpt "more" text by a link

*********************************************************************************************/
function new_excerpt_more($more) {
    return '..';
}
add_filter('excerpt_more', 'new_excerpt_more');

function custom_excerpt_length($length) {
    return 15;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
