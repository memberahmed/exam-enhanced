import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
        pathname: "/uploads/categories/**",
      },
    ],
  },
  redirects: () => {
    return [
      {
        source: "/:lang(en|ar)/allorders",
        destination: "/orders",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
