import { Helmet, HelmetProvider } from "react-helmet-async";

import Box from "@mui/material/Box";
import Footer from "./Footer";
const Page = ({
  breadcrumbs,
  children,
  className,
  pageTitle,
  title,
  ...rest
}) => {
  return (
    <Box style={{ height: "100%" }}>
      <HelmetProvider>
        <Box className={className} {...rest}>
          <Helmet>
            <title>{pageTitle || title}</title>
          </Helmet>

          {breadcrumbs}
          <Box style={{ minHeight: "calc(100vh - 158.5px)" }}>{children}</Box>
        </Box>
      </HelmetProvider>
      <Footer />
    </Box>
  );
};

Page.displayName = "Page";

export default Page;
