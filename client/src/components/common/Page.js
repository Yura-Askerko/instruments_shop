import { Helmet, HelmetProvider } from "react-helmet-async";

import Box from "@mui/material/Box";
const Page = ({
  breadcrumbs,
  children,
  className,
  pageTitle,
  title,
  ...rest
}) => {
  return (
    <Box style={{ minHeight: "calc(100vh - 158.5px)" }}>
      <HelmetProvider>
        <div className={className} {...rest}>
          <Helmet>
            <title>{pageTitle || title}</title>
          </Helmet>

          {breadcrumbs}
          <div>{children}</div>
        </div>
      </HelmetProvider>
    </Box>
  );
};

Page.displayName = "Page";

export default Page;
