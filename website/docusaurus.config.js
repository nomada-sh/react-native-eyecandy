// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Eyecandy',
  tagline: 'Make your React Native apps look great on any device',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nomada-sh', // Usually your GitHub org/user name.
  projectName: 'react-native-eyecandy', // Usually your repo name.
  plugins: ['docusaurus-plugin-sass'],
  clientModules: [require.resolve('./snackPlayerInitializer.js')],
  scripts: [{ src: 'https://snack.expo.dev/embed.js', defer: true }],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/nomada-sh/react-native-eyecandy/blob/develop/website',
          remarkPlugins: [
            require('./plugins/remark-snackplayer'),
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/nomada-sh/react-native-eyecandy/blob/develop/website',
        },
        theme: {
          customCss: require.resolve('./src/css/customTheme.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'React Native Eyecandy',
        logo: {
          alt: 'React Native Eyecandy Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/nomada-sh/react-native-eyecandy',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Components',
                to: '/docs/components/actionsheet',
              },
              {
                label: 'Typography',
                to: '/docs/typography/body',
              },
              {
                label: 'Icons',
                to: '/docs/icons',
              },
              {
                label: 'Theme',
                to: '/docs/theme',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/nomada-sh/react-native-eyecandy',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nomada Software House`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
