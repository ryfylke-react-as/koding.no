// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Koding.no",
  tagline: "Lær koding ved hjelp fra norske utviklere.",
  favicon: "img/logo.svg",

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
  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "ressurser",
        path: "ressurser",
        routeBasePath: "ressurser",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl:
          "https://github.com/ryfylke-react-as/koding.no/tree/main",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "opplaering",
        path: "opplaering",
        routeBasePath: "opplaering",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl:
          "https://github.com/ryfylke-react-as/koding.no/tree/main",
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/kom-i-gang",
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
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "/img/social-card.png",
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
            label: "Kom i gang",
          },
          {
            to: "/opplaering",
            activeBaseRegex: "/opplaering/",
            position: "left",
            label: "Opplæring",
          },
          {
            to: "/ressurser",
            activeBaseRegex: "/ressurser/",
            position: "left",
            label: "Ressurser",
          },
          { to: "/bidra", label: "👩‍💻 Bidra", position: "right" },
          { to: "/blog", label: "📰 Blogg", position: "right" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Opplæring",
            items: [
              {
                label: "Frontend",
                to: "/kom-i-gang/start/frontend",
              },
              {
                label: "Backend",
                to: "/kom-i-gang/start/backend",
              },
              {
                label: "Spillprogrammering",
                to: "/kom-i-gang/start/spillprogrammering",
              },
            ],
          },
          {
            title: "Samfunn",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/gxtAr4SzWs",
              },
              {
                label: "Github",
                href: "https://github.com/ryfylke-react-as/koding.no",
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
