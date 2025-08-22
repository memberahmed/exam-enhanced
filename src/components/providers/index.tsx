import { NextIntlClientProvider, useMessages } from "next-intl";
import ReactQueryProvider from "./components/react-query-provider";
import NextAuthSessionProvider from "./components/next-auth-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
