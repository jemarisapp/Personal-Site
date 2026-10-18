import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Case studies rebuilt under /work keep their old links working.
  async redirects() {
    return [
      ...['trisp-studio', 'soundintel-bi', 'navigate-idd', 'camp-moda'].map(
        (slug) => ({
          source: `/project/${slug}`,
          destination: `/work/${slug}`,
          permanent: true,
        }),
      ),
      ...[
        ['fast-x-soundtrack', 'fast-x'],
        ['zaire-valentine', 'zaire-valentine'],
        ['trilo', 'trilo'],
      ].map(([from, to]) => ({
        source: `/project/${from}`,
        destination: `/work/${to}`,
        permanent: true,
      })),
      // Inquifly was retired; old links land on the product shelf.
      ...['/project/inquifly', '/work/inquifly'].map((source) => ({
        source,
        destination: '/?shelf=product',
        permanent: false,
      })),
      // The shelves moved from / to /home; keep old ?shelf= links working.
      {
        source: '/',
        has: [{ type: 'query', key: 'shelf' }],
        destination: '/home',
        permanent: true,
      },
      // Split into two projects.
      { source: '/work/trilo-app', destination: '/work/trilo', permanent: true },
      { source: '/work/trisp-website', destination: '/work/trisp-studio', permanent: true },
      {
        source: '/work/information-design',
        destination: '/work/how-to-atl',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
