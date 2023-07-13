// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Koding.no",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://koding.no",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ryfylke-react-as", // Usually your GitHub org/user name.
  projectName: "koding.no", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "nb",
    locales: ["nb"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/ressurser",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/ryfylke-react-as/koding.no/tree/main",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/ryfylke-react-as/koding.no/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        hideOnScroll: true,
        title: "Koding.no",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dm.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Selvopplæring",
          },
          { to: "/blog", label: "Blogg", position: "left" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Ressurser",
            items: [
              {
                label: "Frontend",
                to: "/ressurser/intro",
              },
              {
                label: "Backend",
                to: "/ressurser/intro",
              },
              {
                label: "App-utvikling",
                to: "/ressurser/intro",
              },
              {
                label: "DevOps",
                to: "/ressurser/intro",
              },
              {
                label: "Maskinlæring",
                to: "/ressurser/intro",
              },
            ],
          },
          {
            title: "Samfunn",
            items: [
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Github",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "Mer",
            items: [
              {
                label: "Blogg",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/ryfylke-react-as/koding.no",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
