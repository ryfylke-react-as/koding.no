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
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "wiki",
        path: "wiki",
        routeBasePath: "wiki",
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
          routeBasePath: "/opplaering",
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
            label: "Lær koding",
          },
          {
            to: "/wiki",
            activeBaseRegex: "/wiki/",
            position: "left",
            label: "Wiki",
          },
          { to: "/blog", label: "Blogg", position: "left" },
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
                to: "/opplaering/intro",
              },
              {
                label: "Backend",
                to: "/opplaering/intro",
              },
              {
                label: "App-utvikling",
                to: "/opplaering/intro",
              },
              {
                label: "DevOps",
                to: "/opplaering/intro",
              },
              {
                label: "Maskinlæring",
                to: "/opplaering/intro",
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
