<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'teemnz');

/** MySQL database username */
define('DB_USER', 'teemnz');

/** MySQL database password */
define('DB_PASSWORD', 'ePS9[4Lj3[');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'pbpun91da5ew67vur3uecve4g16g3fwdyqkmbvx0d1dy61iithxrg8mu5e2ilyl8');
define('SECURE_AUTH_KEY',  'chzsjrctzegqpdvmwduu9qrth2gmfgv2a05toxmpyifwnswsdgtuzpj3s99af6nt');
define('LOGGED_IN_KEY',    'g0onf78lwdjscd865gdxywcdgz9azrmdku4u2gck6mnl2ilztmsqcjaew41jmsa0');
define('NONCE_KEY',        'lk46om2xpga3p1wqrmdl1z1hajtpr9yqz6e7nos1osuxvb6robtvznis9rrpoewo');
define('AUTH_SALT',        'upkjantledcq7xukpsdo9rnvsl23blojnxpo2o0eu7dijao2fbnlyaucmlykqjvc');
define('SECURE_AUTH_SALT', '7e6pzzof2qzgxxxwu6plixovwc0bqbotypsusvaurwsncfmueowqtmtshllfgvxk');
define('LOGGED_IN_SALT',   'hmewa3o8svasbbzrqib8c5oirvypksvt6hfgkaegh6omouu5xtfi57abzvwnldva');
define('NONCE_SALT',       'cb0kwquc9sdsqnzs1ahsiqibnumxzq8diolmqlyvgjf9p7zoqkpmdkfxo3gunb2n');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
