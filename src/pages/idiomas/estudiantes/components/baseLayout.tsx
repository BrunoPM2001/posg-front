import {
  AppLayout,
  AppLayoutProps,
  BreadcrumbGroup,
  BreadcrumbGroupProps,
  ContentLayout,
  Flashbar,
  HelpPanel,
} from "@cloudscape-design/components";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { ReactNode, useContext } from "react";
import NotificationContext from "../../../../providers/notificationProvider";
import { createPortal } from "react-dom";

interface BaseLayoutProps {
  children: ReactNode;
  breadcrumbs: readonly BreadcrumbGroupProps.Item[];
  header: string | ReactNode;
  helpInfo?: ReactNode;
  disableOverlap?: boolean;
  contentType: AppLayoutProps.ContentType;
}

interface DemoHeaderPortalProps {
  children: ReactNode;
}

const DemoHeaderPortal = ({ children }: DemoHeaderPortalProps) => {
  const domNode = document.querySelector("#header");
  return domNode ? createPortal(children, domNode) : null;
};

export default function BaseLayout({
  children,
  breadcrumbs,
  header,
  helpInfo,
  disableOverlap = false,
  contentType = "default",
}: BaseLayoutProps) {
  //  Context
  const { notifications } = useContext(NotificationContext);

  return (
    <>
      <DemoHeaderPortal>
        <Navbar />
      </DemoHeaderPortal>
      <AppLayout
        headerVariant="high-contrast"
        navigation={<Sidebar />}
        notifications={<Flashbar items={notifications} stackItems />}
        tools={<HelpPanel>{helpInfo}</HelpPanel>}
        contentType={contentType}
        headerSelector="#header"
        content={
          <ContentLayout
            headerVariant="high-contrast"
            breadcrumbs={<BreadcrumbGroup items={breadcrumbs} />}
            disableOverlap={disableOverlap}
            header={header}
          >
            {children}
          </ContentLayout>
        }
      />
    </>
  );
}
